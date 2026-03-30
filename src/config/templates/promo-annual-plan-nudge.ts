import type { EmailTemplate } from '@/types/template.types'

export const promoAnnualPlanNudge: EmailTemplate = {
  id: 'promo-annual-plan-nudge',
  name: 'Save 40% — Switch to Annual',
  description: 'Targeted at monthly subscribers to switch to annual plan by highlighting savings.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Save 40% — Switch to Annual | SyncMusic</mj-title>
    <mj-preview>You're paying $228/year on monthly. Lock in $139 annually before prices increase.</mj-preview>
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

    <!-- Savings Hero -->
    <mj-section background-color="#1e1b4b" padding="48px 32px 40px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 12px" letter-spacing="3px">
          EXCLUSIVE OFFER FOR MONTHLY SUBSCRIBERS
        </mj-text>
        <mj-text font-size="64px" font-weight="bold" color="#ffffff" align="center" padding="0" line-height="1">
          $91
        </mj-text>
        <mj-text font-size="20px" color="#a5b4fc" align="center" padding="8px 0 4px">
          saved per year
        </mj-text>
        <mj-text font-size="15px" color="#c7d2fe" align="center" padding="0" line-height="1.6">
          Switch to an annual plan today and stop paying month-to-month.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Cost Comparison -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 24px">
          Your current cost vs. annual
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 32px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#f9fafb">
        <mj-text font-size="12px" font-weight="bold" color="#9ca3af" align="center" padding="0 0 8px" letter-spacing="1px">
          WHAT YOU PAY NOW
        </mj-text>
        <mj-text font-size="28px" font-weight="bold" color="#374151" align="center" padding="0 0 4px" line-height="1">
          $19<span style="font-size:14px;color:#9ca3af;font-weight:normal;">/month</span>
        </mj-text>
        <mj-text font-size="14px" color="#ef4444" align="center" padding="0" font-weight="bold">
          = $228 per year
        </mj-text>
      </mj-column>
      <mj-column border="2px solid #4f46e5" border-radius="10px" padding="20px" background-color="#f5f3ff">
        <mj-text font-size="12px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 8px" letter-spacing="1px">
          ANNUAL PLAN
        </mj-text>
        <mj-text font-size="28px" font-weight="bold" color="#111827" align="center" padding="0 0 4px" line-height="1">
          $139<span style="font-size:14px;color:#6b7280;font-weight:normal;">/year</span>
        </mj-text>
        <mj-text font-size="14px" color="#4f46e5" align="center" padding="0" font-weight="bold">
          Save $89 — paid once
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Feature Parity Note -->
    <mj-section background-color="#f9fafb" padding="24px 32px">
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 12px">
          Same plan. Lower price. No trade-offs.
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 8px">
          Switching to annual doesn't change anything about your plan — you keep every feature, every download, and every license you already enjoy.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          ✓ &nbsp;All genres — 40,000+ tracks
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          ✓ &nbsp;Commercial license on every download
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          ✓ &nbsp;Content ID protection &amp; dispute support
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">
          ✓ &nbsp;Priority customer support
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Urgency Banner -->
    <mj-section background-color="#fef2f2" padding="20px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#991b1b" align="center" padding="0" font-weight="bold" line-height="1.5">
          Lock in your rate — price increases in 30 days
        </mj-text>
        <mj-text font-size="13px" color="#b91c1c" align="center" padding="6px 0 0" line-height="1.5">
          SyncMusic annual plans will increase to $159/year on April 1. Switch now to lock in $139 for life.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Switch to Annual
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Your current billing cycle will be prorated. No interruption to your service.
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
