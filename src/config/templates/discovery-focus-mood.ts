import type { EmailTemplate } from '@/types/template.types'

export const discoveryFocusMood: EmailTemplate = {
  id: 'discovery-focus-mood',
  name: 'Focus Mode: Music for Deep Work',
  description: 'Mood-based discovery email curating focus and concentration music for productivity content.',
  category: 'Discovery',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Focus Mode: Music for Deep Work — SyncMusic</mj-title>
    <mj-preview>6 tracks scientifically aligned with deep focus — perfect for tutorials, study content, and productivity apps.</mj-preview>
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
          MOOD COLLECTION
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#ffffff" padding="40px 24px 28px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 12px" letter-spacing="3px">
          🧠 FOCUS MODE
        </mj-text>
        <mj-text font-size="30px" font-weight="bold" color="#111827" align="center" padding="0 0 12px" line-height="1.2">
          Work Smarter with the<br />Right Soundtrack
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          The right music reduces distraction, improves retention, and keeps your audience locked in. Here are 6 tracks purpose-built for focus-first content.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- BPM Note -->
    <mj-section background-color="#eef2ff" padding="16px 24px">
      <mj-column width="40px" padding="0 12px 0 0">
        <mj-text font-size="24px" padding="0">🎚️</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#3730a3" padding="0 0 2px">
          The Science Behind Focus Music
        </mj-text>
        <mj-text font-size="13px" color="#4b5563" padding="0">
          Research shows 60–80 BPM music synchronizes with resting heart rate, reducing cognitive load. All 6 tracks are within this optimal range.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track List Header -->
    <mj-section background-color="#ffffff" padding="28px 24px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          6 Focus-Ready Tracks
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          All between 60–80 BPM. All royalty-free.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 1 -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column width="52px" padding="0 14px 0 0">
        <mj-image src="https://placehold.co/52x52/4f46e5/ffffff?text=01" alt="Track 01" width="52px" border-radius="8px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Deep Space Work</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Ambient · 4:30 · 64 BPM · Space-inspired pads, sparse arpeggios</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Best for: long tutorial videos, extended study sessions, coding livestreams.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 2 -->
    <mj-section background-color="#f9fafb" padding="12px 24px">
      <mj-column width="52px" padding="0 14px 0 0">
        <mj-image src="https://placehold.co/52x52/6366f1/ffffff?text=02" alt="Track 02" width="52px" border-radius="8px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Still Water</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Minimal Piano · 3:48 · 68 BPM · Solo piano, room reverb, silence space</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Best for: meditation app content, mindfulness videos, journaling prompts.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 3 -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column width="52px" padding="0 14px 0 0">
        <mj-image src="https://placehold.co/52x52/818cf8/ffffff?text=03" alt="Track 03" width="52px" border-radius="8px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Flow State</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Lo-Fi Ambient · 3:22 · 72 BPM · Warm textures, subtle groove, no melody</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Best for: background study streams, podcast outros, app onboarding.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 4 -->
    <mj-section background-color="#f9fafb" padding="12px 24px">
      <mj-column width="52px" padding="0 14px 0 0">
        <mj-image src="https://placehold.co/52x52/4f46e5/ffffff?text=04" alt="Track 04" width="52px" border-radius="8px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Clarity</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Instrumental · 5:10 · 60 BPM · Acoustic guitar, light strings, no drums</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Best for: documentary narration, e-learning modules, explainer videos.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 5 -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column width="52px" padding="0 14px 0 0">
        <mj-image src="https://placehold.co/52x52/6366f1/ffffff?text=05" alt="Track 05" width="52px" border-radius="8px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Signal Drift</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Electronica · 4:00 · 78 BPM · Subtle synths, slow filter sweeps, minimal drums</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Best for: tech demos, SaaS product videos, data-driven content.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 6 -->
    <mj-section background-color="#f9fafb" padding="12px 24px">
      <mj-column width="52px" padding="0 14px 0 0">
        <mj-image src="https://placehold.co/52x52/818cf8/ffffff?text=06" alt="Track 06" width="52px" border-radius="8px" padding="0" />
      </mj-column>
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 2px">Morning Protocol</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 2px">Jazz Ambient · 3:55 · 75 BPM · Muted trumpet, walking bass, brushed snare</mj-text>
        <mj-text font-size="12px" color="#4b5563" padding="0">Best for: productivity content, morning routine videos, lifestyle channels.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Use Case Callouts -->
    <mj-section background-color="#ffffff" padding="28px 24px 16px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 16px">
          Where to use Focus Music
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column padding="0 8px 0 0">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#f9fafb" border-radius="8px">
          <strong>📹 Tutorial Videos</strong><br />Keep learners focused without distracting from your instruction. Low melodic content = less competition with speech.
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#f9fafb" border-radius="8px">
          <strong>📚 Study Content</strong><br />YouTube study streams and e-learning platforms routinely report 40% longer watch times when paired with quality focus music.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column padding="0 8px 0 0">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#f9fafb" border-radius="8px">
          <strong>🧘 Meditation Apps</strong><br />Gentle, non-intrusive soundscapes that support breathwork, mindfulness exercises, and sleep content without jarring transitions.
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-text padding="16px" font-size="13px" color="#374151" background-color="#f9fafb" border-radius="8px">
          <strong>💼 Corporate Videos</strong><br />Presentations, annual reports, and explainer videos benefit from understated music that reinforces professionalism.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#4f46e5" padding="32px 24px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px">
          Find your focus soundtrack
        </mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0 0 20px">
          Filter by BPM, mood, and instrumentation. Instant download, lifetime license.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" inner-padding="14px 32px" border-radius="8px" href="#" align="center">
          Browse Focus Music
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
