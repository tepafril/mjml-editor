import type { EmailTemplate } from '@/types/template.types'

export const passwordReset: EmailTemplate = {
  id: 'password-reset',
  name: 'Password Reset',
  description: 'Minimal transactional email with reset button and 24h expiry notice.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Reset your password — SyncMusic</mj-title>
    <mj-preview>We received a request to reset your SyncMusic password.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">
    <mj-section background-color="#ffffff" padding="32px 40px" border-radius="12px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 24px">
          SyncMusic
        </mj-text>

        <mj-text font-size="40px" align="center" padding="0 0 16px">
          🔒
        </mj-text>

        <mj-text font-size="22px" font-weight="bold" color="#111827" align="center" padding="0 0 12px" line-height="1.3">
          Reset your password
        </mj-text>

        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 28px">
          We received a request to reset the password for your SyncMusic account. Click the button below to choose a new password.
        </mj-text>

        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Reset Password
        </mj-button>

        <mj-text font-size="13px" color="#9ca3af" align="center" padding="20px 0 0">
          This link expires in <strong style="color:#374151;">24 hours</strong>. If you didn't request a password reset, you can safely ignore this email — your password will not change.
        </mj-text>

        <mj-divider border-color="#e5e7eb" border-width="1px" padding="24px 0 16px" />

        <mj-text font-size="12px" color="#d1d5db" align="center" padding="0">
          For security, this request was received from an unknown device. If this wasn't you, please <a href="#" style="color:#4f46e5;">secure your account</a>.<br /><br />
          © 2025 SyncMusic Inc. · 123 Music Lane, San Francisco, CA 94103<br />
          <a href="#" style="color:#9ca3af;">Privacy Policy</a> · <a href="#" style="color:#9ca3af;">Terms of Service</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
