import type { EmailTemplate } from '@/types/template.types'

export const accountPaymentExpiring: EmailTemplate = {
  id: 'account-payment-expiring',
  name: 'Update Your Payment Method — Card Expiring Soon',
  description: 'Alert when the credit card on file is expiring within 30 days.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Action Required: Your Card Is Expiring Soon</mj-title>
    <mj-preview>Your card ending in 4242 expires 01/26 — update it now to keep your subscription active.</mj-preview>
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

    <!-- Warning Banner -->
    <mj-section background-color="#fef3c7" padding="14px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#92400e" align="center" padding="0">
          ⚠️  Action Required — Your Payment Method Is Expiring
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Card Notice -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" color="#111827" padding="0 0 8px">
          Your card is expiring soon
        </mj-text>
        <mj-text font-size="15px" color="#374151" padding="0 0 20px">
          Hi Alex, the credit card on your SyncMusic account is expiring within the next 30 days. Please update your payment method to avoid any interruption to your subscription.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Card Details Box -->
    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column border="1px solid #fde68a" border-radius="8px" background-color="#fffbeb" padding="16px 20px">
        <mj-text font-size="13px" color="#92400e" padding="0 0 4px" font-weight="bold">
          CARD ON FILE
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          •••• •••• •••• 4242
        </mj-text>
        <mj-text font-size="14px" color="#b45309" padding="0">
          Expires 01/26 — expires in less than 30 days
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What Happens -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          What happens if you don't update it?
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🔴 &nbsp;<strong>Subscription will pause</strong> — access to your licensed tracks and downloads will be suspended.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🔴 &nbsp;<strong>Active projects may be affected</strong> — any projects using streamed previews will stop working.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          🟢 &nbsp;<strong>Your existing licenses stay valid</strong> — all previously purchased licenses remain active regardless.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="8px 24px 32px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Update Payment Method
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Billing Settings Link -->
    <mj-section background-color="#f9fafb" padding="16px 24px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0 0 4px">
          You can also manage your billing at any time in
        </mj-text>
        <mj-text font-size="13px" color="#4f46e5" align="center" padding="0">
          <a href="#" style="color: #4f46e5; text-decoration: underline;">Account Settings → Billing &amp; Payments</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Support -->
    <mj-section background-color="#ffffff" padding="16px 24px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 16px" />
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Questions? Our support team is available 24/7 at <a href="mailto:support@syncmusic.com" style="color: #4f46e5;">support@syncmusic.com</a>
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
