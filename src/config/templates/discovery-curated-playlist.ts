import type { EmailTemplate } from '@/types/template.types'

export const discoveryCuratedPlaylist: EmailTemplate = {
  id: 'discovery-curated-playlist',
  name: "This Month's Playlist: Summer Campaign Sounds",
  description: 'Monthly featured playlist email built around a theme with track previews and license links.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Summer Campaign Sounds 2025 — This Month's Playlist | SyncMusic</mj-title>
    <mj-preview>8 handpicked tracks for travel vlogs, fashion content, and summer campaigns. Listen and license.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Colorful Summer Header -->
    <mj-section background-color="#f59e0b" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#fef3c7" align="center" padding="4px 0 0" letter-spacing="2px">
          MONTHLY CURATED PLAYLIST
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Gradient Banner -->
    <mj-section background-color="#f59e0b" padding="32px 32px 0">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fef3c7" align="center" padding="0 0 12px" letter-spacing="3px">
          MARCH 2025
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#ffffff" align="center" padding="0 0 16px" line-height="1.2">
          Summer Campaign<br />Sounds 2025
        </mj-text>
        <mj-text font-size="15px" color="#fef3c7" align="center" padding="0 0 0" line-height="1.7">
          Whether you're shooting travel content, launching a summer fashion drop, or scoring a tropical ad — these 8 tracks were built for the golden season.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Playlist Cover Placeholder -->
    <mj-section background-color="#f59e0b" padding="24px 32px 0">
      <mj-column>
        <mj-image src="https://placehold.co/600x280/fbbf24/ffffff?text=Summer+Campaign+Sounds+2025" alt="Summer Campaign Sounds 2025 Playlist Cover" width="600px" border-radius="12px" padding="0" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#f59e0b" padding="0 0 40px">
      <mj-column>
      </mj-column>
    </mj-section>

    <!-- Track List -->
    <mj-section background-color="#ffffff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          8 tracks in this playlist
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" padding="0 0 24px">
          Click any track to preview and license
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">01 &nbsp;Drift Season</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Tropical House · 112 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">02 &nbsp;Terracotta Sky</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Indie Pop · 98 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">03 &nbsp;White Noise Beach</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Ambient · 70 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">04 &nbsp;Palm Drive</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Funk / Soul · 105 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">05 &nbsp;Golden Shoreline</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Acoustic · 90 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">06 &nbsp;Linen &amp; Light</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Chillout · 82 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 4px">
      <mj-column border-bottom="1px solid #f3f4f6" padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">07 &nbsp;Sundowner</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Latin Pop · 116 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="4px 32px 32px">
      <mj-column padding="0 0 12px 0">
        <mj-text font-size="14px" color="#374151" padding="0">
          <span style="font-weight:bold;color:#111827;">08 &nbsp;Horizon Glow</span>
          &nbsp;&nbsp;<span style="color:#9ca3af;font-size:12px;">Electronic Pop · 124 BPM</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Use Note -->
    <mj-section background-color="#fff7ed" padding="20px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#92400e" align="center" padding="0" line-height="1.6">
          <strong>Perfect for:</strong> travel vlogs, fashion content, summer brand campaigns, and lifestyle reels.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 40px">
      <mj-column>
        <mj-button background-color="#f59e0b" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Listen and License
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          All tracks available under Standard and Extended licenses. Stems available on selected tracks.
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
