import type { EmailTemplate } from '@/types/template.types'

export const licenseBundleDelivery: EmailTemplate = {
  id: 'license-bundle-delivery',
  name: 'Your License Pack is Ready',
  description: 'Sent after a multi-track bundle purchase delivering all license documents and download links.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your License Pack is Ready — SyncMusic</mj-title>
    <mj-preview>Filmmaker Bundle — 10 tracks licensed and ready to download. Access your files now.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="24px 32px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 2px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c4b5fd" align="center" padding="0" letter-spacing="2px">
          MUSIC LICENSING
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Bundle summary -->
    <mj-section background-color="#ffffff" padding="32px 32px 20px">
      <mj-column>
        <mj-text font-size="28px" align="center" padding="0 0 10px">
          📦
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Your License Pack is Ready
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0 0 4px">
          <strong style="color:#4f46e5;">Filmmaker Bundle — 10 Tracks</strong>
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0 0 20px">
          Extended License · All digital &amp; broadcast media · Perpetual
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0" />
      </mj-column>
    </mj-section>

    <!-- Track list -->
    <mj-section background-color="#ffffff" padding="16px 32px 8px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#111827" padding="0 0 14px">
          Your Tracks
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;width:24px;vertical-align:middle;">1.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Horizon</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Cinematic · 3:42</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="background-color:#f9fafb;border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">2.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Ember Rain</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Ambient · 4:15</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">3.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Northern Drift</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Orchestral · 2:58</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="background-color:#f9fafb;border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">4.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Still Water</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Minimal · 3:21</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">5.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Obsidian Sky</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Electronic · 4:02</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="background-color:#f9fafb;border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">6.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Fractured Light</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Cinematic · 3:55</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">7.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Cascade</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Ambient · 5:10</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="background-color:#f9fafb;border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">8.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Deep Current</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Orchestral · 3:33</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">9.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Vantage Point</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Cinematic · 4:28</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td style="padding:9px 0;color:#9ca3af;vertical-align:middle;">10.</td>
            <td style="padding:9px 8px;vertical-align:middle;">
              <strong style="color:#111827;">Pale Reverie</strong>
              <span style="color:#9ca3af;font-size:12px;"> — Minimal · 3:47</span>
            </td>
            <td style="padding:9px 0;text-align:right;vertical-align:middle;">
              <a href="#" style="color:#4f46e5;font-size:12px;text-decoration:none;font-weight:600;">Download &darr;</a>
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Batch download + usage reminder -->
    <mj-section background-color="#ffffff" padding="16px 32px 32px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 20px" />
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="14px" font-weight="bold" padding="13px 28px" border-radius="6px" align="center" href="#" inner-padding="13px 28px">
          Download All License PDFs
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="16px 0 0">
          These licenses cover unlimited use across film, TV, advertising, and digital platforms. Retain your PDF copies for production records.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- View library CTA -->
    <mj-section background-color="#f5f3ff" padding="24px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" align="center" padding="0 0 14px">
          All your licensed tracks are saved in your personal library for easy future access.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" padding="11px 28px" border-radius="6px" align="center" href="#" inner-padding="11px 28px" border="2px solid #4f46e5">
          View My Library
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. &nbsp;·&nbsp; <a href="#" style="color:#9ca3af;">Unsubscribe</a> &nbsp;·&nbsp; <a href="#" style="color:#9ca3af;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
