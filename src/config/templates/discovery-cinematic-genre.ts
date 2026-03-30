import type { EmailTemplate } from '@/types/template.types'

export const discoveryCinematicGenre: EmailTemplate = {
  id: 'discovery-cinematic-genre',
  name: 'Deep Dive: Cinematic & Orchestral',
  description: 'Genre-focused email exploring the cinematic collection with use cases and track picks.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Deep Dive: Cinematic &amp; Orchestral — SyncMusic</mj-title>
    <mj-preview>Explore our full cinematic collection — from sweeping epics to intimate scores.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#0f0f1a" padding="20px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#818cf8" align="center" padding="4px 0 0" letter-spacing="2px">
          GENRE DEEP DIVE
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Cinematic Hero -->
    <mj-section background-color="#0f0f1a" padding="0">
      <mj-column>
        <mj-image src="https://placehold.co/600x280/0f0f1a/c7d2fe?text=Cinematic+%26+Orchestral" alt="Cinematic & Orchestral" width="600px" padding="0" />
      </mj-column>
    </mj-section>

    <!-- Genre Intro -->
    <mj-section background-color="#ffffff" padding="32px 24px 16px">
      <mj-column>
        <mj-text font-size="26px" font-weight="bold" color="#111827" padding="0 0 12px">
          Cinematic &amp; Orchestral
        </mj-text>
        <mj-text font-size="15px" color="#4b5563" line-height="1.7" padding="0">
          From the soaring strings of a blockbuster opening to the quiet tension of a pivotal scene, our Cinematic &amp; Orchestral collection is purpose-built for storytellers. Over 2,400 tracks crafted by award-winning composers, ready to license for film, broadcast, advertising, and beyond.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Sub-genre Tags -->
    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column>
        <mj-text font-size="12px" font-weight="bold" color="#6b7280" padding="0 0 12px" letter-spacing="1px">
          BROWSE BY MOOD
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column padding="0 6px 0 0">
        <mj-text align="center" padding="10px 0" font-size="13px" font-weight="bold" color="#4f46e5" background-color="#eef2ff" border-radius="8px">
          ⚡ Epic
        </mj-text>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-text align="center" padding="10px 0" font-size="13px" font-weight="bold" color="#7c3aed" background-color="#f5f3ff" border-radius="8px">
          🎻 Intimate
        </mj-text>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-text align="center" padding="10px 0" font-size="13px" font-weight="bold" color="#b45309" background-color="#fffbeb" border-radius="8px">
          🔥 Tension
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 6px">
        <mj-text align="center" padding="10px 0" font-size="13px" font-weight="bold" color="#065f46" background-color="#ecfdf5" border-radius="8px">
          ✨ Uplifting
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hand-Picked Tracks Header -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          6 Hand-Picked Tracks
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Curated by our editorial team for maximum creative impact.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 1 -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column width="48px" padding="0 12px 0 0">
        <mj-image src="https://placehold.co/48x48/4f46e5/ffffff?text=01" alt="Track 01" width="48px" border-radius="6px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Horizon Rising</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Epic · 3:42 · Full Orchestra + Choir</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Perfect for: film trailers, brand launch videos, sports highlight reels.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 2 -->
    <mj-section background-color="#f9fafb" padding="12px 24px">
      <mj-column width="48px" padding="0 12px 0 0">
        <mj-image src="https://placehold.co/48x48/7c3aed/ffffff?text=02" alt="Track 02" width="48px" border-radius="6px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Quiet Storm</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Intimate · 2:58 · Solo Piano + Strings</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Perfect for: documentary narration, wedding films, human interest stories.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 3 -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column width="48px" padding="0 12px 0 0">
        <mj-image src="https://placehold.co/48x48/b45309/ffffff?text=03" alt="Track 03" width="48px" border-radius="6px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Dark Pursuit</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Tension · 4:15 · Brass + Percussion</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Perfect for: thriller scenes, true crime podcasts, chase sequences.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 4 -->
    <mj-section background-color="#f9fafb" padding="12px 24px">
      <mj-column width="48px" padding="0 12px 0 0">
        <mj-image src="https://placehold.co/48x48/065f46/ffffff?text=04" alt="Track 04" width="48px" border-radius="6px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">First Light</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Uplifting · 3:20 · Strings + Woodwinds</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Perfect for: inspirational content, charity campaigns, graduation videos.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 5 -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column width="48px" padding="0 12px 0 0">
        <mj-image src="https://placehold.co/48x48/4f46e5/ffffff?text=05" alt="Track 05" width="48px" border-radius="6px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Shattered Glass</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Tension · 2:44 · Electronics + Orchestra</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Perfect for: tech thrillers, news intros, fast-cut montages.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 6 -->
    <mj-section background-color="#f9fafb" padding="12px 24px">
      <mj-column width="48px" padding="0 12px 0 0">
        <mj-image src="https://placehold.co/48x48/7c3aed/ffffff?text=06" alt="Track 06" width="48px" border-radius="6px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Infinite Sky</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Epic · 5:02 · Full Orchestra</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Perfect for: feature film end credits, nature documentaries, brand anthems.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Extended License Callout -->
    <mj-section background-color="#0f0f1a" padding="28px 24px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#818cf8" align="center" padding="0 0 8px" letter-spacing="2px">
          RECOMMENDED FOR FILM &amp; BROADCAST
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px">
          Extended License — One Track, Unlimited Screens
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0 0 20px">
          Our Extended License covers theatrical release, broadcast television, streaming platforms, and advertising campaigns globally. No royalty stacking, no per-view fees.
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="14px" font-weight="bold" inner-padding="14px 32px" border-radius="8px" href="#" align="center">
          Browse Cinematic Tracks
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
