import type { EmailTemplate } from '@/types/template.types'

export const welcomeTrialStart: EmailTemplate = {
  id: 'welcome-trial-start',
  name: 'Your 14-Day Free Trial Has Started',
  description: 'Confirms trial activation and walks new users through what they can access.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your 14-Day Free Trial — SyncMusic</mj-title>
    <mj-preview>Your free trial is live. Here's everything you can access right now.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#4f46e5" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Trial Badge -->
    <mj-section background-color="#4f46e5" padding="0 32px 40px">
      <mj-column>
        <mj-text font-size="48px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px" line-height="1">
          14
        </mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#c7d2fe" align="center" padding="0 0 8px" letter-spacing="3px">
          DAYS REMAINING
        </mj-text>
        <mj-text font-size="16px" color="#e0e7ff" align="center" padding="0">
          Your free trial is now active. No credit card required until you're ready to upgrade.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What's Included -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 8px" letter-spacing="2px">
          WHAT'S INCLUDED IN YOUR TRIAL
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 16px">
          Everything you need to get started
        </mj-text>

        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✓ &nbsp;<strong>Standard license access</strong> — use tracks in online videos, podcasts, and social content
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0" />
        <mj-text font-size="14px" color="#374151" padding="10px 0">
          ✓ &nbsp;<strong>5 free downloads</strong> — WAV and MP3 formats included
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0" />
        <mj-text font-size="14px" color="#374151" padding="10px 0">
          ✓ &nbsp;<strong>Full search access</strong> — 50,000+ tracks across 30+ genres
        </mj-text>
        <mj-divider border-color="#f3f4f6" border-width="1px" padding="0" />
        <mj-text font-size="14px" color="#374151" padding="10px 0 0">
          ✓ &nbsp;<strong>Curated playlists</strong> — hand-picked collections by mood and use case
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- 3-Step Checklist -->
    <mj-section background-color="#ffffff" padding="24px 32px 16px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 24px" />
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 8px" letter-spacing="2px">
          YOUR QUICK-START CHECKLIST
        </mj-text>

        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          <strong>1.</strong> &nbsp;Set up your profile and project type
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          <strong>2.</strong> &nbsp;Search tracks by genre, mood, or BPM
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">
          <strong>3.</strong> &nbsp;Download your first track and start creating
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="24px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Start Browsing
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Upgrade Teaser -->
    <mj-section background-color="#f5f3ff" padding="24px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#5b21b6" padding="0 0 4px">
          Want more power?
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Upgrade to Pro for unlimited downloads, Extended licenses, and stem access — starting at $19/month. <a href="#" style="color:#4f46e5;">See plans</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Questions? Email us at <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
