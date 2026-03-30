import type { EmailTemplate } from '@/types/template.types'

export const reengagementWinBack: EmailTemplate = {
  id: 'reengagement-win-back',
  name: 'Come Back — 25% Off for 48 Hours',
  description: 'Win-back offer for churned subscribers with a time-limited discount code.',
  category: 'Retention',
  mjml: `<mjml>
  <mj-head>
    <mj-title>We Want You Back — 25% Off for 48 Hours</mj-title>
    <mj-preview>We saved a special offer just for you. Use COMEBACK25 for 25% off — expires in 48 hours.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
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

    <!-- Hero -->
    <mj-section background-color="#ffffff" padding="36px 24px 12px">
      <mj-column>
        <mj-text font-size="28px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          We want you back.
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          It's been too long. Here's a personal offer — because your creativity matters to us.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Coupon Code -->
    <mj-section background-color="#ffffff" padding="16px 24px 8px">
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 12px">
          Here's 25% off — just for you
        </mj-text>
        <mj-text font-size="11px" color="#6b7280" align="center" padding="0 0 8px" letter-spacing="1px">
          YOUR EXCLUSIVE CODE
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f5f3ff" padding="0 24px 20px">
      <mj-column border="2px dashed #4f46e5" border-radius="10px" padding="20px">
        <mj-text font-size="32px" font-weight="bold" color="#4f46e5" align="center" letter-spacing="4px" padding="0">
          COMEBACK25
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="8px 0 0">
          Apply at checkout · One-time use · Expires in 48 hours
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What's New Since They Left -->
    <mj-section background-color="#ffffff" padding="24px 24px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          A lot has changed since you left:
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🎵 &nbsp;<strong>500+ new tracks</strong> added across all genres
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🎚️ &nbsp;<strong>Stems packs</strong> now available for all featured tracks
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🌊 &nbsp;<strong>Lo-Fi, Afrobeats &amp; Jazz</strong> genres added
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          🛡️ &nbsp;<strong>Content ID protection</strong> built into every license
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Reactivation Flow -->
    <mj-section background-color="#ffffff" padding="12px 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 16px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 12px">
          Reactivating takes 30 seconds:
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          1. Click the button below
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          2. Choose your plan (from $9/mo)
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          3. Enter <strong>COMEBACK25</strong> at checkout for 25% off
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="20px 24px 12px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Reactivate with 25% Off
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Expires Notice -->
    <mj-section background-color="#ffffff" padding="0 24px 28px">
      <mj-column>
        <mj-text font-size="12px" color="#ef4444" align="center" font-weight="bold" padding="0">
          ⏰ This offer expires in 48 hours. Don't miss it.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 24px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. All rights reserved.<br />
          <a href="#" style="color: #6b7280;">Unsubscribe</a> · <a href="#" style="color: #6b7280;">Privacy Policy</a> · <a href="#" style="color: #6b7280;">Terms of Service</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
