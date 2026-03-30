import type { EmailTemplate } from '@/types/template.types'

export const subscriptionRenewal: EmailTemplate = {
  id: 'subscription-renewal',
  name: 'Your Subscription Has Been Renewed',
  description: 'Sent when a recurring subscription auto-renews, confirming the charge and invoice.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Subscription Renewed — SyncMusic</mj-title>
    <mj-preview>Your Pro Plan has been renewed. $19.00 charged. Next billing: April 26, 2025.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo header -->
    <mj-section background-color="#4f46e5" padding="22px 32px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 2px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c4b5fd" align="center" padding="0" letter-spacing="2px">
          MUSIC LICENSING
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Renewal confirmation hero -->
    <mj-section background-color="#ffffff" padding="36px 32px 24px">
      <mj-column>
        <mj-text font-size="32px" align="center" padding="0 0 8px">
          🔄
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Subscription Renewed
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0 0 20px">
          Your <strong style="color:#4f46e5;">Pro Plan</strong> has been automatically renewed.
        </mj-text>
        <mj-text align="center" padding="0 0 8px">
          <span style="display:inline-block;background-color:#f5f3ff;border:1px solid #e0e7ff;border-radius:8px;padding:16px 32px;">
            <span style="display:block;font-size:13px;color:#6b7280;margin-bottom:4px;">Amount Charged</span>
            <span style="display:block;font-size:32px;font-weight:800;color:#4f46e5;">$19.00</span>
            <span style="display:block;font-size:12px;color:#9ca3af;margin-top:2px;">per month</span>
          </span>
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="20px 0 0" />
      </mj-column>
    </mj-section>

    <!-- Billing details -->
    <mj-section background-color="#ffffff" padding="8px 32px 24px">
      <mj-column>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Plan</td>
            <td style="padding:11px 14px;text-align:right;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">Pro Plan</td>
          </tr>
          <tr>
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Billing Date</td>
            <td style="padding:11px 14px;text-align:right;color:#111827;border-bottom:1px solid #e5e7eb;">March 26, 2025</td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Next Billing Date</td>
            <td style="padding:11px 14px;text-align:right;color:#111827;border-bottom:1px solid #e5e7eb;">April 26, 2025</td>
          </tr>
          <tr>
            <td style="padding:11px 14px;color:#6b7280;">Payment Method</td>
            <td style="padding:11px 14px;text-align:right;color:#111827;">Visa ending in 4242</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Download allowance reset -->
    <mj-section background-color="#f0fdf4" padding="20px 32px" border-left="4px solid #16a34a">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#15803d" padding="0 0 4px">
          Your monthly allowance has been reset
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0">
          You have <strong>15 track downloads</strong> available this month. Your allowance refreshes on the 26th of each month.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="28px 32px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="14px" font-weight="bold" padding="13px 28px" border-radius="6px" align="center" href="#" inner-padding="13px 28px">
          Manage Subscription
        </mj-button>
        <mj-text align="center" padding="12px 0 0">
          <a href="#" style="color:#4f46e5;font-size:13px;text-decoration:none;">Download Invoice PDF &rarr;</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Cancellation note -->
    <mj-section background-color="#f9fafb" padding="16px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          You can cancel your subscription at any time from your account settings. Cancellations take effect at the end of the current billing period.
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
