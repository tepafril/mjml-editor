import type { EmailTemplate } from '@/types/template.types'

export const accountDownloadLimit: EmailTemplate = {
  id: 'account-download-limit',
  name: "You've Hit Your Monthly Download Limit",
  description: 'Notification when a user reaches their plan download limit with upgrade options.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>You've Used All Your Downloads This Month — SyncMusic</mj-title>
    <mj-preview>You've reached your 5-download limit. Upgrade to Pro for 15 downloads/month, or wait for your reset on April 1.</mj-preview>
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

    <!-- Limit Notice Banner -->
    <mj-section background-color="#fee2e2" padding="20px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#991b1b" align="center" padding="0 0 6px">
          Download Limit Reached
        </mj-text>
        <mj-text font-size="14px" color="#7f1d1d" align="center" padding="0">
          You've used all <strong>5 downloads</strong> on your Starter Plan this month.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Reset Info -->
    <mj-section background-color="#ffffff" padding="24px 24px 8px">
      <mj-column>
        <mj-text font-size="15px" color="#374151" padding="0 0 8px">
          Your download limit resets on <strong>April 1, 2025</strong>. You'll be able to download 5 more tracks at no extra cost after that date.
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0">
          In the meantime, you can still browse the full catalog, preview any track, and save favorites to your collection.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Upgrade Pitch -->
    <mj-section background-color="#ffffff" padding="20px 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 8px">
          Need more tracks now?
        </mj-text>
        <mj-text font-size="14px" color="#4b5563" padding="0">
          Upgrade your plan and unlock more downloads, stems, and extended licensing today.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Plan Comparison -->
    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <!-- Starter -->
      <mj-column padding="0 6px 0 0">
        <mj-text align="center" padding="20px 12px" font-size="13px" color="#374151" background-color="#f3f4f6" border-radius="10px">
          <strong style="font-size: 15px; color: #111827;">Starter</strong><br />
          <span style="font-size: 24px; font-weight: bold; color: #4b5563;">$9</span><span style="font-size: 12px; color: #9ca3af;">/mo</span><br /><br />
          5 downloads/month<br />
          Standard license<br />
          MP3 only<br />
          <span style="color: #9ca3af;">No stems</span><br />
          <span style="color: #9ca3af;">No extended license</span><br /><br />
          <span style="background: #e5e7eb; color: #6b7280; font-size: 11px; padding: 4px 10px; border-radius: 20px;">Current Plan</span>
        </mj-text>
      </mj-column>
      <!-- Pro -->
      <mj-column padding="0 6px">
        <mj-text align="center" padding="20px 12px" font-size="13px" color="#374151" background-color="#eef2ff" border-radius="10px" border="2px solid #4f46e5">
          <strong style="font-size: 15px; color: #4f46e5;">Pro</strong><br />
          <span style="font-size: 24px; font-weight: bold; color: #4f46e5;">$19</span><span style="font-size: 12px; color: #6b7280;">/mo</span><br /><br />
          15 downloads/month<br />
          Standard license<br />
          MP3 + WAV<br />
          Stems included<br />
          <span style="color: #9ca3af;">No extended license</span><br /><br />
          <span style="background: #4f46e5; color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 20px;">Most Popular</span>
        </mj-text>
      </mj-column>
      <!-- Studio -->
      <mj-column padding="0 0 0 6px">
        <mj-text align="center" padding="20px 12px" font-size="13px" color="#374151" background-color="#f9fafb" border-radius="10px">
          <strong style="font-size: 15px; color: #111827;">Studio</strong><br />
          <span style="font-size: 24px; font-weight: bold; color: #4b5563;">$49</span><span style="font-size: 12px; color: #9ca3af;">/mo</span><br /><br />
          Unlimited downloads<br />
          Standard license<br />
          MP3 + WAV + AIFF<br />
          Stems included<br />
          Extended license<br /><br />
          <span style="background: #e5e7eb; color: #6b7280; font-size: 11px; padding: 4px 10px; border-radius: 20px;">For Agencies</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#4f46e5" padding="28px 24px">
      <mj-column>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="15px" font-weight="bold" inner-padding="14px 36px" border-radius="8px" href="#" align="center">
          Upgrade Your Plan
        </mj-button>
        <mj-text font-size="12px" color="#c7d2fe" align="center" padding="14px 0 0">
          Or <a href="#" style="color: #ffffff;">wait for your reset on April 1</a> — no action needed.
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
