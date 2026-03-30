import type { EmailTemplate } from '@/types/template.types'

export const notificationNewLicenseTerms: EmailTemplate = {
  id: 'notification-new-license-terms',
  name: 'Updated License Terms — Effective March 1, 2026',
  description: 'Legal notification about updated licensing terms with key changes summarized clearly.',
  category: 'Announcement',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Updated License Terms — Effective March 1, 2026</mj-title>
    <mj-preview>Important updates to SyncMusic's license terms are effective March 1, 2026. Here's what's changing and what it means for you.</mj-preview>
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

    <!-- Heading -->
    <mj-section background-color="#ffffff" padding="36px 24px 8px">
      <mj-column>
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 8px" letter-spacing="1px">
          LEGAL NOTICE
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Important Update to Our License Terms
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0">
          We've updated our licensing terms to better reflect how creators use music today. Please read this notice carefully.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Effective Date Notice -->
    <mj-section background-color="#f5f3ff" padding="16px 24px">
      <mj-column border-left="4px solid #4f46e5" padding="12px 16px">
        <mj-text font-size="14px" color="#374151" padding="0">
          These updated terms take effect on <strong>March 1, 2026</strong>. By continuing to use SyncMusic after this date, you agree to the updated terms.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Key Changes -->
    <mj-section background-color="#ffffff" padding="24px 24px 8px">
      <mj-column>
        <mj-text font-size="17px" font-weight="bold" color="#111827" padding="0 0 16px">
          Key changes at a glance
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Change 1 -->
    <mj-section background-color="#ffffff" padding="0 24px 12px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="10px" padding="18px 20px">
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" padding="0 0 6px" letter-spacing="1px">
          CHANGE 1 — EXTENDED LICENSE
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 6px">
          Extended License now covers TikTok
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0">
          Previously, the Extended License did not explicitly cover TikTok content. As of March 1, 2026, all Extended License holders may use licensed tracks in TikTok videos including branded content and creator monetized posts.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Change 2 -->
    <mj-section background-color="#ffffff" padding="0 24px 12px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="10px" padding="18px 20px">
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" padding="0 0 6px" letter-spacing="1px">
          CHANGE 2 — EXCLUSIVE LICENSE
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 6px">
          Exclusive License now includes NFT rights
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0">
          Exclusive license holders now have the right to mint and sell NFTs that incorporate the licensed track as part of the underlying media asset. This right is non-transferable and limited to the original license holder.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Change 3 -->
    <mj-section background-color="#ffffff" padding="0 24px 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="10px" padding="18px 20px">
        <mj-text font-size="11px" font-weight="bold" color="#4f46e5" padding="0 0 6px" letter-spacing="1px">
          CHANGE 3 — STANDARD LICENSE
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 6px">
          Standard License adds a 500K stream limit
        </mj-text>
        <mj-text font-size="13px" color="#374151" padding="0">
          To align with industry standards, the Standard License now includes a 500,000 cumulative stream limit across all platforms. Content that exceeds this threshold will require an upgrade to the Extended or Exclusive License.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Existing Licenses Not Affected -->
    <mj-section background-color="#f0fdf4" padding="0 24px 24px">
      <mj-column border="1px solid #86efac" border-radius="10px" padding="18px 20px">
        <mj-text font-size="14px" font-weight="bold" color="#15803d" padding="0 0 6px">
          ✅ Your existing licenses are not affected
        </mj-text>
        <mj-text font-size="13px" color="#166534" padding="0">
          All licenses purchased before March 1, 2026 remain governed by the terms that were in effect at the time of purchase. These updates apply only to new licenses issued on or after March 1, 2026.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Full Terms Link -->
    <mj-section background-color="#ffffff" padding="16px 24px 8px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          You can review the full updated terms at any time at<br />
          <a href="#" style="color: #4f46e5; text-decoration: underline;">syncmusic.com/legal/license-terms</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="12px 24px 28px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Review Full Terms
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 24px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. All rights reserved.<br />
          This is a legal notice required under our Terms of Service. You cannot unsubscribe from legal notices.<br />
          <a href="#" style="color: #6b7280;">Privacy Policy</a> · <a href="#" style="color: #6b7280;">Terms of Service</a> · <a href="#" style="color: #6b7280;">Contact Support</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
