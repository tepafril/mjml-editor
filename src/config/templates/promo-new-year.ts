import type { EmailTemplate } from '@/types/template.types'

export const promoNewYear: EmailTemplate = {
  id: 'promo-new-year',
  name: 'New Year, New Soundtrack — 30% Off Plans',
  description: 'New Year promotional email targeting free/trial users with a discounted annual subscription.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>New Year, New Soundtrack — 30% Off | SyncMusic</mj-title>
    <mj-preview>Start 2026 with the right music. Save $69 with our annual plan — use code NY2026.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="4px 0 0" letter-spacing="2px">
          YOUR MUSIC, YOUR WAY
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#1e1b4b" padding="48px 32px 40px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 12px" letter-spacing="3px">
          NEW YEAR OFFER
        </mj-text>
        <mj-text font-size="32px" font-weight="bold" color="#ffffff" align="center" padding="0 0 12px" line-height="1.2">
          2026 starts with<br />the right music
        </mj-text>
        <mj-text font-size="16px" color="#a5b4fc" align="center" padding="0 0 0" line-height="1.6">
          Upgrade to an annual plan today and save $69 — your soundtrack for the entire year, at one unbeatable price.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Savings Comparison -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 4px">
          Why go annual?
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 24px">
          The math is simple.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column border="2px solid #e5e7eb" border-radius="12px" padding="24px">
        <mj-text font-size="13px" font-weight="bold" color="#6b7280" align="center" padding="0 0 8px" letter-spacing="1px">
          MONTHLY PLAN
        </mj-text>
        <mj-text font-size="36px" font-weight="bold" color="#374151" align="center" padding="0 0 4px" line-height="1">
          $19<span style="font-size:16px;font-weight:normal;color:#9ca3af;">/mo</span>
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0">
          $228 billed over 12 months
        </mj-text>
      </mj-column>
      <mj-column border="2px solid #4f46e5" border-radius="12px" padding="24px" background-color="#f5f3ff">
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 8px" letter-spacing="1px">
          ANNUAL PLAN
        </mj-text>
        <mj-text font-size="36px" font-weight="bold" color="#111827" align="center" padding="0 0 4px" line-height="1">
          $159<span style="font-size:16px;font-weight:normal;color:#6b7280;">/yr</span>
        </mj-text>
        <mj-text font-size="13px" color="#4f46e5" font-weight="bold" align="center" padding="0">
          Save $69 — that's 3 months free
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What's included -->
    <mj-section background-color="#f9fafb" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 20px">
          Everything in your paid plan
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="0 32px 8px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✓ &nbsp;Unlimited track downloads each month
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✓ &nbsp;Commercial licenses for YouTube, Instagram, TikTok &amp; more
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✓ &nbsp;Access to 40,000+ royalty-free tracks across all genres
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✓ &nbsp;Instant license certificates for every download
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✓ &nbsp;Content ID dispute support included
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Coupon -->
    <mj-section background-color="#fffbeb" padding="24px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#92400e" align="center" padding="0 0 8px" font-weight="bold" letter-spacing="1px">
          YOUR DISCOUNT CODE
        </mj-text>
        <mj-text font-size="28px" font-weight="bold" color="#d97706" align="center" padding="0 0 8px" letter-spacing="6px">
          NY2026
        </mj-text>
        <mj-text font-size="12px" color="#92400e" align="center" padding="0">
          Apply at checkout. Valid through January 31, 2026.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Upgrade Now
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Offer valid for new annual subscribers only. Renews at standard rate after year one.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#4f46e5;">Unsubscribe</a> · <a href="#" style="color:#4f46e5;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
