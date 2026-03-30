import type { EmailTemplate } from '@/types/template.types'

export const discoverySummerSounds: EmailTemplate = {
  id: 'discovery-summer-sounds',
  name: 'Summer Sounds Are Here',
  description: 'Seasonal content discovery email featuring upbeat summer-themed tracks.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Summer Sounds Are Here — SyncMusic</mj-title>
    <mj-preview>Your summer content deserves the perfect soundtrack. 8 fresh tracks, ready to license.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#f59e0b" padding="20px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#fef3c7" align="center" padding="4px 0 0" letter-spacing="2px">
          SEASONAL COLLECTION
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Summer Hero -->
    <mj-section background-color="#fbbf24" padding="40px 24px 32px">
      <mj-column>
        <mj-text font-size="38px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px" line-height="1.1">
          ☀️ Summer Sounds<br />Are Here
        </mj-text>
        <mj-text font-size="16px" color="#fef9c3" align="center" padding="0">
          Fresh tracks for your beach recaps, travel vlogs, summer campaigns, and everything in between.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Section Label -->
    <mj-section background-color="#ffffff" padding="28px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          8 Featured Summer Tracks
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Four genres. Endless possibilities.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Row 1: Beach + Pop -->
    <mj-section background-color="#ffffff" padding="16px 24px 8px">
      <mj-column padding="0 8px 0 0">
        <mj-image src="https://placehold.co/260x140/fde68a/92400e?text=Beach+Vibes" alt="Beach Vibes" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#f59e0b" padding="0 0 2px" letter-spacing="1px">BEACH</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Golden Shore</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Acoustic · 2:55 · laid-back guitar + steel drums</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Ideal for travel vlogs, resort promos, and summer lifestyle content.</mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-image src="https://placehold.co/260x140/fca5a5/7f1d1d?text=Summer+Pop" alt="Summer Pop" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#ef4444" padding="0 0 2px" letter-spacing="1px">POP</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Sunshine Calling</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Upbeat Pop · 3:10 · catchy hooks + bright synths</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Great for product ads, social reels, and feel-good montages.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Row 2: Tropical House + Acoustic -->
    <mj-section background-color="#ffffff" padding="16px 24px 8px">
      <mj-column padding="0 8px 0 0">
        <mj-image src="https://placehold.co/260x140/a7f3d0/064e3b?text=Tropical+House" alt="Tropical House" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#10b981" padding="0 0 2px" letter-spacing="1px">TROPICAL HOUSE</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Island Frequency</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Tropical House · 3:42 · marimba + deep bass</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Perfect for nightlife promos, drink brands, and festival recaps.</mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-image src="https://placehold.co/260x140/bfdbfe/1e3a8a?text=Acoustic" alt="Acoustic" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#3b82f6" padding="0 0 2px" letter-spacing="1px">ACOUSTIC</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Warm & Wandering</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Folk Acoustic · 3:05 · fingerpicked guitar + light percussion</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Ideal for wedding films, travel diaries, and outdoor brand campaigns.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Row 3: More tracks -->
    <mj-section background-color="#ffffff" padding="16px 24px 8px">
      <mj-column padding="0 8px 0 0">
        <mj-image src="https://placehold.co/260x140/fed7aa/7c2d12?text=Pool+Party" alt="Pool Party" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#f97316" padding="0 0 2px" letter-spacing="1px">BEACH</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Saltwater Rush</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Nu-Disco · 3:30 · funky bass + summer horns</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Perfect for event recaps, poolside campaigns, and lifestyle reels.</mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-image src="https://placehold.co/260x140/e9d5ff/581c87?text=Chill+Pop" alt="Chill Pop" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#8b5cf6" padding="0 0 2px" letter-spacing="1px">POP</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Electric Dusk</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Indie Pop · 2:48 · dreamy vocals + lo-fi beat</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Ideal for sunset timelapses, slow-motion clips, and mood edits.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Row 4 -->
    <mj-section background-color="#ffffff" padding="16px 24px 20px">
      <mj-column padding="0 8px 0 0">
        <mj-image src="https://placehold.co/260x140/99f6e4/134e4a?text=Deep+House" alt="Deep House" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#0d9488" padding="0 0 2px" letter-spacing="1px">TROPICAL HOUSE</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Horizon Drift</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Deep House · 4:05 · lush pads + rolling groove</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Great for spa brands, resort video tours, and ambient content.</mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-image src="https://placehold.co/260x140/d1fae5/064e3b?text=Folk+Guitar" alt="Folk Guitar" width="260px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="11px" font-weight="bold" color="#059669" padding="0 0 2px" letter-spacing="1px">ACOUSTIC</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Back Roads</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Country Folk · 2:40 · strummed guitar + harmonica</mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">Ideal for road trip vlogs, outdoor adventure brands, and camping content.</mj-text>
      </mj-column>
    </mj-section>

    <!-- License Callout -->
    <mj-section background-color="#fffbeb" padding="24px" border="2px solid #fde68a">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#92400e" align="center" padding="0 0 8px" letter-spacing="2px">
          SUMMER CAMPAIGN READY
        </mj-text>
        <mj-text font-size="17px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Standard License — Everything You Need
        </mj-text>
        <mj-text font-size="13px" color="#4b5563" align="center" padding="0">
          All 8 tracks available on Standard License: unlimited YouTube, Instagram, TikTok, podcasts, and client videos. No expiry, no subscription required.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTAs -->
    <mj-section background-color="#f59e0b" padding="28px 24px">
      <mj-column>
        <mj-button background-color="#ffffff" color="#92400e" font-size="14px" font-weight="bold" inner-padding="14px 28px" border-radius="8px" href="#" align="center">
          Browse Summer Tracks
        </mj-button>
      </mj-column>
      <mj-column>
        <mj-button background-color="#fde68a" color="#92400e" font-size="14px" font-weight="bold" inner-padding="14px 28px" border-radius="8px" href="#" align="center">
          View Full Playlist
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
