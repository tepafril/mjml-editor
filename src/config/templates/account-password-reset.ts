import type { EmailTemplate } from '@/types/template.types'

export const accountPasswordReset: EmailTemplate = {
  id: 'account-password-reset',
  name: 'Reset Your Password',
  description: 'Minimal transactional email with password reset button and 1-hour expiry notice.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Reset Your SyncMusic Password</mj-title>
    <mj-preview>You requested a password reset. Click the button below to set a new password.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#4f46e5" padding="24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Main Card -->
    <mj-section background-color="#ffffff" padding="40px 32px 32px">
      <mj-column>
        <mj-text font-size="26px" font-weight="bold" color="#111827" align="center" padding="0 0 16px">
          Reset your password
        </mj-text>
        <mj-text font-size="15px" color="#4b5563" align="center" padding="0 0 28px" line-height="1.6">
          We received a request to reset the password for your SyncMusic account. Click the button below to choose a new password.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Reset Password
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Expiry Notice -->
    <mj-section background-color="#fffbeb" padding="16px 32px">
      <mj-column width="28px" padding="0 10px 0 0">
        <mj-text font-size="18px" padding="0">⏱️</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="13px" color="#92400e" padding="0">
          <strong>This link expires in 1 hour.</strong> If you don't reset your password within that time, you'll need to submit a new request.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Didn't request this -->
    <mj-section background-color="#ffffff" padding="24px 32px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0">
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged and your account is secure.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Button Fallback URL -->
    <mj-section background-color="#f9fafb" padding="16px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          If the button doesn't work, copy and paste this link into your browser:
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" align="center" padding="0">
          https://app.syncmusic.io/reset-password?token=abc123xyz
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Support -->
    <mj-section background-color="#ffffff" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Need help? Reach our support team at <a href="mailto:support@syncmusic.io" style="color: #4f46e5;">support@syncmusic.io</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="24px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. All rights reserved.<br />
          This is a transactional email sent to your registered address.<br />
          <a href="#" style="color: #4f46e5;">Unsubscribe from marketing emails</a> · <a href="#" style="color: #4f46e5;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
