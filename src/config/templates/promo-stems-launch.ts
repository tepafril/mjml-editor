import type { EmailTemplate } from '@/types/template.types'

export const promoStemsLaunch: EmailTemplate = {
  id: 'promo-stems-launch',
  name: 'New: Stems Now Available on 500+ Tracks',
  description: 'Announces the launch of downloadable stems packs for advanced audio customization.',
  category: 'Announcement',
  mjml: `<mjml>
  <mj-head>
    <mj-title>New: Stems Now Available on 500+ Tracks | SyncMusic</mj-title>
    <mj-preview>Download individual layers — drums, bass, keys, melody — and build your perfect mix.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="4px 0 0" letter-spacing="2px">
          PRODUCT ANNOUNCEMENT
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#1e1b4b" padding="48px 32px 40px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 12px" letter-spacing="4px">
          NEW FEATURE
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#ffffff" align="center" padding="0 0 16px" line-height="1.2">
          Build Your Sound,<br />Layer by Layer
        </mj-text>
        <mj-text font-size="16px" color="#a5b4fc" align="center" padding="0" line-height="1.7">
          Stems are now available on 500+ tracks. Download individual audio layers and customize the music to fit your project — precisely.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What Are Stems -->
    <mj-section background-color="#ffffff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          What are stems?
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 24px" line-height="1.6">
          Stems are individual audio components of a track, exported as separate files. Combine them freely, mute any layer, or replace elements with your own sounds.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- 5 Stems Boxes -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column border="1px solid #e0e7ff" border-radius="10px" padding="16px" background-color="#f5f3ff">
        <mj-text font-size="20px" align="center" padding="0 0 6px">🎵</mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 4px">
          Full Mix
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          The complete, mastered track
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="16px" background-color="#f9fafb">
        <mj-text font-size="20px" align="center" padding="0 0 6px">🥁</mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#374151" align="center" padding="0 0 4px">
          Drums
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Isolated percussion layer
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="16px" background-color="#f9fafb">
        <mj-text font-size="20px" align="center" padding="0 0 6px">🎸</mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#374151" align="center" padding="0 0 4px">
          Bass
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Low-end foundation
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 32px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="16px" background-color="#f9fafb">
        <mj-text font-size="20px" align="center" padding="0 0 6px">🎹</mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#374151" align="center" padding="0 0 4px">
          Keys
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Chords, pads &amp; synths
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="16px" background-color="#f9fafb">
        <mj-text font-size="20px" align="center" padding="0 0 6px">🎺</mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#374151" align="center" padding="0 0 4px">
          Melody
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Lead line &amp; hooks
        </mj-text>
      </mj-column>
      <mj-column padding="16px">
      </mj-column>
    </mj-section>

    <!-- Use Cases -->
    <mj-section background-color="#f9fafb" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 20px">
          Who stems are built for
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="0 32px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          🎬 &nbsp;<strong>Film &amp; TV scoring</strong> — pull the melody and write your own arrangement underneath
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          🎮 &nbsp;<strong>Game audio</strong> — trigger individual layers based on in-game events and states
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          🎧 &nbsp;<strong>Remix &amp; re-edit</strong> — licensed remixing for branded content and artist projects
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">
          📺 &nbsp;<strong>Ad production</strong> — strip the vocals or swap out the beat to match your edit perfectly
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured Stems Tracks -->
    <mj-section background-color="#ffffff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 20px">
          Featured stems tracks
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Fractured Light
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 8px">
          Cinematic · Emotional · 5 stems available
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          Extended &amp; Exclusive license
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Deep Current
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 8px">
          Electronic · Dark · 5 stems available
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          Extended &amp; Exclusive license
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 32px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Analog Warmth
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 8px">
          Jazz / Soul · Relaxed · 5 stems available
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          Extended &amp; Exclusive license
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- License Note -->
    <mj-section background-color="#fffbeb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#92400e" align="center" padding="0" font-weight="bold">
          Stems are available on Extended and Exclusive licenses only.
        </mj-text>
        <mj-text font-size="13px" color="#92400e" align="center" padding="6px 0 0" line-height="1.6">
          Upgrade your license to unlock stems on any eligible track. Standard licenses include the full mix only.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Browse Stems Tracks
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          500+ tracks now available with stems. New additions weekly.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#4f46e5;">Unsubscribe</a> · <a href="#" style="color:#4f46e5;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
