import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { name, email, phone, experience, licensed, specialties, availability, whyJoin } = data

    // Format specialties
    const specialtiesList = specialties.length > 0 
      ? specialties.join(', ') 
      : 'None specified'

    // Format licensed status
    const licensedMap: Record<string, string> = {
      'yes': 'Yes, fully licensed',
      'in-progress': 'In progress',
      'no': 'No'
    }
    const licensedText = licensedMap[licensed] || licensed

    // Format availability
    const availabilityMap: Record<string, string> = {
      'immediately': 'Immediately',
      '1-week': 'Within 1 week',
      '2-weeks': 'Within 2 weeks',
      '1-month': 'Within 1 month',
      'other': 'Other (see message)'
    }
    const availabilityText = availabilityMap[availability] || availability

    // Send email (using verified sullysblog.com domain)
    await resend.emails.send({
      from: 'Tapered Edges Applications <mike@sullysblog.com>',
      to: process.env.APPLICATION_EMAIL || 'dedra@taperededges.com',
      replyTo: email,
      subject: `New Barber Application: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
            ✂️ New Barber Application
          </h1>
          
          <h2 style="color: #333; margin-top: 24px;">Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a1a1a;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #1a1a1a;">${phone}</a></td>
            </tr>
          </table>

          <h2 style="color: #333; margin-top: 24px;">Experience & Qualifications</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Experience:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${experience} years</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Licensed:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${licensedText}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Specialties:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${specialtiesList}</td>
            </tr>
          </table>

          <h2 style="color: #333; margin-top: 24px;">Availability</h2>
          <p style="color: #1a1a1a; margin: 8px 0;">${availabilityText}</p>

          <h2 style="color: #333; margin-top: 24px;">Why They Want to Join</h2>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; color: #1a1a1a;">
            ${whyJoin.replace(/\n/g, '<br>')}
          </div>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px;">
            This application was submitted through the Tapered Edges career form.
            <br>Reply directly to this email to respond to the applicant.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Application error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
