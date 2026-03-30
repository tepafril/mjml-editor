import type { EmailTemplate } from '@/types/template.types'

export const reengagementAbandonedCart: EmailTemplate = {
  id: 'reengagement-abandoned-cart',
  name: 'You Left Something Behind',
  description: 'Cart abandonment email for a track that was previewed but not licensed.',
  category: 'Retention',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Still thinking about it? Your track is waiting.</mj-title>
    <mj-preview>You previewed "Golden Hour" — it's still available. Complete your license before it's gone.</mj-preview>
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
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="26px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Still thinking about it?
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          You previewed a track and didn't complete your license. We held it for you.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track Card -->
    <mj-section background-color="#ffffff" padding="20px 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="12px" padding="24px">
        <mj-image src="https://placehold.co/520x120/e0e7ff/4f46e5?text=Golden+Hour" alt="Golden Hour" width="520px" border-radius="8px" padding="0 0 16px" />
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" padding="0 0 4px" letter-spacing="1px">
          TRACK SAVED IN YOUR CART
        </mj-text>
        <mj-text font-size="20px" font-weight="bold" color="#111827" padding="0 0 4px">
          Golden Hour
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 12px">
          Genre: Cinematic &nbsp;·&nbsp; Duration: 3:24 &nbsp;·&nbsp; Standard License
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#4f46e5" padding="0">
          $29
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Social Proof -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          Why creators choose this track
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          ✅ &nbsp;<strong>Over 340 projects</strong> have used Golden Hour across YouTube, Reels, and brand videos.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          ✅ &nbsp;<strong>Perfect for emotional storytelling</strong> — trending in travel, wedding, and documentary content.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          ✅ &nbsp;<strong>Instant delivery</strong> — download your stems and license PDF immediately after checkout.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Urgency Nudge -->
    <mj-section background-color="#fef3c7" padding="16px 24px" margin-top="8px">
      <mj-column>
        <mj-text font-size="13px" color="#92400e" align="center" padding="0">
          ⚡ <strong>Exclusive licenses are first-come, first-served.</strong> Someone else may license this track before you. Don't miss it.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="24px 24px 32px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Complete Your License
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Secure checkout · Instant download · License PDF included
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
