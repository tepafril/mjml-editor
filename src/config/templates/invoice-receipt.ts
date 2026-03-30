import type { EmailTemplate } from '@/types/template.types'

export const invoiceReceipt: EmailTemplate = {
  id: 'invoice-receipt',
  name: 'Your SyncMusic Invoice',
  description: 'Standard payment receipt and invoice formatted for business expense filing.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Invoice #SYN-2025-4821 — SyncMusic</mj-title>
    <mj-preview>Invoice for Midnight Drive — Standard License. Amount: $29.00. PAID.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Clean white header with invoice number -->
    <mj-section background-color="#ffffff" padding="28px 32px 20px" border-bottom="3px solid #4f46e5">
      <mj-column width="50%">
        <mj-text font-size="22px" font-weight="bold" color="#4f46e5" padding="0">
          SyncMusic
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="4px 0 0">
          Music Licensing Platform
        </mj-text>
      </mj-column>
      <mj-column width="50%">
        <mj-text font-size="13px" color="#6b7280" align="right" padding="0 0 4px">
          <strong style="color:#111827;font-size:16px;">Invoice</strong>
        </mj-text>
        <mj-text font-size="13px" color="#4f46e5" align="right" font-weight="bold" padding="0 0 2px">
          #SYN-2025-4821
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" align="right" padding="0">
          Date: March 26, 2025
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Billing details -->
    <mj-section background-color="#ffffff" padding="24px 32px 8px">
      <mj-column width="50%">
        <mj-text font-size="11px" font-weight="bold" color="#9ca3af" padding="0 0 6px" letter-spacing="1px">
          BILLED TO
        </mj-text>
        <mj-text font-size="14px" color="#111827" font-weight="bold" padding="0 0 2px">
          Alex Johnson
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 2px">
          alex@studio42.com
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Studio 42 Productions
        </mj-text>
      </mj-column>
      <mj-column width="50%">
        <mj-text font-size="11px" font-weight="bold" color="#9ca3af" padding="0 0 6px" letter-spacing="1px">
          FROM
        </mj-text>
        <mj-text font-size="14px" color="#111827" font-weight="bold" padding="0 0 2px">
          SyncMusic Inc.
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 2px">
          billing@syncmusic.app
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          San Francisco, CA 94105
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Invoice table -->
    <mj-section background-color="#ffffff" padding="16px 32px 8px">
      <mj-column>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="background-color:#4f46e5;">
            <th style="text-align:left;color:#ffffff;font-weight:600;padding:10px 14px;font-size:12px;letter-spacing:0.5px;">DESCRIPTION</th>
            <th style="text-align:center;color:#ffffff;font-weight:600;padding:10px 14px;font-size:12px;letter-spacing:0.5px;">QTY</th>
            <th style="text-align:right;color:#ffffff;font-weight:600;padding:10px 14px;font-size:12px;letter-spacing:0.5px;">UNIT PRICE</th>
            <th style="text-align:right;color:#ffffff;font-weight:600;padding:10px 14px;font-size:12px;letter-spacing:0.5px;">TOTAL</th>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 14px;">
              <strong style="color:#111827;">Midnight Drive</strong><br />
              <span style="color:#9ca3af;font-size:12px;">Standard License — All Digital Platforms</span>
            </td>
            <td style="text-align:center;padding:12px 14px;color:#6b7280;">1</td>
            <td style="text-align:right;padding:12px 14px;">$29.00</td>
            <td style="text-align:right;padding:12px 14px;font-weight:600;color:#111827;">$29.00</td>
          </tr>
          <tr style="background-color:#f9fafb;border-top:1px solid #e5e7eb;">
            <td colspan="3" style="padding:10px 14px;text-align:right;color:#6b7280;font-size:12px;">Subtotal</td>
            <td style="padding:10px 14px;text-align:right;color:#374151;">$29.00</td>
          </tr>
          <tr style="background-color:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <td colspan="3" style="padding:10px 14px;text-align:right;color:#6b7280;font-size:12px;">Tax (0%)</td>
            <td style="padding:10px 14px;text-align:right;color:#374151;">$0.00</td>
          </tr>
          <tr>
            <td colspan="3" style="padding:12px 14px;text-align:right;font-weight:700;color:#111827;font-size:15px;">Total</td>
            <td style="padding:12px 14px;text-align:right;font-weight:700;color:#4f46e5;font-size:16px;">$29.00</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- PAID stamp -->
    <mj-section background-color="#ffffff" padding="8px 32px 24px">
      <mj-column>
        <mj-text align="center" padding="8px 0">
          <span style="display:inline-block;border:3px solid #16a34a;color:#16a34a;font-size:24px;font-weight:900;letter-spacing:4px;padding:6px 20px;border-radius:4px;opacity:0.85;">PAID</span>
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="8px 0 0">
          Payment processed on March 26, 2025 via Visa ending in 4242
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Download CTA -->
    <mj-section background-color="#f9fafb" padding="24px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" align="center" padding="0 0 16px">
          Keep this invoice for your business expense records.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="14px" font-weight="bold" padding="13px 28px" border-radius="6px" align="center" href="#" inner-padding="13px 28px">
          Download Invoice PDF
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. &nbsp;·&nbsp; <a href="#" style="color:#9ca3af;">Unsubscribe</a> &nbsp;·&nbsp; <a href="#" style="color:#9ca3af;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
