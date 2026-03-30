import type { EmailTemplate } from '@/types/template.types'

export const promoReferral: EmailTemplate = {
  id: 'promo-referral',
  name: 'Give $20, Get $20 — Refer a Creator',
  description: 'Introduces the referral program explaining how to share a link and earn credits.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Give $20, Get $20 — Refer a Creator | SyncMusic</mj-title>
    <mj-preview>Share SyncMusic with a friend and you both earn $20 in account credit. It's that simple.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header -->
    <mj-section background-color="#4f46e5" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#c7d2fe" align="center" padding="4px 0 0" letter-spacing="2px">
          YOUR MUSIC, YOUR WAY
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#ffffff" padding="48px 32px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" align="center" padding="0 0 12px" letter-spacing="3px">
          REFERRAL PROGRAM
        </mj-text>
        <mj-text font-size="32px" font-weight="bold" color="#111827" align="center" padding="0 0 16px" line-height="1.2">
          Share SyncMusic,<br />Earn Together
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0" line-height="1.7">
          Know a filmmaker, podcaster, or content creator who needs great music? Refer them to SyncMusic and you'll both pocket $20 in account credit — no limits on how many friends you refer.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 1 -->
    <mj-section background-color="#f9fafb" padding="24px 32px 0">
      <mj-column>
        <mj-text font-size="36px" font-weight="bold" color="#e0e7ff" align="left" padding="0 0 0">
          01
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="left" padding="0 0 6px">
          Share your unique link
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="left" padding="0 0 0" line-height="1.6">
          Every SyncMusic account comes with a personal referral link. Share it via email, social media, or drop it in your community.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 2 -->
    <mj-section background-color="#f9fafb" padding="24px 32px 0">
      <mj-column>
        <mj-text font-size="36px" font-weight="bold" color="#e0e7ff" align="left" padding="0 0 0">
          02
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="left" padding="0 0 6px">
          Your friend signs up
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="left" padding="0 0 0" line-height="1.6">
          When your friend creates a paid SyncMusic account using your link, the referral is automatically tracked — no codes to enter.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 3 -->
    <mj-section background-color="#f9fafb" padding="24px 32px 32px">
      <mj-column>
        <mj-text font-size="36px" font-weight="bold" color="#e0e7ff" align="left" padding="0 0 0">
          03
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="left" padding="0 0 6px">
          Both earn $20 credit
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="left" padding="0 0 0" line-height="1.6">
          Once your friend's account is active, $20 is added to both of your accounts within 48 hours. Use it toward any plan, pack, or license.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Referral Link Block -->
    <mj-section background-color="#ffffff" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#6b7280" align="center" padding="0 0 12px" letter-spacing="1px">
          YOUR REFERRAL LINK
        </mj-text>
        <mj-text font-size="14px" color="#4f46e5" align="center" padding="12px 20px" border="2px dashed #c7d2fe" border-radius="8px">
          https://app.syncmusic.io/refer/<strong>{{referral_code}}</strong>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Social Share -->
    <mj-section background-color="#ffffff" padding="16px 32px 8px">
      <mj-column>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0 0 12px">
          Share directly on:
        </mj-text>
        <mj-text font-size="13px" color="#374151" align="center" padding="0">
          <a href="#" style="color:#1da1f2;font-weight:bold;text-decoration:none;">Twitter / X</a>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="#" style="color:#0a66c2;font-weight:bold;text-decoration:none;">LinkedIn</a>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="#" style="color:#25d366;font-weight:bold;text-decoration:none;">WhatsApp</a>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="#" style="color:#e1306c;font-weight:bold;text-decoration:none;">Instagram</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Terms -->
    <mj-section background-color="#ffffff" padding="16px 32px 8px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          Credit is issued after the referred user subscribes to a paid plan. Credits expire 12 months after issuance. Not applicable to Enterprise plans. <a href="#" style="color:#4f46e5;">Full terms</a>.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="24px 32px 40px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Copy My Referral Link
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f3f4f6" padding="20px 32px">
      <mj-column>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#4f46e5;">Unsubscribe</a> · <a href="#" style="color:#4f46e5;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
