import type { EmailTemplate } from '@/types/template.types'

export const accountAnnualSummary: EmailTemplate = {
  id: 'account-annual-summary',
  name: 'Your Year in Music: 2025 Recap',
  description: 'Year-end personalized recap showing tracks licensed, genres explored, and usage stats.',
  category: 'Account',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your 2025 SyncMusic Year in Review</mj-title>
    <mj-preview>You licensed 23 tracks, explored 5 genres, and used 142 hours of music. Here's your 2025 story.</mj-preview>
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
          YOUR 2025 RECAP
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Celebratory Hero -->
    <mj-section background-color="#312e81" padding="44px 24px 36px">
      <mj-column>
        <mj-text font-size="36px" align="center" padding="0 0 12px">🎉</mj-text>
        <mj-text font-size="28px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px" line-height="1.2">
          Your 2025 SyncMusic<br />Year in Review
        </mj-text>
        <mj-text font-size="15px" color="#c7d2fe" align="center" padding="0">
          What a year, Alex. Here's a look back at everything you created.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Big Stats -->
    <mj-section background-color="#4f46e5" padding="28px 24px">
      <mj-column>
        <mj-text font-size="40px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">23</mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0">Tracks Licensed</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="40px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">5</mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0">Genres Explored</mj-text>
      </mj-column>
      <mj-column>
        <mj-text font-size="40px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">142</mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0">Hours of Music Used</mj-text>
      </mj-column>
    </mj-section>

    <!-- Top Genre -->
    <mj-section background-color="#ffffff" padding="32px 24px 16px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#6b7280" padding="0 0 12px" letter-spacing="2px">
          YOUR #1 GENRE IN 2025
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" padding="0 0 8px">
          🎻 Cinematic
        </mj-text>
        <mj-text font-size="14px" color="#4b5563" padding="0">
          You licensed 11 cinematic tracks in 2025 — more than any other genre. From epic orchestral to intimate piano scores, your projects had the dramatic edge they deserved.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Genres Bar -->
    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column>
        <mj-text font-size="13px" color="#374151" padding="0 0 6px">Cinematic <span style="color: #9ca3af;">11 tracks</span></mj-text>
        <mj-image src="https://placehold.co/520x12/4f46e5/4f46e5?text=+" alt="" width="520px" padding="0 0 10px" border-radius="6px" />

        <mj-text font-size="13px" color="#374151" padding="0 0 6px">Electronic <span style="color: #9ca3af;">6 tracks</span></mj-text>
        <mj-image src="https://placehold.co/286x12/6366f1/6366f1?text=+" alt="" width="286px" padding="0 0 10px" border-radius="6px" />

        <mj-text font-size="13px" color="#374151" padding="0 0 6px">Acoustic <span style="color: #9ca3af;">3 tracks</span></mj-text>
        <mj-image src="https://placehold.co/143x12/818cf8/818cf8?text=+" alt="" width="143px" padding="0 0 10px" border-radius="6px" />

        <mj-text font-size="13px" color="#374151" padding="0 0 6px">Lo-Fi <span style="color: #9ca3af;">2 tracks</span></mj-text>
        <mj-image src="https://placehold.co/96x12/a5b4fc/a5b4fc?text=+" alt="" width="96px" padding="0 0 10px" border-radius="6px" />

        <mj-text font-size="13px" color="#374151" padding="0 0 6px">Jazz <span style="color: #9ca3af;">1 track</span></mj-text>
        <mj-image src="https://placehold.co/48x12/c7d2fe/c7d2fe?text=+" alt="" width="48px" padding="0 0 0" border-radius="6px" />
      </mj-column>
    </mj-section>

    <!-- Most Used Track -->
    <mj-section background-color="#f9fafb" padding="24px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#6b7280" padding="0 0 10px" letter-spacing="2px">
          YOUR MOST USED TRACK
        </mj-text>
        <mj-text font-size="20px" font-weight="bold" color="#111827" padding="0 0 4px">
          🎵 "Horizon" — licensed 4 times
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          Cinematic / Epic · by Ember Collective · 4:22 · Full Orchestra
        </mj-text>
        <mj-text font-size="14px" color="#4b5563" padding="12px 0 0">
          You licensed "Horizon" for 4 separate projects throughout 2025 — from your brand documentary in March to the product launch reel in November. It clearly resonates.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Milestone Badge -->
    <mj-section background-color="#fffbeb" padding="28px 24px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#92400e" align="center" padding="0 0 10px" letter-spacing="2px">
          PERSONAL MILESTONE UNLOCKED
        </mj-text>
        <mj-text font-size="36px" align="center" padding="0 0 8px">🥈</mj-text>
        <mj-text font-size="22px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Silver Creator
        </mj-text>
        <mj-text font-size="13px" color="#4b5563" align="center" padding="0">
          Awarded for licensing 20+ tracks in a single year. You're in the top 18% of SyncMusic creators. Keep going — Gold Creator status starts at 40 tracks.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#4f46e5" padding="32px 24px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px">
          See your full 2025 breakdown
        </mj-text>
        <mj-text font-size="13px" color="#c7d2fe" align="center" padding="0 0 20px">
          Download history, license receipts, monthly usage graphs, and more — all in your account dashboard.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" inner-padding="14px 32px" border-radius="8px" href="#" align="center">
          See Full Stats
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
