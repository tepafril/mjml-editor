import type { EmailTemplate } from '@/types/template.types'

export const refundProcessed: EmailTemplate = {
  id: 'refund-processed',
  name: 'Your Refund Has Been Processed',
  description: 'Confirms a refund has been issued with amount, original transaction, and timeline.',
  category: 'Transactional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Refund Processed — SyncMusic</mj-title>
    <mj-preview>Your refund of $29.00 for "Midnight Drive" has been processed. Allow 3–5 business days.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="22px 32px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 2px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c4b5fd" align="center" padding="0" letter-spacing="2px">
          MUSIC LICENSING
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Refund confirmation hero -->
    <mj-section background-color="#ffffff" padding="36px 32px 24px">
      <mj-column>
        <mj-text font-size="28px" align="center" padding="0 0 10px">
          ↩
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          Refund Processed
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0 0 20px">
          We've issued a refund to your original payment method.
        </mj-text>

        <!-- Refund amount highlight -->
        <mj-text align="center" padding="0 0 8px">
          <span style="display:inline-block;background-color:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:18px 36px;">
            <span style="display:block;font-size:12px;color:#15803d;font-weight:600;letter-spacing:1px;margin-bottom:4px;">REFUND AMOUNT</span>
            <span style="display:block;font-size:36px;font-weight:800;color:#16a34a;">$29.00</span>
          </span>
        </mj-text>
        <mj-divider border-color="#e5e7eb" border-width="1px" padding="20px 0 0" />
      </mj-column>
    </mj-section>

    <!-- Original order details -->
    <mj-section background-color="#ffffff" padding="8px 32px 24px">
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 14px">
          Original Order Details
        </mj-text>
        <mj-table font-size="13px" color="#374151" cellpadding="0">
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Track</td>
            <td style="padding:11px 14px;text-align:right;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">"Midnight Drive"</td>
          </tr>
          <tr>
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">License Type</td>
            <td style="padding:11px 14px;text-align:right;color:#374151;border-bottom:1px solid #e5e7eb;">Standard License</td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Order Number</td>
            <td style="padding:11px 14px;text-align:right;color:#4f46e5;font-weight:700;border-bottom:1px solid #e5e7eb;">SYN-2025-4821</td>
          </tr>
          <tr>
            <td style="padding:11px 14px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Original Charge</td>
            <td style="padding:11px 14px;text-align:right;color:#374151;border-bottom:1px solid #e5e7eb;">March 20, 2025</td>
          </tr>
          <tr style="background-color:#f9fafb;">
            <td style="padding:11px 14px;color:#6b7280;">Refunded To</td>
            <td style="padding:11px 14px;text-align:right;color:#374151;">Visa ending in 4242</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <!-- Timeline notice -->
    <mj-section background-color="#eff6ff" padding="18px 32px" border-left="4px solid #3b82f6">
      <mj-column>
        <mj-text font-size="13px" color="#1d4ed8" padding="0">
          <strong>Timeline:</strong> Your refund will appear on your statement within <strong>3–5 business days</strong>, depending on your bank or card issuer.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- License revocation notice -->
    <mj-section background-color="#f9fafb" padding="18px 32px" border-left="4px solid #e5e7eb">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" padding="0">
          <strong style="color:#374151;">License notice:</strong> As part of this refund, your license for "Midnight Drive" has been revoked. Please remove the track from any active projects or public platforms.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Feedback CTA -->
    <mj-section background-color="#ffffff" padding="28px 32px">
      <mj-column>
        <mj-text font-size="14px" color="#374151" align="center" padding="0 0 16px">
          We're sorry this didn't work out. Your feedback helps us improve.
        </mj-text>
        <mj-button background-color="#ffffff" color="#4f46e5" font-size="14px" font-weight="bold" padding="12px 28px" border-radius="6px" align="center" href="#" inner-padding="12px 28px" border="2px solid #4f46e5">
          Tell Us What Went Wrong
        </mj-button>
        <mj-text align="center" padding="10px 0 0">
          <a href="mailto:support@syncmusic.app" style="color:#6b7280;font-size:12px;text-decoration:none;">Questions? support@syncmusic.app</a>
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
