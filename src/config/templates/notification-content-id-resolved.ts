import type { EmailTemplate } from '@/types/template.types'

export const notificationContentIdResolved: EmailTemplate = {
  id: 'notification-content-id-resolved',
  name: 'Your YouTube Content ID Claim Has Been Resolved',
  description: 'Notification that a Content ID dispute filed through SyncMusic has been resolved.',
  category: 'Announcement',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Content ID Claim Resolved — SyncMusic</mj-title>
    <mj-preview>Great news! Your YouTube Content ID dispute has been resolved. Claim released, monetization restored.</mj-preview>
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

    <!-- Green Success Banner -->
    <mj-section background-color="#f0fdf4" padding="14px 24px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#15803d" align="center" padding="0">
          ✅ &nbsp;Dispute Resolved — Your Content ID Claim Is Cleared
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Heading -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="28px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Your claim has been cleared 🎉
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          We successfully disputed the Content ID claim on your YouTube video. Here's a full summary of what happened.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Video Details -->
    <mj-section background-color="#ffffff" padding="20px 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="10px" padding="20px 24px">
        <mj-text font-size="11px" font-weight="bold" color="#6b7280" padding="0 0 10px" letter-spacing="1px">
          YOUR VIDEO
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          "Summer Road Trip Vlog 2025"
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 12px">
          YouTube Channel: @AlexCreatesStuff
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0 0 4px">
          🎵 &nbsp;<strong>Track claimed:</strong> Golden Hour by SkyWave Audio
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0">
          📄 &nbsp;<strong>License reference:</strong> SM-LIC-2024-08831
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Resolution Summary -->
    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          Resolution summary
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✅ &nbsp;<strong>Claim released</strong> — the Content ID claim has been fully retracted by the rights holder.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 10px">
          ✅ &nbsp;<strong>Monetization restored</strong> — your video is now earning ad revenue again as normal.
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          ✅ &nbsp;<strong>No strike applied</strong> — this dispute resulted in zero strikes or penalties on your channel.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- If Claim Returns -->
    <mj-section background-color="#fffbeb" padding="0 24px 24px">
      <mj-column border="1px solid #fde68a" border-radius="10px" padding="18px 20px">
        <mj-text font-size="14px" font-weight="bold" color="#92400e" padding="0 0 8px">
          What if the claim comes back?
        </mj-text>
        <mj-text font-size="13px" color="#78350f" padding="0">
          In rare cases, automated Content ID systems may re-flag a video. If this happens, do not dispute it manually — simply reply to this email and our team will re-file the dispute within 24 hours using your license reference SM-LIC-2024-08831.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="16px 24px 28px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          View My Licenses
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="10px 0 0">
          Keep your license PDF on file for future reference.
        </mj-text>
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
