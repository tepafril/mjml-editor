import type { EmailTemplate } from '@/types/template.types'

export const productLaunch: EmailTemplate = {
  id: 'product-launch',
  name: 'Product Launch',
  description: 'Dark full-bleed hero with 3 feature columns, pricing section, and big CTA.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Introducing SyncMusic Studio 3.0</mj-title>
    <mj-preview>The most powerful music creation suite we've ever built. Available now.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#0a0a0f">
    <mj-section background-color="#0a0a0f" padding="20px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#0a0a0f" padding="40px 32px 48px">
      <mj-column>
        <mj-text font-size="12px" font-weight="bold" color="#818cf8" align="center" padding="0 0 12px" letter-spacing="3px">
          NEW RELEASE
        </mj-text>
        <mj-text font-size="42px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px" line-height="1.15">
          Studio 3.0
        </mj-text>
        <mj-text font-size="18px" color="#9ca3af" align="center" padding="0 0 32px">
          Create. Collaborate. Distribute. All in one place.
        </mj-text>
        <mj-image src="https://placehold.co/600x320/1e1b4b/818cf8?text=Studio+3.0+Preview" alt="Studio 3.0" width="600px" border-radius="12px" padding="0 0 32px" />
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 56px" border-radius="8px" href="#" align="center">
          Try Studio 3.0 Free
        </mj-button>
        <mj-text font-size="12px" color="#4b5563" align="center" padding="10px 0 0">
          No credit card required · 14-day free trial
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#111827" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0">
          Everything you need to create
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#111827" padding="16px 16px 32px">
      <mj-column padding="0 8px">
        <mj-text font-size="24px" align="center" padding="0 0 8px">🎛️</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#ffffff" align="center" padding="0 0 6px">
          AI-Powered Mixing
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          Smart mastering and mixing suggestions that learn from your style and preferences over time.
        </mj-text>
      </mj-column>
      <mj-column padding="0 8px">
        <mj-text font-size="24px" align="center" padding="0 0 8px">🤝</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#ffffff" align="center" padding="0 0 6px">
          Real-Time Collab
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          Work on tracks simultaneously with artists anywhere in the world, with zero latency.
        </mj-text>
      </mj-column>
      <mj-column padding="0 8px">
        <mj-text font-size="24px" align="center" padding="0 0 8px">🚀</mj-text>
        <mj-text font-size="14px" font-weight="bold" color="#ffffff" align="center" padding="0 0 6px">
          One-Click Distro
        </mj-text>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0">
          Distribute your music to all major platforms — Spotify, Apple Music, Tidal — in one click.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#0a0a0f" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          Simple, honest pricing
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0 0 20px">
          Start free. Upgrade when you're ready.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#0a0a0f" padding="0 32px 40px">
      <mj-column>
        <mj-text font-size="14px" color="#9ca3af" align="center" padding="0 0 4px">
          Starting at
        </mj-text>
        <mj-text font-size="48px" font-weight="bold" color="#4f46e5" align="center" padding="0" line-height="1">
          $12
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="4px 0 24px">
          per month · billed annually
        </mj-text>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 56px" border-radius="8px" href="#" align="center">
          Get Studio 3.0
        </mj-button>
      </mj-column>
    </mj-section>

    <mj-section background-color="#050507" padding="20px 24px">
      <mj-column>
        <mj-text font-size="11px" color="#374151" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#4f46e5;">Unsubscribe</a> · <a href="#" style="color:#4b5563;">Privacy Policy</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
}
