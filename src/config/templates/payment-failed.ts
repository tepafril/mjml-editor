import type { EmailTemplate } from '@/types/template.types'

export const paymentFailed: EmailTemplate = {
  id: 'payment-failed',
  name: 'Payment Failed — Action Required',
  description: 'Urgent notification that a subscription payment failed with a link to update payment details.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Payment Failed — Action Required — SyncMusic</mj-title>
    <mj-preview>Action required: Your payment could not be processed. Update your payment method within 7 days.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Red alert banner -->
    <mj-section background-color="#dc2626" padding="18px 32px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#ffffff" align="center" padding="0 0 2px">
          ⚠️ Payment Could Not Be Processed
        </mj-text>
        <mj-text font-size="12px" color="#fecaca" align="center" padding="0">
          Immediate action required to keep your account active
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Logo bar -->
    <mj-section background-color="#1f2937" padding="14px 32px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What happened -->
    <mj-section background-color="#ffffff" padding="32px 32px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#111827" padding="0 0 12px">
          We couldn't charge your card
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 16px">
          Hi Alex — we attempted to renew your <strong>Pro Plan ($19.00/month)</strong> on March 26, 2025, but the charge was declined.
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="background-color:#fef2f2;border:1px solid #fecaca;border-radius:6px;">
            <td style="padding:14px 16px;vertical-align:top;width:28px;">
              <span style="color:#dc2626;font-size:18px;">✗</span>
            </td>
            <td style="padding:14px 16px;">
              <strong style="color:#dc2626;">Card ending in 4242 was declined</strong><br />
              <span style="color:#6b7280;font-size:12px;margin-top:2px;display:block;">Reason: Insufficient funds. Contact your bank or update to a new payment method.</span>
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Grace period -->
    <mj-section background-color="#fffbeb" padding="20px 32px" border-left="4px solid #f59e0b">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#92400e" padding="0 0 6px">
          You have 7 days to resolve this
        </mj-text>
        <mj-text font-size="13px" color="#78350f" padding="0">
          Your account will remain active until <strong>April 2, 2025</strong>. If payment is not resolved by then, your Pro subscription will be suspended and your account will revert to Starter.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Primary CTA -->
    <mj-section background-color="#ffffff" padding="28px 32px 12px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" align="center" padding="0 0 18px">
          Update your payment method now to avoid any interruption to your service.
        </mj-text>
        <mj-button background-color="#dc2626" color="#ffffff" font-size="15px" font-weight="bold" padding="15px 32px" border-radius="6px" align="center" href="#" inner-padding="15px 32px">
          Update Payment Method
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- What happens if unpaid -->
    <mj-section background-color="#ffffff" padding="8px 32px 28px">
      <mj-column>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="13px" font-weight="bold" color="#374151" padding="0 0 8px">
          What happens if this isn't resolved:
        </mj-text>
        <mj-table font-size="13px" color="#6b7280" cellpadding="0">
          <tr><td style="padding:4px 0;vertical-align:top;width:24px;">→</td><td style="padding:4px 0 4px 6px;">Your account reverts to the free Starter plan</td></tr>
          <tr><td style="padding:4px 0;vertical-align:top;width:24px;">→</td><td style="padding:4px 0 4px 6px;">Downloads limited to 3 tracks per month</td></tr>
          <tr><td style="padding:4px 0;vertical-align:top;width:24px;">→</td><td style="padding:4px 0 4px 6px;">Stems access and priority support are suspended</td></tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Support -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Need help? Our billing team is here — <a href="mailto:billing@syncmusic.app" style="color:#4f46e5;">billing@syncmusic.app</a> or <a href="#" style="color:#4f46e5;">chat with us</a>
        </mj-text>
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
