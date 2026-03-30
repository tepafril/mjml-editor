import type { EmailTemplate } from '@/types/template.types'

export const welcomeConfirmEmail: EmailTemplate = {
  id: 'welcome-confirm-email',
  name: 'Confirm Your Email Address',
  description: 'Email verification sent after registration with a confirmation button.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Confirm Your Email — SyncMusic</mj-title>
    <mj-preview>Please confirm your email address to activate your SyncMusic account.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Minimal Header -->
    <mj-section background-color="#ffffff" padding="24px 32px" border-bottom="3px solid #4f46e5">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#4f46e5" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Main Content -->
    <mj-section background-color="#ffffff" padding="48px 32px 32px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 12px" letter-spacing="2px">
          ACTION REQUIRED
        </mj-text>
        <mj-text font-size="28px" font-weight="bold" color="#111827" align="center" padding="0 0 16px" line-height="1.2">
          Confirm your email address
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0 0 8px" line-height="1.7">
          Thanks for signing up for SyncMusic. Before you can start licensing music for your projects, we need to verify that this email address belongs to you.
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0 0 32px" line-height="1.7">
          Click the button below to confirm your address and activate your account.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 56px" border-radius="8px" href="#" align="center">
          Confirm My Email
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Expiry Note -->
    <mj-section background-color="#fffbeb" padding="16px 32px" border-left="4px solid #f59e0b">
      <mj-column>
        <mj-text font-size="13px" color="#92400e" align="center" padding="0" line-height="1.5">
          This link expires in <strong>48 hours</strong>. If you didn't create a SyncMusic account, you can safely ignore this email.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Fallback Link -->
    <mj-section background-color="#ffffff" padding="24px 32px 40px">
      <mj-column>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0" line-height="1.5">
          Button not working? Copy and paste this link into your browser:<br />
          <a href="#" style="color:#4f46e5; word-break: break-all;">https://app.syncmusic.io/verify?token=abc123xyz</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Need help? Contact us at <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
