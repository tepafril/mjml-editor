import type { EmailTemplate } from '@/types/template.types'

export const subscriptionUpgrade: EmailTemplate = {
  id: 'subscription-upgrade',
  name: "You've Upgraded Your Plan",
  description: 'Confirms plan upgrade and outlines new features and download limits now available.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Welcome to Pro — SyncMusic</mj-title>
    <mj-preview>You've upgraded to Pro! 15 downloads/month, stems access, and priority support are now unlocked.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Celebration header -->
    <mj-section background-color="#4f46e5" padding="30px 32px 24px">
      <mj-column>
        <mj-text font-size="36px" align="center" padding="0 0 6px">
          🎉
        </mj-text>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          You've Upgraded to Pro!
        </mj-text>
        <mj-text font-size="14px" color="#c4b5fd" align="center" padding="0">
          Your SyncMusic experience just leveled up.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Confetti dots decorative bar -->
    <mj-section background-color="#4338ca" padding="6px 32px">
      <mj-column>
        <mj-text align="center" font-size="16px" padding="0" color="#a5b4fc">
          · · · · · · · · · · · · · · · · · · · · ·
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Plan comparison -->
    <mj-section background-color="#ffffff" padding="32px 24px 24px">
      <mj-column width="48%" background-color="#f9fafb" border-radius="8px" padding="20px 16px" border="1px solid #e5e7eb" vertical-align="top">
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0 0 8px" letter-spacing="1px" font-weight="bold">
          PREVIOUS PLAN
        </mj-text>
        <mj-text font-size="20px" font-weight="bold" color="#6b7280" align="center" padding="0 0 12px">
          Starter
        </mj-text>
        <mj-table font-size="12px" color="#9ca3af" cellpadding="0">
          <tr><td style="padding:4px 0;">✗ &nbsp;3 downloads / month</td></tr>
          <tr><td style="padding:4px 0;">✗ &nbsp;No stems access</td></tr>
          <tr><td style="padding:4px 0;">✗ &nbsp;Standard support</td></tr>
          <tr><td style="padding:4px 0;">✗ &nbsp;Standard commercial use</td></tr>
        </mj-table>
      </mj-column>
      <mj-column width="4%" padding="0">
        <mj-text align="center" font-size="20px" color="#4f46e5" padding="40px 0 0">
          →
        </mj-text>
      </mj-column>
      <mj-column width="48%" background-color="#f5f3ff" border-radius="8px" padding="20px 16px" border="2px solid #4f46e5" vertical-align="top">
        <mj-text font-size="11px" color="#6d28d9" align="center" padding="0 0 8px" letter-spacing="1px" font-weight="bold">
          YOUR NEW PLAN
        </mj-text>
        <mj-text font-size="20px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 12px">
          Pro
        </mj-text>
        <mj-table font-size="12px" color="#374151" cellpadding="0">
          <tr><td style="padding:4px 0;color:#16a34a;">✓ &nbsp;<strong>15 downloads</strong> / month</td></tr>
          <tr><td style="padding:4px 0;color:#16a34a;">✓ &nbsp;<strong>Stems access</strong> included</td></tr>
          <tr><td style="padding:4px 0;color:#16a34a;">✓ &nbsp;<strong>Priority</strong> support</td></tr>
          <tr><td style="padding:4px 0;color:#16a34a;">✓ &nbsp;<strong>Extended</strong> commercial use</td></tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- New benefits detail -->
    <mj-section background-color="#ffffff" padding="8px 32px 24px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 24px" />
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 16px">
          What's New for You
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:32px;">
              <span style="font-size:18px;">🎵</span>
            </td>
            <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;">
              <strong style="color:#111827;">15 Downloads per Month</strong><br />
              <span style="color:#6b7280;font-size:12px;">More tracks, more projects. Your download allowance resets on your billing date.</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:32px;">
              <span style="font-size:18px;">🎛️</span>
            </td>
            <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;">
              <strong style="color:#111827;">Stems Access</strong><br />
              <span style="color:#6b7280;font-size:12px;">Download individual stems — drums, melody, bass — for full creative control in your edits.</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:32px;">
              <span style="font-size:18px;">⚡</span>
            </td>
            <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;">
              <strong style="color:#111827;">Priority Support</strong><br />
              <span style="color:#6b7280;font-size:12px;">Skip the queue. Pro members get responses within 4 hours on business days.</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;vertical-align:top;width:32px;">
              <span style="font-size:18px;">📺</span>
            </td>
            <td style="padding:10px 0 10px 12px;">
              <strong style="color:#111827;">Extended Commercial Use</strong><br />
              <span style="color:#6b7280;font-size:12px;">Broadcast, streaming platforms, paid ads, and online video — all covered under Pro licensing.</span>
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Pro-rated billing note -->
    <mj-section background-color="#fffbeb" padding="16px 32px" border-left="4px solid #f59e0b">
      <mj-column>
        <mj-text font-size="13px" color="#92400e" padding="0">
          <strong>Billing note:</strong> You've been charged a pro-rated amount of <strong>$11.61</strong> for the remainder of this billing cycle. Your full $19.00 charge begins April 26, 2025.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="28px 32px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="14px" font-weight="bold" padding="13px 28px" border-radius="6px" align="center" href="#" inner-padding="13px 28px">
          Explore Your New Benefits
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
