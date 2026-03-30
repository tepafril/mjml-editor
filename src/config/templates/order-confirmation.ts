import type { EmailTemplate } from '@/types/template.types'

export const orderConfirmation: EmailTemplate = {
  id: 'order-confirmation',
  name: 'Order Confirmation',
  description: 'Order confirmed email with order summary table, shipping address, and total.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Order Confirmed! — SyncMusic</mj-title>
    <mj-preview>Your order #SM-48291 has been confirmed. Thank you for your purchase!</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">
    <mj-section background-color="#4f46e5" padding="20px 24px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="32px 32px 16px">
      <mj-column>
        <mj-text font-size="36px" align="center" padding="0 0 8px">
          ✅
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Order Confirmed!
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 4px">
          Thank you for your purchase. Your order is being processed.
        </mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 24px">
          Order #SM-48291
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="16px 32px 8px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 12px">
          Order Summary
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="8px">
          <tr style="background-color:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <th style="text-align:left;font-weight:600;color:#6b7280;padding:8px;">Product</th>
            <th style="text-align:center;font-weight:600;color:#6b7280;padding:8px;">Qty</th>
            <th style="text-align:right;font-weight:600;color:#6b7280;padding:8px;">Price</th>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:10px 8px;">SyncMusic Pro — Annual</td>
            <td style="text-align:center;padding:10px 8px;">1</td>
            <td style="text-align:right;padding:10px 8px;">$99.00</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:10px 8px;">Sample Pack Bundle</td>
            <td style="text-align:center;padding:10px 8px;">2</td>
            <td style="text-align:right;padding:10px 8px;">$39.98</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:10px 8px;">Mixing Masterclass</td>
            <td style="text-align:center;padding:10px 8px;">1</td>
            <td style="text-align:right;padding:10px 8px;">$29.00</td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td colspan="2" style="padding:10px 8px;font-weight:700;color:#111827;">Total</td>
            <td style="text-align:right;padding:10px 8px;font-weight:700;color:#4f46e5;font-size:15px;">$167.98</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 32px 24px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="16px 0 8px">
          Shipping Address
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Alex Johnson<br />
          456 Harmony Street, Apt 3B<br />
          Austin, TX 78701<br />
          United States
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 4px">
          Questions about your order? Contact <a href="mailto:orders@syncmusic.app" style="color:#4f46e5;">orders@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a> · <a href="#" style="color:#9ca3af;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
