import type { EmailTemplate } from '@/types/template.types'

export const onboardingStep2: EmailTemplate = {
  id: 'onboarding-step-2',
  name: 'Step 2: Understand Your License',
  description: 'Second onboarding email explaining Standard vs Extended vs Exclusive licenses.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Step 2: Understand Your License — SyncMusic</mj-title>
    <mj-preview>Standard, Extended, or Exclusive — learn which license is right for your project.</mj-preview>
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

    <!-- Progress Pill -->
    <mj-section background-color="#e0e7ff" padding="12px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4338ca" align="center" padding="0" letter-spacing="1px">
          GETTING STARTED · STEP 2 OF 3
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Intro -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="28px" font-weight="bold" color="#111827" padding="0 0 12px" line-height="1.2">
          Which license do you need?
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" padding="0 0 0" line-height="1.7">
          Licensing can feel complicated, but at SyncMusic it's straightforward. There are three tiers — and choosing the right one protects you and ensures the artist is fairly compensated.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Standard License Box -->
    <mj-section background-color="#eff6ff" padding="20px 32px 8px" border-left="4px solid #3b82f6">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#1d4ed8" padding="0 0 4px" letter-spacing="2px">
          STANDARD LICENSE — FROM $29
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#1e3a8a" padding="0 0 6px">
          Online &amp; Social Content
        </mj-text>
        <mj-text font-size="13px" color="#1e40af" padding="0 0 4px" line-height="1.5">
          Best for: YouTube videos, Instagram Reels, TikTok, podcasts, personal projects.
        </mj-text>
        <mj-text font-size="13px" color="#1e40af" padding="0 0 0" line-height="1.5">
          Covers up to 500,000 views per platform. Single-project use.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Extended License Box -->
    <mj-section background-color="#f0fdf4" padding="20px 32px 8px" border-left="4px solid #22c55e">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#15803d" padding="0 0 4px" letter-spacing="2px">
          EXTENDED LICENSE — FROM $79
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#14532d" padding="0 0 6px">
          Broadcast, Streaming &amp; Large Audiences
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 4px" line-height="1.5">
          Best for: TV commercials, streaming platforms, films, ads with over 500K views.
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0 0 0" line-height="1.5">
          Unlimited views across all platforms. Includes broadcast TV and OTT.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Exclusive License Box -->
    <mj-section background-color="#fdf4ff" padding="20px 32px 8px" border-left="4px solid #a855f7">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#7e22ce" padding="0 0 4px" letter-spacing="2px">
          EXCLUSIVE LICENSE — FROM $299
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#581c87" padding="0 0 6px">
          Full Exclusivity &amp; Ownership Rights
        </mj-text>
        <mj-text font-size="13px" color="#6b21a8" padding="0 0 4px" line-height="1.5">
          Best for: major brand campaigns, feature films, premium content requiring sole use.
        </mj-text>
        <mj-text font-size="13px" color="#6b21a8" padding="0 0 0" line-height="1.5">
          The track is removed from the marketplace. Yours alone, permanently.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- FAQ Note + CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 48px">
      <mj-column>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 24px" line-height="1.7">
          Still unsure which license fits your use case? Our licensing FAQ covers edge cases like music in apps, games, client work, and more.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          View Licensing FAQ
        </mj-button>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="16px 0 0">
          Next up: <strong>Step 3 — Download and Create</strong>
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
