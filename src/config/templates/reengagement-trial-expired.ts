import type { EmailTemplate } from '@/types/template.types'

export const reengagementTrialExpired: EmailTemplate = {
  id: 'reengagement-trial-expired',
  name: "Your Free Trial Has Ended — Don't Lose Access",
  description: 'Post-trial expiry email encouraging conversion to a paid plan.',
  category: 'Retention',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Your SyncMusic Free Trial Has Ended</mj-title>
    <mj-preview>Your 14-day trial is over — choose a plan to keep full access to SyncMusic's entire catalog.</mj-preview>
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

    <!-- Hero -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="26px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          Your 14-day trial is over
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          We hope you loved it. Here's everything you had access to during your trial.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What You Had -->
    <mj-section background-color="#ffffff" padding="20px 24px 8px">
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 12px">
          What you had during your trial:
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          🎵 &nbsp;5 full track previews &amp; downloads
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">
          📄 &nbsp;Standard License access for all tracks
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          🔍 &nbsp;Full catalog search across 2,000+ tracks
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- What You'll Miss -->
    <mj-section background-color="#fff1f2" padding="16px 24px" margin-top="8px">
      <mj-column>
        <mj-text font-size="14px" font-weight="bold" color="#be123c" padding="0 0 8px">
          Without upgrading, you'll lose:
        </mj-text>
        <mj-text font-size="13px" color="#9f1239" padding="0 0 4px">✗ &nbsp;Unlimited track downloads</mj-text>
        <mj-text font-size="13px" color="#9f1239" padding="0 0 4px">✗ &nbsp;Access to Stems packs</mj-text>
        <mj-text font-size="13px" color="#9f1239" padding="0">✗ &nbsp;Content ID protection &amp; dispute coverage</mj-text>
      </mj-column>
    </mj-section>

    <!-- Plan Options Heading -->
    <mj-section background-color="#ffffff" padding="28px 24px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 4px">
          Choose the plan that's right for you
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          All plans include full catalog access and Standard licensing.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Plans: Starter + Pro -->
    <mj-section background-color="#ffffff" padding="12px 24px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#f9fafb">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">Starter</mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#4f46e5" padding="0 0 8px">$9<span style="font-size:14px;font-weight:normal;color:#6b7280;">/mo</span></mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">✓ 10 downloads/month</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">✓ Standard License</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">✓ Email support</mj-text>
      </mj-column>
      <mj-column border="2px solid #4f46e5" border-radius="10px" padding="20px" background-color="#f5f3ff">
        <mj-text font-size="10px" font-weight="bold" color="#ffffff" background-color="#4f46e5" align="center" padding="3px 10px" border-radius="20px">
          MOST POPULAR
        </mj-text>
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="4px 0">Pro</mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#4f46e5" padding="0 0 8px">$19<span style="font-size:14px;font-weight:normal;color:#6b7280;">/mo</span></mj-text>
        <mj-text font-size="12px" color="#374151" padding="0 0 4px">✓ Unlimited downloads</mj-text>
        <mj-text font-size="12px" color="#374151" padding="0 0 4px">✓ Extended License included</mj-text>
        <mj-text font-size="12px" color="#374151" padding="0">✓ Content ID protection</mj-text>
      </mj-column>
    </mj-section>

    <!-- Studio Plan -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column border="1px solid #e5e7eb" border-radius="10px" padding="20px" background-color="#f9fafb">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">Studio</mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#4f46e5" padding="0 0 8px">$49<span style="font-size:14px;font-weight:normal;color:#6b7280;">/mo</span></mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">✓ Everything in Pro</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0 0 4px">✓ Exclusive license access</mj-text>
        <mj-text font-size="12px" color="#6b7280" padding="0">✓ Stems packs + priority support</mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="20px 24px 8px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Choose a Plan
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Sub-CTA -->
    <mj-section background-color="#ffffff" padding="8px 24px 28px">
      <mj-column>
        <mj-text font-size="13px" color="#4f46e5" align="center" padding="0">
          <a href="#" style="color: #4f46e5; text-decoration: underline;">Start for just $9 — cancel anytime</a>
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
