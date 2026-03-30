import type { EmailTemplate } from '@/types/template.types'

export const subscriptionDowngrade: EmailTemplate = {
  id: 'subscription-downgrade',
  name: 'Your Plan Has Been Changed',
  description: 'Confirms a plan downgrade, notes removed features, and offers a path to re-upgrade.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Plan Change Confirmed — SyncMusic</mj-title>
    <mj-preview>Your plan has changed from Pro to Starter, effective April 26, 2025. Your existing licenses remain valid.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Neutral header -->
    <mj-section background-color="#374151" padding="24px 32px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 2px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0" letter-spacing="2px">
          ACCOUNT UPDATE
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Change confirmation -->
    <mj-section background-color="#ffffff" padding="32px 32px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#111827" padding="0 0 8px">
          Your Plan Has Been Changed
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 20px">
          Hi Alex, we've processed your plan change as requested.
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Previous Plan</td>
            <td style="padding:11px 14px;text-align:right;border-bottom:1px solid #e5e7eb;">
              <span style="color:#6b7280;text-decoration:line-through;">Pro — $19/month</span>
            </td>
          </tr>
          <tr>
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">New Plan</td>
            <td style="padding:11px 14px;text-align:right;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">Starter — $0/month</td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;">Effective Date</td>
            <td style="padding:11px 14px;text-align:right;color:#111827;">April 26, 2025</td>
          </tr>
        </mj-table>
        <mj-text font-size="13px" color="#9ca3af" padding="12px 0 0">
          Your Pro plan remains active until the end of this billing cycle on April 26, 2025.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What changes -->
    <mj-section background-color="#fff7ed" padding="20px 32px" border-left="4px solid #ea580c">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#c2410c" padding="0 0 10px">
          What changes on April 26
        </mj-text>
        <mj-table font-size="13px" color="#9a3412" cellpadding="0">
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;">✗</td>
            <td style="padding:5px 0 5px 8px;"><strong>Download limit reduced to 3 tracks/month</strong> (was 15)</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;">✗</td>
            <td style="padding:5px 0 5px 8px;">Stems access will no longer be included</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;">✗</td>
            <td style="padding:5px 0 5px 8px;">Priority support reverts to standard queue</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;width:20px;">✗</td>
            <td style="padding:5px 0 5px 8px;">Extended commercial use no longer covered for new downloads</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Existing licenses remain valid -->
    <mj-section background-color="#f0fdf4" padding="20px 32px" border-left="4px solid #16a34a">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#15803d" padding="0 0 4px">
          Your existing licenses remain valid
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0">
          All tracks you've already licensed under Pro remain fully licensed. The change only applies to new downloads after April 26.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTAs -->
    <mj-section background-color="#ffffff" padding="28px 32px 16px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="14px" font-weight="bold" padding="13px 28px" border-radius="6px" align="center" href="#" inner-padding="13px 28px">
          Compare Plans
        </mj-button>
        <mj-text align="center" padding="12px 0 0">
          <a href="mailto:support@syncmusic.app" style="color:#6b7280;font-size:13px;text-decoration:none;">Questions? Contact Support &rarr;</a>
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
