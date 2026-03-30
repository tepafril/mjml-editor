import type { EmailTemplate } from '@/types/template.types'

export const promoFlashSale: EmailTemplate = {
  id: 'promo-flash-sale',
  name: '48-Hour Flash Sale — Today Only',
  description: 'Short-window flash sale on a specific bundle with a countdown urgency message.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Flash Sale — 48 Hours Only — SyncMusic</mj-title>
    <mj-preview>Cinematic Bundle — 20 tracks, Extended License. Was $199, now $99. Code: FLASH48. Ends soon.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Urgent orange/red header -->
    <mj-section background-color="#ea580c" padding="0">
      <mj-column>
        <mj-text font-size="11px" color="#fed7aa" align="center" padding="8px 32px" letter-spacing="2px" font-weight="bold">
          ⚡ LIMITED TIME OFFER ⚡
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#c2410c" padding="24px 32px 20px">
      <mj-column>
        <mj-text font-size="32px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px" line-height="1.1">
          FLASH SALE
        </mj-text>
        <mj-text font-size="18px" color="#fed7aa" align="center" padding="0" letter-spacing="2px">
          48 HOURS ONLY
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Logo bar -->
    <mj-section background-color="#1c1917" padding="12px 32px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured bundle hero -->
    <mj-section background-color="#ffffff" padding="32px 32px 20px">
      <mj-column>
        <mj-text font-size="11px" color="#ea580c" align="center" padding="0 0 8px" letter-spacing="2px" font-weight="bold">
          FEATURED BUNDLE
        </mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#111827" align="center" padding="0 0 6px" line-height="1.2">
          Cinematic Bundle
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 20px">
          20 tracks · Extended License · All media &amp; broadcast use
        </mj-text>

        <!-- Was/Now pricing -->
        <mj-table font-size="14px" cellpadding="0">
          <tr>
            <td style="text-align:center;padding:0;">
              <span style="display:block;font-size:13px;color:#9ca3af;text-decoration:line-through;margin-bottom:2px;">Regular Price: $199.00</span>
              <span style="display:inline-block;background-color:#fff7ed;border:2px solid #ea580c;border-radius:8px;padding:12px 28px;">
                <span style="display:block;font-size:11px;color:#ea580c;font-weight:700;letter-spacing:1px;margin-bottom:4px;">FLASH PRICE</span>
                <span style="display:block;font-size:40px;font-weight:900;color:#ea580c;line-height:1;">$99</span>
                <span style="display:block;font-size:12px;color:#9ca3af;margin-top:2px;">Save $100 · 50% off</span>
              </span>
            </td>
          </tr>
        </mj-table>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="20px 0 0" />
      </mj-column>
    </mj-section>

    <!-- Track preview cards -->
    <mj-section background-color="#ffffff" padding="8px 32px 16px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 14px">
          Preview Tracks
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column background-color="#f9fafb" border-radius="8px" border="1px solid #e5e7eb" padding="14px 16px" vertical-align="top">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">
          Interstellar Haze
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0 0 6px">
          Cinematic · Epic · 4:12
        </mj-text>
        <mj-text font-size="12px" color="#ea580c" padding="0" font-weight="600">
          Included in bundle
        </mj-text>
      </mj-column>
      <mj-column background-color="#f9fafb" border-radius="8px" border="1px solid #e5e7eb" padding="14px 16px" vertical-align="top">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">
          Final Ascent
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0 0 6px">
          Orchestral · Powerful · 3:58
        </mj-text>
        <mj-text font-size="12px" color="#ea580c" padding="0" font-weight="600">
          Included in bundle
        </mj-text>
      </mj-column>
      <mj-column background-color="#f9fafb" border-radius="8px" border="1px solid #e5e7eb" padding="14px 16px" vertical-align="top">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">
          Velvet Dusk
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0 0 6px">
          Ambient · Atmospheric · 5:02
        </mj-text>
        <mj-text font-size="12px" color="#ea580c" padding="0" font-weight="600">
          Included in bundle
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 8px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          + 17 more tracks included
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Coupon code -->
    <mj-section background-color="#fff7ed" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9a3412" align="center" padding="0 0 8px" letter-spacing="2px" font-weight="bold">
          USE CODE AT CHECKOUT
        </mj-text>
        <mj-text align="center" padding="0">
          <span style="display:inline-block;background-color:#ffffff;border:2px dashed #ea580c;border-radius:6px;padding:10px 28px;font-size:22px;font-weight:900;color:#ea580c;letter-spacing:5px;">FLASH48</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="24px 32px 16px">
      <mj-column>
        <mj-button background-color="#ea580c" color="#ffffff" font-size="16px" font-weight="bold" padding="15px 36px" border-radius="6px" align="center" href="#" inner-padding="15px 36px">
          Grab the Bundle →
        </mj-button>
        <mj-text font-size="12px" color="#ea580c" align="center" padding="10px 0 0" font-weight="bold">
          Offer expires in 48 hours — don't miss it
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Why Extended explainer -->
    <mj-section background-color="#f9fafb" padding="24px 32px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 10px">
          Why Extended License?
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;color:#16a34a;">✓</td>
            <td style="padding:5px 0 5px 8px;">Film, TV, and streaming platforms</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;color:#16a34a;">✓</td>
            <td style="padding:5px 0 5px 8px;">Paid advertising and commercial campaigns</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;color:#16a34a;">✓</td>
            <td style="padding:5px 0 5px 8px;">Broadcast and theatrical distribution</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;color:#16a34a;">✓</td>
            <td style="padding:5px 0 5px 8px;">Perpetual use — license never expires</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0 0 4px">
          Offer valid for 48 hours from time of receipt. Bundle contents may vary. One use per account.
        </mj-text>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. &nbsp;·&nbsp; <a href="#" style="color:#9ca3af;">Unsubscribe</a> &nbsp;·&nbsp; <a href="#" style="color:#9ca3af;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
