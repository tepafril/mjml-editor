import type { EmailTemplate } from '@/types/template.types'

export const promoSale: EmailTemplate = {
  id: 'promo-sale',
  name: 'Flash Sale',
  description: 'Bold promotional email with 50% OFF badge, product image, and 3 product cards.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>50% OFF — Limited Time Sale | SyncMusic</mj-title>
    <mj-preview>Huge savings on all plans — today only. Don't miss out!</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#0f0a1e">
    <mj-section background-color="#4f46e5" padding="16px 24px 0">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#4f46e5" padding="24px 24px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 8px" letter-spacing="3px">
          LIMITED TIME OFFER
        </mj-text>
        <mj-text font-size="64px" font-weight="bold" color="#ffffff" align="center" padding="0" line-height="1">
          50% OFF
        </mj-text>
        <mj-text font-size="18px" color="#c7d2fe" align="center" padding="8px 0 20px">
          All plans — this weekend only
        </mj-text>
        <mj-button background-color="#fbbf24" color="#0f0a1e" font-size="16px" font-weight="bold" inner-padding="16px 40px" border-radius="8px" href="#" align="center">
          Shop Now
        </mj-button>
        <mj-text font-size="11px" color="#a5b4fc" align="center" padding="12px 0 0">
          Offer expires Sunday at midnight. No code needed.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e1b4b" padding="0">
      <mj-column>
        <mj-image src="https://placehold.co/600x280/312e81/a5b4fc?text=SyncMusic+Pro" alt="Product" width="600px" padding="0" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e1b4b" padding="24px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          Featured Products
        </mj-text>
        <mj-text font-size="13px" color="#a5b4fc" align="center" padding="0">
          All items included in the sale
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e1b4b" padding="8px 16px 24px">
      <mj-column padding="0 6px">
        <mj-image src="https://placehold.co/160x120/312e81/a5b4fc?text=Starter" alt="Starter Plan" width="160px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="14px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          Starter
        </mj-text>
        <mj-text font-size="12px" color="#a5b4fc" align="center" padding="0 0 6px">
          Perfect for beginners
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 10px">
          $4.99<span style="font-size:11px;color:#6b7280;text-decoration:line-through;margin-left:4px;">$9.99</span>
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="11px" inner-padding="8px 16px" border-radius="6px" href="#" align="center">
          Get It
        </mj-button>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-image src="https://placehold.co/160x120/312e81/a5b4fc?text=Pro" alt="Pro Plan" width="160px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="14px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          Pro
        </mj-text>
        <mj-text font-size="12px" color="#a5b4fc" align="center" padding="0 0 6px">
          For serious creators
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 10px">
          $9.99<span style="font-size:11px;color:#6b7280;text-decoration:line-through;margin-left:4px;">$19.99</span>
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="11px" inner-padding="8px 16px" border-radius="6px" href="#" align="center">
          Get It
        </mj-button>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-image src="https://placehold.co/160x120/312e81/a5b4fc?text=Studio" alt="Studio Plan" width="160px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="14px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          Studio
        </mj-text>
        <mj-text font-size="12px" color="#a5b4fc" align="center" padding="0 0 6px">
          For teams &amp; studios
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 10px">
          $24.99<span style="font-size:11px;color:#6b7280;text-decoration:line-through;margin-left:4px;">$49.99</span>
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="11px" inner-padding="8px 16px" border-radius="6px" href="#" align="center">
          Get It
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#0f0a1e" padding="20px 24px">
      <mj-column>
        <mj-text font-size="11px" color="#4b5563" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#4f46e5;">Unsubscribe</a> · <a href="#" style="color:#4f46e5;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
