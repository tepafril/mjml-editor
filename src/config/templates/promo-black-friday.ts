import type { EmailTemplate } from '@/types/template.types'

export const promoBlackFriday: EmailTemplate = {
  id: 'promo-black-friday',
  name: 'Black Friday: 50% Off All Licenses',
  description: 'Time-limited Black Friday sale with sitewide discount on all license tiers.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Black Friday — 50% Off All Licenses — SyncMusic</mj-title>
    <mj-preview>50% OFF ALL LICENSES — Sale ends midnight Friday. Use code BF2025 at checkout.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#0a0a0a">

    <!-- Logo bar -->
    <mj-section background-color="#0a0a0a" padding="18px 32px 10px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Bold black header with BLACK FRIDAY -->
    <mj-section background-color="#0a0a0a" padding="16px 32px 0">
      <mj-column>
        <mj-text font-size="56px" font-weight="bold" color="#ffffff" align="center" padding="0" line-height="1">
          BLACK
        </mj-text>
        <mj-text font-size="56px" font-weight="bold" color="#ffffff" align="center" padding="0" line-height="1">
          FRIDAY
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- 50% off in gold -->
    <mj-section background-color="#0a0a0a" padding="10px 32px 4px">
      <mj-column>
        <mj-text font-size="42px" font-weight="bold" color="#d97706" align="center" padding="0" line-height="1.1">
          50% OFF
        </mj-text>
        <mj-text font-size="16px" color="#e5e7eb" align="center" padding="6px 0 0" letter-spacing="2px">
          ALL LICENSES
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Urgency bar -->
    <mj-section background-color="#1f1f1f" padding="14px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#fbbf24" align="center" padding="0" font-weight="bold">
          ⏳ &nbsp; Sale ends midnight Friday, November 29 &nbsp; ⏳
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured deals header -->
    <mj-section background-color="#111111" padding="28px 32px 12px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          Featured Deals
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Handpicked tracks at their lowest price ever
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track card 1 -->
    <mj-section background-color="#1a1a1a" padding="0 20px" border="1px solid #2d2d2d">
      <mj-column background-color="#1e1e1e" border-radius="8px" padding="18px 20px">
        <mj-text font-size="16px" font-weight="bold" color="#ffffff" padding="0 0 4px">
          Neon Drift
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0 0 10px">
          Electronic · Upbeat · 3:28
        </mj-text>
        <mj-table font-size="13px" cellpadding="0">
          <tr>
            <td style="color:#6b7280;text-decoration:line-through;padding:0;">Standard: $29.00</td>
            <td style="text-align:right;color:#d97706;font-weight:700;font-size:16px;padding:0;">$14.50</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Track card 2 -->
    <mj-section background-color="#1a1a1a" padding="8px 20px 0">
      <mj-column background-color="#1e1e1e" border-radius="8px" padding="18px 20px">
        <mj-text font-size="16px" font-weight="bold" color="#ffffff" padding="0 0 4px">
          Ghost Signal
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0 0 10px">
          Cinematic · Dark · 4:05
        </mj-text>
        <mj-table font-size="13px" cellpadding="0">
          <tr>
            <td style="color:#6b7280;text-decoration:line-through;padding:0;">Extended: $79.00</td>
            <td style="text-align:right;color:#d97706;font-weight:700;font-size:16px;padding:0;">$39.50</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Track card 3 -->
    <mj-section background-color="#1a1a1a" padding="8px 20px 20px">
      <mj-column background-color="#1e1e1e" border-radius="8px" padding="18px 20px">
        <mj-text font-size="16px" font-weight="bold" color="#ffffff" padding="0 0 4px">
          Copper Sun
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0 0 10px">
          Indie Folk · Warm · 3:51
        </mj-text>
        <mj-table font-size="13px" cellpadding="0">
          <tr>
            <td style="color:#6b7280;text-decoration:line-through;padding:0;">Standard: $29.00</td>
            <td style="text-align:right;color:#d97706;font-weight:700;font-size:16px;padding:0;">$14.50</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Coupon code block -->
    <mj-section background-color="#1f1f1f" padding="24px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 8px" letter-spacing="2px">
          YOUR PROMO CODE
        </mj-text>
        <mj-text align="center" padding="0 0 8px">
          <span style="display:inline-block;border:2px dashed #d97706;border-radius:6px;padding:12px 32px;font-size:24px;font-weight:900;color:#fbbf24;letter-spacing:6px;">BF2025</span>
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Apply at checkout for 50% off all license types
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#0a0a0a" padding="24px 32px 32px">
      <mj-column>
        <mj-button background-color="#d97706" color="#000000" font-size="15px" font-weight="bold" padding="15px 36px" border-radius="6px" align="center" href="#" inner-padding="15px 36px">
          Shop the Sale →
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer with terms -->
    <mj-section background-color="#0a0a0a" padding="0 32px 20px">
      <mj-column>
        <mj-divider border-color="#1f1f1f" border-width="1px" padding="0 0 16px" />
        <mj-text font-size="11px" color="#4b5563" align="center" padding="0 0 8px">
          50% discount applies to all standard, extended, and broadcast licenses. Exclusive licenses excluded. Offer valid until 11:59 PM PST November 29, 2025.
        </mj-text>
        <mj-text font-size="11px" color="#374151" align="center" padding="0">
          © 2025 SyncMusic Inc. &nbsp;·&nbsp; <a href="#" style="color:#4b5563;">Unsubscribe</a> &nbsp;·&nbsp; <a href="#" style="color:#4b5563;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
