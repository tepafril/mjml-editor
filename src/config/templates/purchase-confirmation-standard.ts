import type { EmailTemplate } from '@/types/template.types'

export const purchaseConfirmationStandard: EmailTemplate = {
  id: 'purchase-confirmation-standard',
  name: 'Your Standard License is Ready',
  description: 'Order confirmation after Standard license purchase with license document and download link.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your Standard License is Ready — SyncMusic</mj-title>
    <mj-preview>License confirmed. Your track and license document are ready to download.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Green Checkmark Header -->
    <mj-section background-color="#16a34a" padding="40px 32px 36px">
      <mj-column>
        <mj-text font-size="40px" align="center" padding="0 0 8px">
          ✓
        </mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px" line-height="1.2">
          License Confirmed!
        </mj-text>
        <mj-text font-size="14px" color="#bbf7d0" align="center" padding="0">
          Your Standard License is ready to use immediately.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Order Summary -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 12px" letter-spacing="2px">
          ORDER SUMMARY
        </mj-text>

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          Track
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 16px">
          Midnight Drive
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 16px" />

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          License Type
        </mj-text>
        <mj-text font-size="15px" color="#111827" padding="0 0 16px">
          Standard License
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 16px" />

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          Amount Paid
        </mj-text>
        <mj-text font-size="15px" color="#111827" padding="0 0 16px">
          $29.00
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 16px" />

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          Order Number
        </mj-text>
        <mj-text font-size="15px" color="#111827" font-family="Courier New, monospace" padding="0 0 0">
          SYN-2025-4821
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Rights Summary -->
    <mj-section background-color="#f0fdf4" padding="24px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#15803d" padding="0 0 10px" letter-spacing="1px">
          YOUR LICENSE COVERS
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 6px">
          ✓ &nbsp;YouTube, Vimeo, and online video content
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 6px">
          ✓ &nbsp;Social media (Instagram, TikTok, Facebook, X)
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 6px">
          ✓ &nbsp;Podcasts and audio productions
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 6px">
          ✓ &nbsp;Up to 500,000 views per platform
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 0">
          ✓ &nbsp;Perpetual, non-exclusive rights
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="40px 32px 16px">
      <mj-column>
        <mj-button background-color="#16a34a" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 40px" border-radius="8px" href="#" align="center">
          Download Track + License
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Includes WAV, MP3, and your signed PDF license document
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- YouTube Content ID Note -->
    <mj-section background-color="#fffbeb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#92400e" padding="0 0 4px">
          YouTube Content ID Notice
        </mj-text>
        <mj-text font-size="13px" color="#78350f" padding="0" line-height="1.6">
          "Midnight Drive" is registered with YouTube Content ID. If your video receives a claim, go to YouTube Studio → Video Details → Content ID Claims and submit your license document. Reference code: <strong>SYN-STD-4821</strong>. Claims resolve within 24 hours.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Need help? Contact <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a> with your order number.
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
