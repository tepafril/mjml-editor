import type { EmailTemplate } from '@/types/template.types'

export const discoveryTrending: EmailTemplate = {
  id: 'discovery-trending',
  name: 'Trending Right Now in Electronic',
  description: 'Algorithm-driven email surfacing the most-licensed tracks in a relevant category.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Trending Right Now in Electronic — SyncMusic</mj-title>
    <mj-preview>The 5 most-licensed electronic tracks this month — don't miss what creators are loving.</mj-preview>
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
          TRENDING NOW
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hot Right Now Hero -->
    <mj-section background-color="#1e1b4b" padding="36px 24px 28px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#a5b4fc" align="center" padding="0 0 10px" letter-spacing="3px">
          🔥 HOT RIGHT NOW
        </mj-text>
        <mj-text font-size="32px" font-weight="bold" color="#ffffff" align="center" padding="0 0 12px" line-height="1.2">
          Trending in Electronic
        </mj-text>
        <mj-text font-size="14px" color="#c7d2fe" align="center" padding="0">
          Based on your recent Electronic searches — here are the tracks creators are licensing most this month.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 1 -->
    <mj-section background-color="#ffffff" padding="20px 24px 12px">
      <mj-column width="56px" padding="0 16px 0 0">
        <mj-text font-size="28px" font-weight="bold" color="#e5e7eb" align="center" padding="0">
          #1
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 2px">Voltage Drop</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 6px">Synthwave · 3:28 · by Neon Architects</mj-text>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" background-color="#eef2ff" padding="4px 10px" border-radius="20px">
          Licensed 847 times this month
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="0 24px 16px">
      <mj-column>
        <mj-text font-size="13px" color="#4b5563" padding="0 0 0 72px">
          <em>"Exactly what I needed for my product launch reel — the build-up is perfectly timed for a reveal moment."</em>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 2 -->
    <mj-section background-color="#f9fafb" padding="16px 24px 12px">
      <mj-column width="56px" padding="0 16px 0 0">
        <mj-text font-size="28px" font-weight="bold" color="#e5e7eb" align="center" padding="0">
          #2
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 2px">Digital Bloom</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 6px">Future Bass · 2:55 · by CYLN</mj-text>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" background-color="#eef2ff" padding="4px 10px" border-radius="20px">
          Licensed 692 times this month
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f9fafb" padding="0 24px 16px">
      <mj-column>
        <mj-text font-size="13px" color="#4b5563" padding="0 0 0 72px">
          <em>"Used this for my travel vlog and the comments about the music haven't stopped. It sets a perfect vibe."</em>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 3 -->
    <mj-section background-color="#ffffff" padding="16px 24px 12px">
      <mj-column width="56px" padding="0 16px 0 0">
        <mj-text font-size="28px" font-weight="bold" color="#e5e7eb" align="center" padding="0">
          #3
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 2px">Pulse State</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 6px">Tech House · 4:10 · by Meridian Lab</mj-text>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" background-color="#eef2ff" padding="4px 10px" border-radius="20px">
          Licensed 581 times this month
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="0 24px 16px">
      <mj-column>
        <mj-text font-size="13px" color="#4b5563" padding="0 0 0 72px">
          <em>"Drove 3× the engagement on my fitness reel. The driving rhythm keeps viewers watching all the way through."</em>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 4 -->
    <mj-section background-color="#f9fafb" padding="16px 24px 12px">
      <mj-column width="56px" padding="0 16px 0 0">
        <mj-text font-size="28px" font-weight="bold" color="#e5e7eb" align="center" padding="0">
          #4
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 2px">Glass Cities</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 6px">Ambient Electronica · 3:47 · by Frostline</mj-text>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" background-color="#eef2ff" padding="4px 10px" border-radius="20px">
          Licensed 443 times this month
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f9fafb" padding="0 24px 16px">
      <mj-column>
        <mj-text font-size="13px" color="#4b5563" padding="0 0 0 72px">
          <em>"Perfect background for my coding tutorials — keeps things interesting without pulling focus from the screen."</em>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 5 -->
    <mj-section background-color="#ffffff" padding="16px 24px 12px">
      <mj-column width="56px" padding="0 16px 0 0">
        <mj-text font-size="28px" font-weight="bold" color="#e5e7eb" align="center" padding="0">
          #5
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 2px">Zero Gravity</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 6px">Progressive House · 5:20 · by Airform</mj-text>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" background-color="#eef2ff" padding="4px 10px" border-radius="20px">
          Licensed 398 times this month
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="0 24px 20px">
      <mj-column>
        <mj-text font-size="13px" color="#4b5563" padding="0 0 0 72px">
          <em>"Used it in a 6-part documentary series — the evolving structure mirrors the story arc beautifully."</em>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#4f46e5" padding="32px 24px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px">
          Ready to license your next hit?
        </mj-text>
        <mj-text font-size="14px" color="#c7d2fe" align="center" padding="0 0 20px">
          All trending tracks available on Standard and Extended license. Instant download, lifetime use.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" inner-padding="14px 32px" border-radius="8px" href="#" align="center">
          License a Trending Track
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
