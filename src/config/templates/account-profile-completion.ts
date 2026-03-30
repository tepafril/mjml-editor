import type { EmailTemplate } from '@/types/template.types'

export const accountProfileCompletion: EmailTemplate = {
  id: 'account-profile-completion',
  name: 'Complete Your Creator Profile',
  description: 'Nudge to complete an incomplete profile with progress indicator and benefits of completing.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Complete Your SyncMusic Creator Profile</mj-title>
    <mj-preview>Your profile is 40% complete. Finish setting up to get better recommendations and faster license support.</mj-preview>
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
          PROFILE SETUP
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Heading -->
    <mj-section background-color="#ffffff" padding="36px 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" color="#111827" padding="0 0 10px">
          Your profile is almost set up
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0">
          A complete profile helps us surface music that matches your exact workflow — and speeds up license support if you ever need it.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Progress Bar -->
    <mj-section background-color="#ffffff" padding="20px 24px 8px">
      <mj-column>
        <mj-text font-size="12px" font-weight="bold" color="#4f46e5" padding="0 0 8px">
          Profile completion: 40%
        </mj-text>
        <!-- Background bar -->
        <mj-image src="https://placehold.co/552x10/e5e7eb/e5e7eb?text=+" alt="Progress background" width="552px" padding="0" border-radius="999px" />
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="2px 24px 20px">
      <mj-column>
        <!-- Filled portion -->
        <mj-image src="https://placehold.co/220x10/4f46e5/4f46e5?text=+" alt="Progress fill" width="220px" padding="0" border-radius="999px" align="left" />
      </mj-column>
    </mj-section>

    <!-- Checklist -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 16px">
          Steps to complete
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 1: Done -->
    <mj-section background-color="#f0fdf4" padding="12px 24px">
      <mj-column width="32px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">✅</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#166534" padding="0 0 1px">Email Confirmed</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Your email address has been verified.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 2: Done -->
    <mj-section background-color="#f0fdf4" padding="12px 24px">
      <mj-column width="32px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">✅</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#166534" padding="0 0 1px">Password Set</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Your account is secured with a strong password.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 3: Incomplete -->
    <mj-section background-color="#fafafa" padding="12px 24px">
      <mj-column width="32px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">⬜</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 1px">Creator Type</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Tell us how you use music — YouTuber, filmmaker, podcast host, agency, or other.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 4: Incomplete -->
    <mj-section background-color="#fafafa" padding="12px 24px">
      <mj-column width="32px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">⬜</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 1px">Preferred Genres</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Select the genres you use most — we'll prioritize them in your recommendations feed.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 5: Incomplete -->
    <mj-section background-color="#fafafa" padding="12px 24px">
      <mj-column width="32px" padding="0 12px 0 0">
        <mj-text font-size="16px" padding="0">⬜</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 1px">Profile Photo</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Add a photo so our support team can better assist you with license requests.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Why It Matters -->
    <mj-section background-color="#ffffff" padding="28px 24px 16px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 16px">
          Why it matters
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column padding="0 8px 0 0">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#eef2ff" border-radius="8px">
          <strong style="color: #4f46e5;">🎯 Better Recommendations</strong><br /><br />
          Knowing your creator type and preferred genres lets us surface tracks you'll actually want to license — no more scrolling past irrelevant results.
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#eef2ff" border-radius="8px">
          <strong style="color: #4f46e5;">⚡ Faster License Support</strong><br /><br />
          A complete profile means our support team can verify your identity and resolve license questions in minutes, not hours.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column padding="0 8px 0 0">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#eef2ff" border-radius="8px">
          <strong style="color: #4f46e5;">📬 Curated Emails</strong><br /><br />
          We'll only send you genre collections and new releases you actually care about — no noise, just relevant music.
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#eef2ff" border-radius="8px">
          <strong style="color: #4f46e5;">🏆 Creator Milestones</strong><br /><br />
          A complete profile unlocks your Creator Score — track your licensing activity and unlock badges as you grow.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#4f46e5" padding="32px 24px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px">
          Takes less than 2 minutes
        </mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0 0 20px">
          Complete the 3 remaining steps and unlock your full SyncMusic experience.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" inner-padding="14px 32px" border-radius="8px" href="#" align="center">
          Complete My Profile
        </mj-button>
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
