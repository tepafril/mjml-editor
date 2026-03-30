import type { EmailTemplate } from '@/types/template.types'

export const discoveryArtistSpotlight: EmailTemplate = {
  id: 'discovery-artist-spotlight',
  name: 'Artist Spotlight: Meet the Composer',
  description: 'Monthly email spotlighting a featured SyncMusic composer and their catalog.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Artist Spotlight: Lucas Ariel | SyncMusic</mj-title>
    <mj-preview>This month we're spotlighting composer Lucas Ariel — cinematic soundscapes built for storytellers.</mj-preview>
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
          ARTIST SPOTLIGHT · MARCH 2025
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Artist Photo Placeholder -->
    <mj-section background-color="#1e1b4b" padding="0">
      <mj-column>
        <mj-image src="https://placehold.co/600x320/1e1b4b/a5b4fc?text=Lucas+Ariel" alt="Lucas Ariel — Composer" width="600px" padding="0" />
      </mj-column>
    </mj-section>

    <!-- Artist Name & Intro -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 8px" letter-spacing="3px">
          FEATURED COMPOSER
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#111827" align="center" padding="0 0 20px" line-height="1.2">
          Lucas Ariel
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0" line-height="1.7">
          Buenos Aires-born, Berlin-based composer Lucas Ariel has spent the last decade crafting cinematic soundscapes for documentary film, branded content, and interactive media. With a classical piano foundation and a love for electronic texture, his work moves fluidly between intimate and epic — always in service of the story.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured Tracks -->
    <mj-section background-color="#f9fafb" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          From Lucas Ariel's catalog
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" padding="0 0 20px">
          134 tracks available for licensing
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="0 32px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Invisible Thread
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 6px">
          Cinematic · 68 BPM · Melancholic, Tender
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          → License this track
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="8px 32px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Heliosphere
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 6px">
          Ambient / Electronic · 82 BPM · Expansive, Futuristic
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          → License this track
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="8px 32px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Salt Flats
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 6px">
          Minimalist · 56 BPM · Sparse, Contemplative
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          → License this track
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="8px 32px 32px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Iron Meridian
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 6px">
          Orchestral · 95 BPM · Dramatic, Powerful
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" padding="0">
          → License this track
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Q&A Excerpt -->
    <mj-section background-color="#eef2ff" padding="32px 40px">
      <mj-column>
        <mj-text font-size="12px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 12px" letter-spacing="2px">
          IN HIS OWN WORDS
        </mj-text>
        <mj-text font-size="15px" color="#1e1b4b" align="center" padding="0 0 16px" line-height="1.8">
          <em>"What inspired this collection?"</em>
        </mj-text>
        <mj-text font-size="14px" color="#374151" align="center" padding="0" line-height="1.8">
          "I was watching a lot of nature documentary footage with no sound — just observing the rhythm of the world. I wanted to write music that felt like it already existed in those moments, not music that was added to them. Every track in this collection started as a field recording or a single sustained note."
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="12px 0 0">
          — Lucas Ariel, March 2025
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- License Note -->
    <mj-section background-color="#ffffff" padding="24px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.6">
          All tracks in Lucas Ariel's catalog are available under Standard, Extended, and Exclusive licenses. Stems available on selected tracks with Extended or Exclusive license.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="0 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Explore Lucas Ariel's Catalog
        </mj-button>
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
