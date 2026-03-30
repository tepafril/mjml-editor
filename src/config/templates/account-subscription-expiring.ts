import type { EmailTemplate } from '@/types/template.types'

export const accountSubscriptionExpiring: EmailTemplate = {
  id: 'account-subscription-expiring',
  name: 'Your Subscription Expires in 7 Days',
  description: 'Renewal reminder sent 7 days before subscription expiry with renew CTA.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your SyncMusic Subscription Expires in 7 Days</mj-title>
    <mj-preview>Don't lose access to your tracks, stems, and extended licenses. Renew before April 2.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#4f46e5" padding="20px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="4px 0 0" letter-spacing="2px">
          ACCOUNT NOTICE
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Warning Banner -->
    <mj-section background-color="#fef9c3" padding="16px 24px">
      <mj-column width="36px" padding="0 10px 0 0">
        <mj-text font-size="22px" padding="0">⚠️</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#854d0e" padding="0 0 2px">
          7 Days Remaining
        </mj-text>
        <mj-text font-size="13px" color="#92400e" padding="0">
          Your Pro Plan subscription expires on <strong>April 2, 2025</strong>. Renew now to keep uninterrupted access.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Current Plan Summary -->
    <mj-section background-color="#ffffff" padding="28px 24px 16px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 16px">
          Your Current Plan
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          <strong>Plan:</strong> Pro Plan — $19 / month
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          <strong>Status:</strong> Active — expiring April 2, 2025
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          <strong>Member since:</strong> October 14, 2024
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What You'll Lose -->
    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 14px">
          What you'll lose if you don't renew
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#fff1f2" padding="14px 24px">
      <mj-column width="28px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">❌</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#be123c" padding="0 0 2px">Download Access</mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">You won't be able to download new tracks. Previously downloaded tracks remain licensed.</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="14px 24px">
      <mj-column width="28px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">❌</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#be123c" padding="0 0 2px">Stem Files</mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">Access to individual instrument stems (drums, bass, melody) will be suspended on expiry.</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#fff1f2" padding="14px 24px">
      <mj-column width="28px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">❌</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#be123c" padding="0 0 2px">Extended License Requests</mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">Extended licenses for broadcast, film, and advertising require an active Pro or Studio subscription.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Primary CTA -->
    <mj-section background-color="#ffffff" padding="28px 24px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 40px" border-radius="8px" href="#" align="center">
          Renew Now
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Renewing takes less than 60 seconds. Your download history is preserved.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Annual Savings Pitch -->
    <mj-section background-color="#eef2ff" padding="24px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#4338ca" align="center" padding="0 0 8px" letter-spacing="2px">
          SAVE MORE WITH ANNUAL
        </mj-text>
        <mj-text font-size="17px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Switch to Annual — Save $45/year
        </mj-text>
        <mj-text font-size="13px" color="#4b5563" align="center" padding="0 0 16px">
          Pro Annual is just <strong>$14/month</strong> billed yearly. That's 2 months free compared to monthly billing. Plus, you'll never worry about renewal interruptions again.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="13px" inner-padding="12px 28px" border-radius="8px" href="#" align="center">
          Switch to Annual &amp; Save
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Support -->
    <mj-section background-color="#ffffff" padding="20px 24px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Questions about your plan? <a href="#" style="color: #4f46e5;">Contact our support team</a> — we're available 7 days a week.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="24px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. All rights reserved.<br />
          <a href="#" style="color: #4f46e5;">Unsubscribe</a> · <a href="#" style="color: #4f46e5;">Privacy Policy</a> · <a href="#" style="color: #4f46e5;">Help Center</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
