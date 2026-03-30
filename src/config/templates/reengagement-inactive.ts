import type { EmailTemplate } from '@/types/template.types'

export const reengagementInactive: EmailTemplate = {
  id: 'reengagement-inactive',
  name: "We Miss You — Here's What's New",
  description: 'Re-engagement email for users inactive for 30+ days showcasing new tracks and features.',
  category: 'Retention',
  mjml: `<mjml>
  <mj-head>
    <mj-title>We Miss You — Here's What's New at SyncMusic</mj-title>
    <mj-preview>A lot has happened since you've been gone — 200+ new tracks, Stems packs, and a special offer just for you.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="24px 24px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="0 0 20px">
          YOUR MUSIC, YOUR WAY
        </mj-text>
        <mj-text font-size="30px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px">
          We miss you! 👋
        </mj-text>
        <mj-text font-size="16px" color="#c7d2fe" align="center" padding="0">
          It's been a while — and a lot has happened since you've been gone.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What's New Intro -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Here's what's new at SyncMusic
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          We've been busy building things we know you'll love.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Feature Updates -->
    <mj-section background-color="#ffffff" padding="16px 24px">
      <mj-column border="1px solid #e5e7eb" border-radius="8px" padding="20px">
        <mj-text font-size="22px" padding="0 0 4px">🎵</mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          200+ New Tracks Added
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Fresh music across every genre — cinematic, electronic, hip-hop, and more. Updated weekly.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 0">
      <mj-column border="1px solid #e5e7eb" border-radius="8px" padding="20px">
        <mj-text font-size="22px" padding="0 0 4px">🎚️</mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Stems Packs Launched
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Download individual stems — drums, bass, melody — for full creative control over your projects.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column border="1px solid #e5e7eb" border-radius="8px" padding="20px">
        <mj-text font-size="22px" padding="0 0 4px">🌊</mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Lo-Fi Genre Added
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          A brand-new Lo-Fi collection purpose-built for YouTube videos, study streams, and ambient content.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured Tracks -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          3 Tracks We Think You'll Love
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="0 24px">
      <mj-column background-color="#ffffff" border="1px solid #e5e7eb" border-radius="8px" padding="14px 16px">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Golden Hour</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Cinematic · 3:24 · $29</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="6px 24px">
      <mj-column background-color="#ffffff" border="1px solid #e5e7eb" border-radius="8px" padding="14px 16px">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Electric Pulse</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Electronic · 2:58 · $29</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="6px 24px 24px">
      <mj-column background-color="#ffffff" border="1px solid #e5e7eb" border-radius="8px" padding="14px 16px">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Rainy Days Lo-Fi</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Lo-Fi · 4:10 · $19</mj-text>
      </mj-column>
    </mj-section>

    <!-- Special Offer -->
    <mj-section background-color="#4f46e5" padding="28px 24px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#c7d2fe" align="center" padding="0 0 6px" letter-spacing="1px">
          SPECIAL OFFER
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px">
          20% off your next license
        </mj-text>
        <mj-text font-size="14px" color="#c7d2fe" align="center" padding="0 0 20px">
          We saved this just for you. Offer expires in 7 days.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Come Back and Explore
        </mj-button>
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
