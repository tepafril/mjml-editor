import type { EmailTemplate } from '@/types/template.types'

export const onboardingStep3: EmailTemplate = {
  id: 'onboarding-step-3',
  name: 'Step 3: Download and Create',
  description: 'Final onboarding email covering download process, file formats, and YouTube declaration.',
  category: 'Welcome',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Step 3: Download and Create — SyncMusic</mj-title>
    <mj-preview>You're ready to download. Here's what file formats you'll get and how to declare on YouTube.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Logo Header -->
    <mj-section background-color="#4f46e5" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0">
          SyncMusic
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Progress Pill -->
    <mj-section background-color="#e0e7ff" padding="12px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#4338ca" align="center" padding="0" letter-spacing="1px">
          GETTING STARTED · STEP 3 OF 3
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Heading -->
    <mj-section background-color="#ffffff" padding="40px 32px 24px">
      <mj-column>
        <mj-text font-size="28px" font-weight="bold" color="#111827" padding="0 0 12px" line-height="1.2">
          Download, create, and publish.
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" padding="0 0 0" line-height="1.7">
          Once you've chosen a license, your download is instant. Here's a breakdown of every format you'll receive and how to use them.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Format Boxes -->
    <mj-section background-color="#ffffff" padding="8px 24px 8px">
      <mj-column background-color="#f9fafb" border-radius="8px" padding="16px 20px" border="1px solid #e5e7eb">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          WAV — Lossless Audio
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0" line-height="1.5">
          24-bit / 48kHz. Use in your video editor or DAW for the highest quality output. Ideal for broadcast and film.
        </mj-text>
      </mj-column>
      <mj-column background-color="#f9fafb" border-radius="8px" padding="16px 20px" border="1px solid #e5e7eb">
        <mj-text font-size="15px" font-weight="bold" color="#111827" padding="0 0 4px">
          MP3 — Compressed
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0" line-height="1.5">
          320 kbps. Smaller file size for quick exports, social uploads, and podcast use.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="8px 24px 24px">
      <mj-column background-color="#f5f3ff" border-radius="8px" padding="16px 20px" border="1px solid #ddd6fe">
        <mj-text font-size="15px" font-weight="bold" color="#5b21b6" padding="0 0 4px">
          Stems — Individual Layers
        </mj-text>
        <mj-text font-size="13px" color="#6b7280" padding="0" line-height="1.5">
          Separate drum, bass, melody, and FX tracks. Mix and match to fit your edit perfectly. Available on Extended and above.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- YouTube Declaration -->
    <mj-section background-color="#fffbeb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#92400e" padding="0 0 6px">
          YouTube Content ID — What You Need to Know
        </mj-text>
        <mj-text font-size="13px" color="#78350f" padding="0" line-height="1.6">
          Some SyncMusic tracks are registered with YouTube Content ID. If your video receives a claim, simply declare your license in YouTube Studio. Your license document (included in every download) contains the exact reference ID you'll need. Claims are resolved within 24 hours.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Celebratory Section -->
    <mj-section background-color="#4f46e5" padding="40px 32px">
      <mj-column>
        <mj-text font-size="32px" align="center" padding="0 0 8px">
          🎉
        </mj-text>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0 0 8px">
          You're all set!
        </mj-text>
        <mj-text font-size="15px" color="#c7d2fe" align="center" padding="0 0 0" line-height="1.6">
          You now know how to find tracks, choose a license, and download your files. Go make something great.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="40px 32px 48px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" inner-padding="16px 48px" border-radius="8px" href="#" align="center">
          Download Your First Track
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f9fafb" padding="20px 32px">
      <mj-column>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="0 0 6px">
          Questions? Email us at <a href="mailto:support@syncmusic.app" style="color:#4f46e5;">support@syncmusic.app</a>
        </mj-text>
        <mj-text font-size="11px" color="#d1d5db" align="center" padding="0">
          © 2025 SyncMusic Inc. · <a href="#" style="color:#9ca3af;">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`,
}
