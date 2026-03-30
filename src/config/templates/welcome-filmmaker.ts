import type { EmailTemplate } from '@/types/template.types'

export const welcomeFilmmaker: EmailTemplate = {
  id: 'welcome-filmmaker',
  name: 'Welcome, Filmmaker — Music Built for the Screen',
  description: 'Personalized welcome for filmmakers surfacing sync licensing and cinematic content.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Welcome, Filmmaker — SyncMusic</mj-title>
    <mj-preview>Music that moves your story. Cinematic tracks cleared for film, festival, and broadcast.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Dark Cinematic Header -->
    <mj-section background-color="#0f0f1a" padding="40px 32px 36px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#a5b4fc" align="center" padding="0 0 16px" letter-spacing="3px">
          SYNCMUSIC FOR FILMMAKERS
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#ffffff" align="center" padding="0 0 12px" line-height="1.15">
          Music that moves<br />your story.
        </mj-text>
        <mj-text font-size="15px" color="#94a3b8" align="center" padding="0" line-height="1.7">
          50,000+ tracks composed for picture — from intimate character moments to sweeping orchestral finales.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- License Highlight -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 8px" letter-spacing="2px">
          BUILT FOR PROFESSIONAL PRODUCTIONS
        </mj-text>
        <mj-text font-size="20px" font-weight="bold" color="#111827" padding="0 0 12px">
          Extended &amp; Exclusive licenses — cleared for broadcast
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 8px" line-height="1.7">
          <strong>Extended License ($79+)</strong> — Covers broadcast TV, streaming platforms (Netflix, Prime, Hulu), theatrical release, and audiences of 1M+.
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 0" line-height="1.7">
          <strong>Exclusive License ($299+)</strong> — Remove the track from the marketplace. Your film, your sound — protected from other productions.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Curated Playlist -->
    <mj-section background-color="#f8fafc" padding="8px 32px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 24px" />
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 8px" letter-spacing="2px">
          CURATED PLAYLIST: CINEMATIC ESSENTIALS
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          1. &nbsp;<strong>The Weight of Silence</strong> — Orchestral, 72 BPM
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          2. &nbsp;<strong>Falling Through Glass</strong> — Ambient Piano, 60 BPM
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          3. &nbsp;<strong>Ember and Ash</strong> — Hybrid Cinematic, 88 BPM
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          4. &nbsp;<strong>Northern Passage</strong> — Strings &amp; Brass, 96 BPM
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">
          5. &nbsp;<strong>Fracture Point</strong> — Tension &amp; Suspense, 110 BPM
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="24px 0 0" />
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Browse Film &amp; Cinematic
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Festival Rights Note -->
    <mj-section background-color="#f0fdf4" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#15803d" padding="0 0 4px">
          Festival &amp; Competition Rights Included
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0" line-height="1.6">
          All SyncMusic licenses include festival screening rights at no extra cost. Submit your film to Sundance, SXSW, Tribeca, and beyond — without renegotiating your music rights.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Questions about sync licensing? Email <a href="mailto:sync@syncmusic.app" style="color:#4f46e5;">sync@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
