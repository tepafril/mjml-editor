import type { EmailTemplate } from '@/types/template.types'

export const purchaseConfirmationExclusive: EmailTemplate = {
  id: 'purchase-confirmation-exclusive',
  name: 'Your Exclusive License Confirmation',
  description: 'High-touch confirmation for exclusive license purchases with full rights scope.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your Exclusive License — SyncMusic</mj-title>
    <mj-preview>Congratulations — you now own this track exclusively. Order #SYN-EX-0042</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Premium dark/gold header -->
    <mj-section background-color="#0f0e17" padding="28px 32px 20px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#a78bfa" align="center" padding="0" letter-spacing="3px">
          MUSIC LICENSING
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Exclusive badge + hero -->
    <mj-section background-color="#1a1828" padding="32px 32px 24px">
      <mj-column>
        <mj-text align="center" padding="0 0 16px">
          <span style="display:inline-block;background-color:#d97706;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:3px;padding:5px 16px;border-radius:2px;">EXCLUSIVE LICENSE</span>
        </mj-text>
        <mj-text font-size="28px" font-weight="bold" color="#ffffff" align="center" padding="0 0 10px" line-height="1.3">
          Congratulations —<br />you now own this track.
        </mj-text>
        <mj-text font-size="15px" color="#c4b5fd" align="center" padding="0 0 8px">
          Your exclusive rights to <strong style="color:#fbbf24;">"Solaris"</strong> are now active.
        </mj-text>
        <mj-divider border-color="#2d2b40" border-width="1px" padding="16px 0 0" />
      </mj-column>
    </mj-section>

    <!-- What exclusivity means -->
    <mj-section background-color="#ffffff" padding="32px 32px 16px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" padding="0 0 16px">
          What Your Exclusive License Covers
        </mj-text>
        <mj-table font-size="14px" color="#374151" cellpadding="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:28px;">
              <span style="color:#d97706;font-size:18px;">★</span>
            </td>
            <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;">
              <strong style="color:#111827;">Track removed from catalog</strong><br />
              <span style="color:#6b7280;font-size:13px;">"Solaris" will be delisted from SyncMusic within 30 days of this purchase.</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:28px;">
              <span style="color:#d97706;font-size:18px;">★</span>
            </td>
            <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;">
              <strong style="color:#111827;">All media &amp; all platforms</strong><br />
              <span style="color:#6b7280;font-size:13px;">Film, TV, advertising, streaming, social — no medium restrictions, worldwide.</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;vertical-align:top;width:28px;">
              <span style="color:#d97706;font-size:18px;">★</span>
            </td>
            <td style="padding:10px 0 10px 12px;">
              <strong style="color:#111827;">Perpetual rights</strong><br />
              <span style="color:#6b7280;font-size:13px;">Your license never expires. Use this track for the lifetime of your project.</span>
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Order details -->
    <mj-section background-color="#ffffff" padding="8px 32px 16px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 24px" />
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 12px">
          Order Details
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="background-color:#f9fafb;">
            <td style="padding:10px 14px;color:#6b7280;font-weight:600;border-bottom:1px solid #e5e7eb;">Track</td>
            <td style="padding:10px 14px;text-align:right;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;">"Solaris"</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">License Type</td>
            <td style="padding:10px 14px;text-align:right;border-bottom:1px solid #e5e7eb;">Exclusive — All Rights</td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Order Number</td>
            <td style="padding:10px 14px;text-align:right;border-bottom:1px solid #e5e7eb;color:#4f46e5;font-weight:700;">SYN-EX-0042</td>
          </tr>
          <tr>
            <td style="padding:12px 14px;color:#111827;font-weight:700;font-size:15px;">Total Paid</td>
            <td style="padding:12px 14px;text-align:right;color:#d97706;font-weight:700;font-size:18px;">$499.00</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Download CTAs -->
    <mj-section background-color="#ffffff" padding="8px 32px 32px">
      <mj-column>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="0 0 24px" />
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 16px">
          Your files are ready. Download them from the links below or access them anytime in your library.
        </mj-text>
        <mj-button background-color="#d97706" color="#ffffff" font-size="14px" font-weight="bold" padding="14px 28px" border-radius="6px" align="center" href="#" inner-padding="14px 28px">
          Download Track Files
        </mj-button>
        <mj-text align="center" padding="12px 0 0">
          <a href="#" style="color:#4f46e5;font-size:13px;text-decoration:none;">Download License PDF &rarr;</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Personal thank-you -->
    <mj-section background-color="#f9fafb" padding="24px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" align="center" padding="0 0 6px">
          Thank you for choosing SyncMusic for your exclusive rights.
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Our team is here if you have any questions about your license — <a href="mailto:licensing@syncmusic.app" style="color:#4f46e5;">licensing@syncmusic.app</a>
        </mj-text>
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
