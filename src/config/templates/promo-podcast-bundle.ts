import type { EmailTemplate } from '@/types/template.types'

export const promoPodcastBundle: EmailTemplate = {
  id: 'promo-podcast-bundle',
  name: 'Podcast Creators: Your Intro Music Bundle Awaits',
  description: 'Targeted promo for podcast creators offering a curated intro/outro bundle at a special price.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Podcast Intro Bundle — Was $89, Now $49 | SyncMusic</mj-title>
    <mj-preview>15 handpicked tracks: 5 intros, 5 outros, 5 transitions — licensed for every podcast platform.</mj-preview>
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
          FOR PODCAST CREATORS
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#ffffff" padding="48px 32px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 12px" letter-spacing="3px">
          PODCAST BUNDLE
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#111827" align="center" padding="0 0 16px" line-height="1.2">
          First impressions last
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0" line-height="1.7">
          We handpicked 15 tracks designed specifically for podcast production — everything you need to open, close, and transition your episodes with confidence.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Bundle Contents -->
    <mj-section background-color="#f5f3ff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 20px">
          What's in the bundle
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f5f3ff" padding="0 24px 8px">
      <mj-column border="1px solid #e0e7ff" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 6px" letter-spacing="1px">
          5 INTRO TRACKS
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          High-energy, mid-tempo, and laid-back variants — hook your listeners from the first second.
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e0e7ff" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 6px" letter-spacing="1px">
          5 OUTRO TRACKS
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Fade-out-ready closers that feel complete — perfect for ending on a strong note.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f5f3ff" padding="8px 24px 32px">
      <mj-column border="1px solid #e0e7ff" border-radius="10px" padding="20px" background-color="#ffffff">
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 6px" letter-spacing="1px">
          5 TRANSITION STINGS
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Short 5–10 second stings to separate segments and keep your episodes moving.
        </mj-text>
      </mj-column>
      <mj-column padding="20px">
        <mj-text font-size="32px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 4px" line-height="1">
          15
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          tracks total
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Use Cases -->
    <mj-section background-color="#ffffff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 16px">
          Works for every podcast format
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🎙 &nbsp;<strong>Interview</strong> — warm, professional tone that keeps focus on the conversation
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          📰 &nbsp;<strong>News &amp; Current Events</strong> — authoritative intros that set the right expectation
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          😂 &nbsp;<strong>Comedy</strong> — upbeat, punchy stings that land the joke
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">
          📖 &nbsp;<strong>Storytelling &amp; True Crime</strong> — cinematic, tension-building transitions
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- License Note -->
    <mj-section background-color="#f0fdf4" padding="20px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#166534" align="center" padding="0" line-height="1.6">
          <strong>Standard License included</strong> — covers Spotify, Apple Podcasts, Google Podcasts, YouTube, and all major podcast directories.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Pricing -->
    <mj-section background-color="#ffffff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="14px" color="#9ca3af" align="center" padding="0 0 4px">
          <span style="text-decoration:line-through;">Was $89</span>
        </mj-text>
        <mj-text font-size="48px" font-weight="bold" color="#111827" align="center" padding="0 0 4px" line-height="1">
          $49
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 0">
          One-time payment. Download all 15 tracks instantly.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="24px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Get the Podcast Bundle
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Limited time offer. All 15 tracks available immediately after purchase.
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
