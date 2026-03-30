import type { EmailTemplate } from '@/types/template.types'

export const newsletterBasic: EmailTemplate = {
  id: 'newsletter-basic',
  name: 'Basic Newsletter',
  description: 'Two-column article layout with hero image, logo header, and social footer.',
  category: 'Newsletter',
  mjml: `<mjml>
  <mj-head>
    <mj-title>SyncMusic Monthly Newsletter</mj-title>
    <mj-preview>Your monthly roundup of music news, tips, and featured artists.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">
    <mj-section background-color="#4f46e5" padding="20px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="4px 0 0">
          YOUR MUSIC, YOUR WAY
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0">
      <mj-column>
        <mj-image src="https://placehold.co/600x300/4f46e5/ffffff?text=Newsletter+Hero" alt="Newsletter Hero" width="600px" padding="0" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px 24px 8px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#111827" padding="0 0 8px">
          What's New This Month
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0">
          Discover the latest in music tech, featured artists, and exclusive tips from our community of creators.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="16px 24px">
      <mj-column padding="0 8px 0 0">
        <mj-image src="https://placehold.co/260x160/e0e7ff/4f46e5?text=Article+1" alt="Article 1" width="260px" border-radius="8px" padding="0 0 12px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 6px">
          The Future of AI in Music Production
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 10px">
          Explore how artificial intelligence is reshaping the way producers create, mix, and distribute their music in 2025.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="12px" padding="0" inner-padding="8px 16px" border-radius="6px" href="#">
          Read More
        </mj-button>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-image src="https://placehold.co/260x160/e0e7ff/4f46e5?text=Article+2" alt="Article 2" width="260px" border-radius="8px" padding="0 0 12px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 6px">
          Top 10 Plugins Every Producer Needs
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 10px">
          We surveyed 500 professional producers to find out which plugins they can't live without. The results might surprise you.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="12px" padding="0" inner-padding="8px 16px" border-radius="6px" href="#">
          Read More
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 16px" />
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 8px">
          Follow us on social media
        </mj-text>
        <mj-social font-size="12px" icon-size="20px" mode="horizontal" align="center" padding="0 0 16px">
          <mj-social-element name="twitter" href="https://twitter.com" background-color="#1da1f2">Twitter</mj-social-element>
          <mj-social-element name="instagram" href="https://instagram.com" background-color="#e1306c">Instagram</mj-social-element>
          <mj-social-element name="facebook" href="https://facebook.com" background-color="#1877f2">Facebook</mj-social-element>
        </mj-social>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          You're receiving this because you subscribed to SyncMusic updates.<br />
          <a href="#" style="color: #4f46e5;">Unsubscribe</a> · <a href="#" style="color: #4f46e5;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
