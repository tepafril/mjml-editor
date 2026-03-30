import type { EmailTemplate } from '@/types/template.types'

export const minimalPlain: EmailTemplate = {
  id: 'minimal-plain',
  name: 'Minimal Plain',
  description: 'Clean text-only email with personal greeting, body text, and signature. No images.',
  category: 'Minimal',
  mjml: `<mjml>
  <mj-head>
    <mj-title>A note from SyncMusic</mj-title>
    <mj-preview>Just wanted to check in and share something with you.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Georgia, Times New Roman, serif" />
      <mj-text font-size="16px" line-height="1.8" color="#1f2937" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#ffffff">
    <mj-section padding="32px 48px 8px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0" letter-spacing="2px">
          SYNCMUSIC
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="24px 48px 8px">
      <mj-column>
        <mj-text font-size="16px" color="#1f2937" padding="0 0 16px">
          Hi Alex,
        </mj-text>
        <mj-text font-size="16px" color="#1f2937" padding="0 0 16px">
          I wanted to take a moment to personally reach out and say thank you for being a part of the SyncMusic community. It means the world to us that you've chosen our platform to create, share, and discover music.
        </mj-text>
        <mj-text font-size="16px" color="#1f2937" padding="0 0 16px">
          Over the past year, our community has grown to over 500,000 creators — and it's because of members like you that we're able to keep building the tools you need to bring your music to life.
        </mj-text>
        <mj-text font-size="16px" color="#1f2937" padding="0 0 16px">
          We have some exciting updates coming in the next few weeks. I'd love for you to be among the first to try them out. Keep an eye on your inbox.
        </mj-text>
        <mj-text font-size="16px" color="#1f2937" padding="0 0 16px">
          As always, if there's anything we can do to make your experience better, please don't hesitate to reply to this email. I read every message personally.
        </mj-text>
        <mj-text font-size="16px" color="#1f2937" padding="0 0 8px">
          With appreciation,
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          Sarah Chen
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0">
          CEO &amp; Co-founder, SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="16px 48px 32px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="8px 0 16px" />
        <mj-text font-size="11px" color="#d1d5db" padding="0">
          You received this email because you're a SyncMusic member.<br />
          <a href="#" style="color:#9ca3af;">Unsubscribe</a> · <a href="#" style="color:#9ca3af;">Manage preferences</a> · <a href="#" style="color:#9ca3af;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
