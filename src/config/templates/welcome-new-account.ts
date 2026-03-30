import type { EmailTemplate } from '@/types/template.types'

export const welcomeNewAccount: EmailTemplate = {
  id: 'welcome-new-account',
  name: 'Welcome to SyncMusic',
  description: 'Sent immediately after account creation to introduce the platform and first steps.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Welcome to SyncMusic</mj-title>
    <mj-preview>Your soundtrack starts here — explore thousands of tracks ready to license.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#4f46e5" padding="20px 32px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="12px" color="#c7d2fe" align="center" padding="4px 0 0" letter-spacing="2px">
          MUSIC LICENSING PLATFORM
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#312e81" padding="48px 32px 40px">
      <mj-column>
        <mj-text font-size="32px" font-weight="bold" color="#ffffff" align="center" padding="0 0 12px" line-height="1.2">
          Your soundtrack starts here.
        </mj-text>
        <mj-text font-size="16px" color="#c7d2fe" align="center" padding="0 0 0" line-height="1.6">
          Welcome to SyncMusic — the home of high-quality, fully cleared music for creators, filmmakers, and brands.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- 3-Column Features -->
    <mj-section background-color="#ffffff" padding="40px 24px 32px">
      <mj-column padding="0 8px">
        <mj-text font-size="28px" align="center" padding="0 0 8px">
          🎵
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Browse Tracks
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.5">
          Search 50,000+ tracks by mood, genre, BPM, and instrumentation.
        </mj-text>
      </mj-column>
      <mj-column padding="0 8px">
        <mj-text font-size="28px" align="center" padding="0 0 8px">
          📄
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Choose a License
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.5">
          Standard, Extended, or Exclusive — pick the right rights for your project.
        </mj-text>
      </mj-column>
      <mj-column padding="0 8px">
        <mj-text font-size="28px" align="center" padding="0 0 8px">
          ⬇️
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Download &amp; Create
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.5">
          Get WAV, MP3, and stems. Your license document is included instantly.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="0 32px 48px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 32px" />
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Explore the Library
        </mj-button>
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
