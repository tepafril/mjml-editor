import type { EmailTemplate } from '@/types/template.types'

export const welcomeEmail: EmailTemplate = {
  id: 'welcome-email',
  name: 'Welcome Email',
  description: 'Warm onboarding email with 3 numbered steps and a Get Started CTA.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Welcome to SyncMusic!</mj-title>
    <mj-preview>You're in! Here's how to get the most out of SyncMusic.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">
    <mj-section background-color="#4f46e5" padding="24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="28px" font-weight="bold" color="#111827" align="center" padding="0 0 12px" line-height="1.3">
          Welcome aboard! 🎵
        </mj-text>
        <mj-text font-size="16px" color="#6b7280" align="center" padding="0 0 32px">
          We're thrilled to have you join the SyncMusic community. Let's get you set up so you can start creating amazing music today.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 32px 16px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 4px" letter-spacing="1px">
          STEP 1
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 6px">
          Complete your profile
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 0">
          Add your name, genre preferences, and a profile photo so other creators can discover you and connect with your work.
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="16px 0 0" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 32px 16px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 4px" letter-spacing="1px">
          STEP 2
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 6px">
          Upload your first track
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 0">
          Share your music with the world. Supported formats include MP3, WAV, and FLAC. Tracks are available to stream instantly after upload.
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="16px 0 0" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 32px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 4px" letter-spacing="1px">
          STEP 3
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 6px">
          Connect with creators
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 24px">
          Follow artists you admire, join collaboration rooms, and get feedback on your work from a global community of musicians.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Get Started
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0 0 6px">
          Need help? Reach out at <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
