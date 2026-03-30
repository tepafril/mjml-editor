import type { EmailTemplate } from '@/types/template.types'

export const discoveryNewTracksWeekly: EmailTemplate = {
  id: 'discovery-new-tracks-weekly',
  name: 'Fresh Tracks This Week',
  description: 'Weekly digest of newly added tracks organized by genre for active creators.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Fresh Tracks This Week | SyncMusic</mj-title>
    <mj-preview>47 new tracks added — Synthwave, Cinematic, Acoustic, Ambient and more. See what's new.</mj-preview>
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
          WEEKLY NEW TRACKS DIGEST
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero Count -->
    <mj-section background-color="#1e1b4b" padding="40px 32px 32px">
      <mj-column>
        <mj-text font-size="56px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px" line-height="1">
          47
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#a5b4fc" align="center" padding="0 0 8px" letter-spacing="2px">
          NEW TRACKS ADDED THIS WEEK
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0">
          Week of March 24 – 30, 2025
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured Tracks Grid Row 1 -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 20px">
          Featured new tracks
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="18px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Neon Drive
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" font-weight="bold" padding="0 0 6px">
          Synthwave
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">
          128 BPM
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0">
          Energetic · Retro · Driving
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="18px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Ember Rain
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" font-weight="bold" padding="0 0 6px">
          Cinematic
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">
          72 BPM
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0">
          Emotional · Reflective · Epic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Row 2 -->
    <mj-section background-color="#ffffff" padding="8px 24px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="18px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Pulse Code
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" font-weight="bold" padding="0 0 6px">
          Electronic
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">
          140 BPM
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0">
          High-Energy · Futuristic · Club
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="18px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Open Road
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" font-weight="bold" padding="0 0 6px">
          Acoustic
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">
          92 BPM
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0">
          Warm · Uplifting · Travel
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Row 3 -->
    <mj-section background-color="#ffffff" padding="8px 24px 32px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="18px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Deep Waters
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" font-weight="bold" padding="0 0 6px">
          Ambient
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">
          60 BPM
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0">
          Meditative · Spacious · Calm
        </mj-text>
      </mj-column>
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="18px">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          Rise Up
        </mj-text>
        <mj-text font-size="12px" color="#4f46e5" font-weight="bold" padding="0 0 6px">
          Motivational
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">
          118 BPM
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" padding="0">
          Inspiring · Corporate · Bold
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Trending Section -->
    <mj-section background-color="#f9fafb" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          Trending this week
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" padding="0 0 20px">
          Most-licensed tracks across the catalog
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="0 32px 8px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px" line-height="1.5">
          <span style="font-weight:bold;color:#4f46e5;">#1</span> &nbsp;<strong>Golden Ratio</strong> — Cinematic · Licensed 312 times this week
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px" line-height="1.5">
          <span style="font-weight:bold;color:#4f46e5;">#2</span> &nbsp;<strong>Low Frequency</strong> — Electronic · Licensed 289 times this week
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 24px" line-height="1.5">
          <span style="font-weight:bold;color:#4f46e5;">#3</span> &nbsp;<strong>Morning Signal</strong> — Acoustic Pop · Licensed 241 times this week
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="32px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          See All New Tracks
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          New tracks added every Monday. License any track instantly.
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
