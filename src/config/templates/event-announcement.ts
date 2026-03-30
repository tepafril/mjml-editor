import type { EmailTemplate } from '@/types/template.types'

export const eventAnnouncement: EmailTemplate = {
  id: 'event-announcement',
  name: 'Event Announcement',
  description: 'Event announcement with date/time details, speaker columns, RSVP button, and agenda.',
  category: 'Announcement',
  mjml: `<mjml>
  <mj-head>
    <mj-title>SyncMusic Summit 2025 — Register Now</mj-title>
    <mj-preview>Join us for the biggest music tech event of the year. Limited seats available!</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">
    <mj-section background-color="#111827" padding="40px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 8px" letter-spacing="3px">
          SYNCMUSIC PRESENTS
        </mj-text>
        <mj-text font-size="36px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px" line-height="1.2">
          Music Tech Summit 2025
        </mj-text>
        <mj-text font-size="16px" color="#9ca3af" align="center" padding="0 0 24px">
          The future of music creation, distribution, and community
        </mj-text>
        <mj-button background-color="#fbbf24" color="#111827" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          RSVP Now — Free
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px 32px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 16px" align="center">
          Event Details
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 32px 24px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 4px">
          📅 <strong style="color:#111827;">Date</strong>
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 12px">
          Saturday, November 15, 2025
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 4px">
          🕙 <strong style="color:#111827;">Time</strong>
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 12px">
          10:00 AM – 6:00 PM PST
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 4px">
          📍 <strong style="color:#111827;">Location</strong>
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          The Masonic Auditorium<br />1111 California Street, San Francisco, CA
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="24px 32px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" align="center" padding="0">
          Featured Speakers
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="12px 32px 24px">
      <mj-column padding="0 8px 0 0">
        <mj-image src="https://placehold.co/240x180/e0e7ff/4f46e5?text=Speaker+1" alt="Speaker 1" width="240px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 2px">
          Maya Rodriguez
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Head of Music AI, Spotify
        </mj-text>
      </mj-column>
      <mj-column padding="0 0 0 8px">
        <mj-image src="https://placehold.co/240x180/e0e7ff/4f46e5?text=Speaker+2" alt="Speaker 2" width="240px" border-radius="8px" padding="0 0 10px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 2px">
          James Wu
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          Grammy-winning Producer
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px 32px 8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          Agenda Highlights
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 6px">
          <strong style="color:#4f46e5;">10:00 AM</strong> — Opening Keynote: The Next Era of Music
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 6px">
          <strong style="color:#4f46e5;">11:30 AM</strong> — Workshop: AI-Assisted Composition
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 6px">
          <strong style="color:#4f46e5;">2:00 PM</strong> — Panel: Independent Artists in the Streaming Age
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 6px">
          <strong style="color:#4f46e5;">4:00 PM</strong> — Live Demo: SyncMusic Studio 3.0
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 20px">
          <strong style="color:#4f46e5;">5:30 PM</strong> — Networking &amp; Closing Reception
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Reserve Your Seat
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#4f46e5;">Unsubscribe</a> · <a href="#" style="color:#9ca3af;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
