import type { EmailTemplate } from '@/types/template.types'

export const onboardingStep1: EmailTemplate = {
  id: 'onboarding-step-1',
  name: 'Step 1: Find the Perfect Track',
  description: 'First in a 3-part onboarding series teaching new users the search and filter system.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Step 1: Find the Perfect Track — SyncMusic</mj-title>
    <mj-preview>Learn how to search by mood, genre, and BPM to find exactly what your project needs.</mj-preview>
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
          GETTING STARTED · STEP 1 OF 3
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Heading -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="28px" font-weight="bold" color="#111827" padding="0 0 12px" line-height="1.2">
          Find the perfect track for your project
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" padding="0 0 16px" line-height="1.7">
          SyncMusic's search engine is built for creators. You don't need to know the artist's name — just describe the feeling you're after, and we'll surface the right music.
        </mj-text>
        <mj-text font-size="15px" color="#374151" padding="0 0 8px" line-height="1.7">
          Use these filters to narrow your results:
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          <strong>Mood</strong> — Uplifting, Tense, Melancholic, Euphoric, Mysterious
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          <strong>Genre</strong> — Electronic, Cinematic, Hip-Hop, Jazz, Ambient, Rock
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">
          <strong>BPM</strong> — Match the tempo to your edit using the BPM range slider
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured Track Spotlight -->
    <mj-section background-color="#1e1b4b" padding="28px 32px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#a5b4fc" padding="0 0 10px" letter-spacing="2px">
          FEATURED TRACK
        </mj-text>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" padding="0 0 4px">
          Neon Drive
        </mj-text>
        <mj-text font-size="13px" color="#a5b4fc" padding="0 0 16px">
          Synthwave · 128 BPM · 3:42
        </mj-text>
        <mj-text font-size="13px" color="#c7d2fe" padding="0 0 16px" line-height="1.6">
          Pulsing arpeggios and driving drums built for high-energy montages, product reveals, and action sequences. Available under Standard and Extended licenses.
        </mj-text>
        <mj-text font-size="13px" color="#e0e7ff" padding="0">
          ★★★★★ &nbsp; <span style="color:#a5b4fc;">4.9 / 5 from 214 licensees</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="40px 32px 48px">
      <mj-column>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0 0 24px" line-height="1.6">
          Ready to explore? Head to the library and try a search using mood or genre filters now.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Try a Search Now
        </mj-button>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="16px 0 0">
          Next up: <strong>Step 2 — Understanding Your License</strong>
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
