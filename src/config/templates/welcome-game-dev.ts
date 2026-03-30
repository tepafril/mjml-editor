import type { EmailTemplate } from '@/types/template.types'

export const welcomeGameDev: EmailTemplate = {
  id: 'welcome-game-dev',
  name: 'Welcome, Game Developer — Sound Your World',
  description: 'Personalized welcome for game developers highlighting loopable tracks and stems.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Welcome, Game Developer — SyncMusic</mj-title>
    <mj-preview>Audio that levels up your game. Loopable tracks, stems, and game distribution cleared.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Dark Bold Header -->
    <mj-section background-color="#0d1117" padding="40px 32px 36px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#34d399" align="center" padding="0 0 16px" letter-spacing="3px">
          SYNCMUSIC FOR GAME DEVELOPERS
        </mj-text>
        <mj-text font-size="34px" font-weight="bold" color="#ffffff" align="center" padding="0 0 12px" line-height="1.15">
          Audio that levels up<br />your game.
        </mj-text>
        <mj-text font-size="15px" color="#94a3b8" align="center" padding="0" line-height="1.7">
          Loopable tracks, layered stems, and seamless transitions — engineered for interactive media.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Feature Callouts -->
    <mj-section background-color="#ffffff" padding="40px 24px 16px">
      <mj-column background-color="#f9fafb" border-radius="8px" padding="20px" border="1px solid #e5e7eb">
        <mj-text font-size="22px" align="center" padding="0 0 8px">
          🔁
        </mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Loopable Tracks
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.5">
          Seamlessly loop in any engine. All tracks tagged with loop-point metadata.
        </mj-text>
      </mj-column>
      <mj-column background-color="#f9fafb" border-radius="8px" padding="20px" border="1px solid #e5e7eb">
        <mj-text font-size="22px" align="center" padding="0 0 8px">
          🎛️
        </mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Full Stem Packs
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.5">
          Layer and fade individual stems to react dynamically to gameplay.
        </mj-text>
      </mj-column>
      <mj-column background-color="#f9fafb" border-radius="8px" padding="20px" border="1px solid #e5e7eb">
        <mj-text font-size="22px" align="center" padding="0 0 8px">
          🕹️
        </mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Game Distribution
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.5">
          Steam, Epic, itch.io, consoles — all covered under our Extended license.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Genre Chips -->
    <mj-section background-color="#ffffff" padding="24px 32px 8px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 12px" letter-spacing="2px">
          POPULAR GENRES FOR GAMES
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0" line-height="2">
          <span style="background:#e0e7ff; color:#3730a3; padding:4px 12px; border-radius:99px; margin-right:8px;">Ambient</span>
          <span style="background:#fef3c7; color:#92400e; padding:4px 12px; border-radius:99px; margin-right:8px;">Action</span>
          <span style="background:#f0fdf4; color:#166534; padding:4px 12px; border-radius:99px; margin-right:8px;">Chiptune</span>
          <span style="background:#fdf4ff; color:#6b21a8; padding:4px 12px; border-radius:99px;">Orchestral</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- License Note -->
    <mj-section background-color="#ffffff" padding="16px 32px 32px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="8px 0 20px" />
        <mj-text font-size="14px" color="#6b7280" padding="0" line-height="1.7">
          <strong>Extended License</strong> covers game distribution on all platforms with no royalty obligations. Ship once, play forever — no per-copy fees.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#0d1117" padding="40px 32px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Browse Game Music
        </mj-button>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="16px 0 0">
          Filter by: Loopable · Stems Available · BPM · Mood
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Questions? Email us at <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
