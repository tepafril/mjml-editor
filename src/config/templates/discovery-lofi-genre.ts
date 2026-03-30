import type { EmailTemplate } from '@/types/template.types'

export const discoveryLofiGenre: EmailTemplate = {
  id: 'discovery-lofi-genre',
  name: 'New Genre Unlocked: Lo-Fi Hip Hop',
  description: 'Announcement for a newly added Lo-Fi Hip Hop genre category with debut tracks.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>New Genre: Lo-Fi Hip Hop — SyncMusic</mj-title>
    <mj-preview>Lo-Fi Hip Hop just landed on SyncMusic. Explore 5 debut tracks built for chill creative sessions.</mj-preview>
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
          NEW GENRE ALERT
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero Banner -->
    <mj-section background-color="#312e81" padding="40px 24px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#a5b4fc" align="center" padding="0 0 12px" letter-spacing="3px">
          🎧 NEW GENRE UNLOCKED
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#ffffff" align="center" padding="0 0 12px" line-height="1.2">
          Lo-Fi Hip Hop
        </mj-text>
        <mj-text font-size="15px" color="#c7d2fe" align="center" padding="0">
          Mellow beats, warm textures, and nostalgic charm — now available in your SyncMusic library.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What is Lo-Fi Hip Hop -->
    <mj-section background-color="#ffffff" padding="32px 24px 20px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 12px">
          What is Lo-Fi Hip Hop?
        </mj-text>
        <mj-text font-size="14px" color="#4b5563" line-height="1.7" padding="0">
          Lo-Fi Hip Hop is a genre defined by its intentionally "imperfect" sound — subtle vinyl crackle, slightly off-beat drum patterns, jazz-influenced chord progressions, and warm, saturated production. It evokes a sense of nostalgic calm that makes it uniquely effective as background music for long-form content.
        </mj-text>
        <mj-text font-size="14px" color="#4b5563" line-height="1.7" padding="12px 0 0">
          Unlike high-energy genres, Lo-Fi Hip Hop is engineered to sit comfortably under narration, dialogue, or ambient sound — never competing, always complementing.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Debut Tracks -->
    <mj-section background-color="#ffffff" padding="4px 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 16px" />
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          5 Debut Tracks
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Handpicked to launch the collection.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 1 -->
    <mj-section background-color="#f5f3ff" padding="14px 24px">
      <mj-column width="44px" padding="0 14px 0 0">
        <mj-text font-size="20px" align="center" padding="0">🎵</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Late Night Study</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">2:58 · 72 BPM · Jazzy Lo-Fi — soft piano, brush drums, vinyl warmth</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 2 -->
    <mj-section background-color="#ffffff" padding="14px 24px">
      <mj-column width="44px" padding="0 14px 0 0">
        <mj-text font-size="20px" align="center" padding="0">🎵</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Rain Window</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">3:22 · 68 BPM · Ambient Lo-Fi — rain texture, Rhodes chords, light sub-bass</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 3 -->
    <mj-section background-color="#f5f3ff" padding="14px 24px">
      <mj-column width="44px" padding="0 14px 0 0">
        <mj-text font-size="20px" align="center" padding="0">🎵</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Cassette Dreams</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">2:44 · 80 BPM · Boom Bap Lo-Fi — dusty samples, crispy snares, tape hiss</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 4 -->
    <mj-section background-color="#ffffff" padding="14px 24px">
      <mj-column width="44px" padding="0 14px 0 0">
        <mj-text font-size="20px" align="center" padding="0">🎵</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Golden Hour Groove</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">3:10 · 76 BPM · Chill Lo-Fi — guitar melody, muted keys, lazy groove</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 5 -->
    <mj-section background-color="#f5f3ff" padding="14px 24px">
      <mj-column width="44px" padding="0 14px 0 0">
        <mj-text font-size="20px" align="center" padding="0">🎵</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Coffee Shop Chronicles</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">4:00 · 78 BPM · Jazz Lo-Fi — upright bass, piano improv, snappy hi-hats</mj-text>
      </mj-column>
    </mj-section>

    <!-- Creator Use Cases -->
    <mj-section background-color="#ffffff" padding="28px 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          Perfect For
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 12px">
      <mj-column padding="0 6px 0 0">
        <mj-text align="center" padding="14px 8px" font-size="13px" color="#374151" background-color="#f5f3ff" border-radius="8px">
          📚 Study &amp; Tutorial Content
        </mj-text>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-text align="center" padding="14px 8px" font-size="13px" color="#374151" background-color="#f5f3ff" border-radius="8px">
          🎙️ Podcast Intros
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 6px">
        <mj-text align="center" padding="14px 8px" font-size="13px" color="#374151" background-color="#f5f3ff" border-radius="8px">
          📺 Background Streams
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column padding="0 6px 0 0">
        <mj-text align="center" padding="14px 8px" font-size="13px" color="#374151" background-color="#f5f3ff" border-radius="8px">
          🧘 Meditation Apps
        </mj-text>
      </mj-column>
      <mj-column padding="0 6px">
        <mj-text align="center" padding="14px 8px" font-size="13px" color="#374151" background-color="#f5f3ff" border-radius="8px">
          💻 Coding Videos
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 6px">
        <mj-text align="center" padding="14px 8px" font-size="13px" color="#374151" background-color="#f5f3ff" border-radius="8px">
          📖 Book Reviews
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#4f46e5" padding="32px 24px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px">
          Discover the full Lo-Fi Hip Hop library
        </mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0 0 20px">
          New tracks added weekly. All licensable for any platform, any project.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" inner-padding="14px 32px" border-radius="8px" href="#" align="center">
          Explore Lo-Fi Hip Hop
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
