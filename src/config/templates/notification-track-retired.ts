import type { EmailTemplate } from '@/types/template.types'

export const notificationTrackRetired: EmailTemplate = {
  id: 'notification-track-retired',
  name: 'Important: A Track You Licensed Is Being Retired',
  description: 'Alerts users that a previously licensed track is being retired, clarifying existing rights.',
  category: 'Announcement',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Catalog Change Notice — Track Retirement</mj-title>
    <mj-preview>Important: "Midnight Drive" is being retired from the SyncMusic catalog. Your license remains fully valid.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="20px 24px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="4px 0 0">
          YOUR MUSIC, YOUR WAY
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Orange Alert Banner -->
    <mj-section background-color="#fff7ed" padding="14px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#9a3412" align="center" padding="0">
          📢 &nbsp;Catalog Change Notice — Action May Be Required
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Heading -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#111827" padding="0 0 8px">
          A track you licensed is being retired
        </mj-text>
        <mj-text font-size="15px" color="#374151" padding="0">
          We're writing to let you know that a track from your license history is being removed from the SyncMusic catalog. Please read this notice carefully.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track Details -->
    <mj-section background-color="#ffffff" padding="20px 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="10px" padding="20px 24px">
        <mj-text font-size="11px" font-weight="bold" color="#6b7280" padding="0 0 10px" letter-spacing="1px">
          TRACK DETAILS
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 4px">
          Midnight Drive
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 12px">
          by Lucas Ariel
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 4px">
          📅 &nbsp;<strong>Licensed on:</strong> November 14, 2024
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 4px">
          📄 &nbsp;<strong>License type:</strong> Standard License
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0">
          ❌ &nbsp;<strong>Removal date:</strong> April 15, 2026
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Your License Remains Valid -->
    <mj-section background-color="#f0fdf4" padding="0 24px 24px">
      <mj-column border="1px solid #86efac" border-radius="10px" padding="20px">
        <mj-text font-size="15px" font-weight="bold" color="#15803d" padding="0 0 8px">
          ✅ Your existing license is fully valid and enforceable
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0">
          The retirement of this track from our catalog does not affect your license in any way. You retain all rights granted under your Standard License, including the right to continue using this track in all existing and future projects as permitted by the license terms.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Download Recommendation -->
    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 8px">
          We recommend downloading an archive copy
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          After April 15, 2026, this track will no longer be available for download from SyncMusic. We strongly recommend downloading a local copy before the removal date to ensure you always have access to your licensed asset.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Download Archive Copy
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Similar Tracks -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 16px" />
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 12px">
          Similar tracks you might like
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="0 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="8px" padding="14px 16px">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Neon Boulevard</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Cinematic · 3:41 · Standard License $29</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="6px 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="8px" padding="14px 16px">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">Late Night Cruise</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Electronic · 3:12 · Standard License $29</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="6px 24px 28px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="8px" padding="14px 16px">
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 2px">City Lights</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">Cinematic · 4:02 · Standard License $29</mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 24px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. All rights reserved.<br />
          <a href="#" style="color: #6b7280;">Unsubscribe</a> · <a href="#" style="color: #6b7280;">Privacy Policy</a> · <a href="#" style="color: #6b7280;">Terms of Service</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
