import type { EmailTemplate } from '@/types/template.types'

export const promoExclusiveSpotlight: EmailTemplate = {
  id: 'promo-exclusive-spotlight',
  name: 'Own It Outright — Exclusive Licenses Available',
  description: 'Promotional email for agencies and productions highlighting the exclusive license offering.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Own It Outright — Exclusive Licenses | SyncMusic</mj-title>
    <mj-preview>Pull a track from the catalog. Own it forever. Request an exclusive license for your next campaign.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Dark Premium Header -->
    <mj-section background-color="#0f0a1e" padding="24px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#6b7280" align="center" padding="4px 0 0" letter-spacing="3px">
          EXCLUSIVE LICENSING
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#0f0a1e" padding="48px 32px 48px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#fbbf24" align="center" padding="0 0 16px" letter-spacing="4px">
          FOR AGENCIES &amp; PRODUCTIONS
        </mj-text>
        <mj-text font-size="36px" font-weight="bold" color="#ffffff" align="center" padding="0 0 16px" line-height="1.15">
          The track that defines<br />your campaign
        </mj-text>
        <mj-text font-size="16px" color="#9ca3af" align="center" padding="0" line-height="1.7">
          With SyncMusic Exclusive Licenses, you don't just license a track — you own it. Pulled from the public catalog, cleared for all platforms, forever yours.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What Exclusive Means -->
    <mj-section background-color="#1e1b4b" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0 0 24px">
          What an exclusive license means
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e1b4b" padding="0 32px 8px">
      <mj-column>
        <mj-text font-size="14px" color="#c7d2fe" padding="0 0 12px" line-height="1.6">
          🔒 &nbsp;<strong style="color:#ffffff;">Pulled from the catalog</strong> — once you own the exclusive, no one else can license that track. Ever.
        </mj-text>
        <mj-text font-size="14px" color="#c7d2fe" padding="0 0 12px" line-height="1.6">
          ∞ &nbsp;<strong style="color:#ffffff;">Yours forever</strong> — a single one-time payment, with no renewals, no royalties, no usage limits.
        </mj-text>
        <mj-text font-size="14px" color="#c7d2fe" padding="0 0 24px" line-height="1.6">
          🌍 &nbsp;<strong style="color:#ffffff;">All platforms cleared</strong> — broadcast, streaming, social, cinema, and advertising use worldwide.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Featured Tracks -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 4px">
          Featured exclusive-eligible tracks
        </mj-text>
        <mj-text font-size="13px" color="#9ca3af" align="center" padding="0 0 24px">
          Act fast — each track can only be exclusively licensed once.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 1 -->
    <mj-section background-color="#ffffff" padding="0 24px 0">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px">
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          Skyline Drift
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 8px">
          Genre: Cinematic &nbsp;·&nbsp; Mood: Aspirational, Dramatic
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#4f46e5" padding="0">
          From $299
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 2 -->
    <mj-section background-color="#ffffff" padding="8px 24px 0">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px">
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          Chrome &amp; Concrete
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 8px">
          Genre: Hip-Hop / Urban &nbsp;·&nbsp; Mood: Bold, Confident
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#4f46e5" padding="0">
          From $349
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track 3 -->
    <mj-section background-color="#ffffff" padding="8px 24px 32px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px">
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 4px">
          Northern Pulse
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0 0 8px">
          Genre: Electronic &nbsp;·&nbsp; Mood: Futuristic, High-Energy
        </mj-text>
        <mj-text font-size="18px" font-weight="bold" color="#4f46e5" padding="0">
          From $299
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Agency Billing Note -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0" line-height="1.6">
          Agency billing available. PO and net-30 invoicing supported for qualified accounts. Contact your account manager or <a href="mailto:licensing@syncmusic.io" style="color:#4f46e5;">licensing@syncmusic.io</a>.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#0f0a1e" padding="40px 32px">
      <mj-column>
        <mj-button background-color="#fbbf24" color="#0f0a1e" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Request an Exclusive License
        </mj-button>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="12px 0 0">
          Our licensing team typically responds within 1 business day.
        </mj-text>
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
