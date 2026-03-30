import type { EmailTemplate } from '@/types/template.types'

export const purchaseConfirmationExtended: EmailTemplate = {
  id: 'purchase-confirmation-extended',
  name: 'Your Extended License is Ready',
  description: 'Confirmation for Extended license purchases emphasizing broadcast and large-audience rights.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your Extended License is Ready — SyncMusic</mj-title>
    <mj-preview>Your Extended License is confirmed. Broadcast, streaming, and unlimited views — all cleared.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Premium Header with EXTENDED Badge -->
    <mj-section background-color="#1e1b4b" padding="40px 32px 36px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#a5b4fc" align="center" padding="0 0 16px" letter-spacing="4px">
          ★ &nbsp;EXTENDED LICENSE &nbsp;★
        </mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px" line-height="1.2">
          Your Extended License is Ready
        </mj-text>
        <mj-text font-size="14px" color="#c7d2fe" align="center" padding="0">
          Full broadcast, streaming, and unlimited audience rights — confirmed.
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
          Golden Hour
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 16px" />

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          License Type
        </mj-text>
        <mj-text font-size="15px" color="#111827" padding="0 0 16px">
          Extended License
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 16px" />

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          Amount Paid
        </mj-text>
        <mj-text font-size="15px" color="#111827" padding="0 0 16px">
          $79.00
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 16px" />

        <mj-text font-size="14px" color="#6b7280" padding="0 0 4px">
          Order Number
        </mj-text>
        <mj-text font-size="15px" color="#111827" font-family="Courier New, monospace" padding="0 0 0">
          SYN-2025-4822
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Rights Summary -->
    <mj-section background-color="#f5f3ff" padding="24px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#5b21b6" padding="0 0 10px" letter-spacing="1px">
          YOUR EXTENDED LICENSE COVERS
        </mj-text>
        <mj-text font-size="13px" color="#4c1d95" padding="0 0 6px">
          ✓ &nbsp;Broadcast TV — networks, cable, and OTT
        </mj-text>
        <mj-text font-size="13px" color="#4c1d95" padding="0 0 6px">
          ✓ &nbsp;Streaming platforms (Netflix, Prime, Hulu, Disney+)
        </mj-text>
        <mj-text font-size="13px" color="#4c1d95" padding="0 0 6px">
          ✓ &nbsp;Online video — unlimited views, all platforms
        </mj-text>
        <mj-text font-size="13px" color="#4c1d95" padding="0 0 6px">
          ✓ &nbsp;Audiences of 1M+ with no additional fees
        </mj-text>
        <mj-text font-size="13px" color="#4c1d95" padding="0 0 6px">
          ✓ &nbsp;Commercial advertising and brand campaigns
        </mj-text>
        <mj-text font-size="13px" color="#4c1d95" padding="0 0 0">
          ✓ &nbsp;Theatrical and festival screenings worldwide
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Download Buttons -->
    <mj-section background-color="#ffffff" padding="32px 32px 16px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 16px" letter-spacing="2px" align="center">
          YOUR DOWNLOADS
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 16px">
      <mj-column padding="0 6px">
        <mj-button background-color="#f9fafb" color="#374151" font-size="13px" font-weight="bold" inner-padding="12px 16px" border-radius="6px" href="#" align="center" border="1px solid #e5e7eb">
          WAV — Lossless
        </mj-button>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-button background-color="#f9fafb" color="#374151" font-size="13px" font-weight="bold" inner-padding="12px 16px" border-radius="6px" href="#" align="center" border="1px solid #e5e7eb">
          MP3 — 320kbps
        </mj-button>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-button background-color="#f5f3ff" color="#5b21b6" font-size="13px" font-weight="bold" inner-padding="12px 16px" border-radius="6px" href="#" align="center" border="1px solid #ddd6fe">
          Stems Pack
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 32px 16px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          Your signed PDF license document is included with each download.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Browse More CTA -->
    <mj-section background-color="#ffffff" padding="8px 32px 48px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="8px 0 24px" />
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Browse More Tracks
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Need help? Contact <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a> with order <strong>SYN-2025-4822</strong>.
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
