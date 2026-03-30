import type { EmailTemplate } from '@/types/template.types'

export const promoYoutubePack: EmailTemplate = {
  id: 'promo-youtube-pack',
  name: 'Grow Your Channel With the Right Music',
  description: 'Targeted at YouTube creators with a Content ID-safe background music bundle.',
  category: 'Promotional',
  mjml: `<mjml>
  <mj-head>
    <mj-title>YouTube Music Pack — Content ID Safe | SyncMusic</mj-title>
    <mj-preview>15 Content ID-safe tracks for your channel. No strikes. Ever. Was $129, now $69.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Header with YouTube red accent -->
    <mj-section background-color="#ff0000" padding="20px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0" letter-spacing="-0.5px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#fecaca" align="center" padding="4px 0 0" letter-spacing="2px">
          FOR YOUTUBE CREATORS
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero -->
    <mj-section background-color="#ffffff" padding="48px 32px 32px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#dc2626" align="center" padding="0 0 12px" letter-spacing="3px">
          YOUTUBE CREATOR PACK
        </mj-text>
        <mj-text font-size="32px" font-weight="bold" color="#111827" align="center" padding="0 0 16px" line-height="1.2">
          Grow your channel<br />with the right music
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0" line-height="1.7">
          15 background tracks carefully curated for YouTube content — vlogs, tutorials, gaming, and more. Every track is registered with our Content ID partners to protect you.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Guarantee Callout -->
    <mj-section background-color="#fef2f2" padding="20px 32px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#991b1b" align="center" padding="0 0 8px">
          No copyright strikes. Ever.
        </mj-text>
        <mj-text font-size="14px" color="#b91c1c" align="center" padding="0" line-height="1.6">
          Every track in this pack is cleared through SyncMusic's Content ID dispute program. If YouTube ever flags your video in error, we handle the dispute — guaranteed.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Track List -->
    <mj-section background-color="#f9fafb" padding="32px 32px 8px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#111827" align="center" padding="0 0 20px">
          15 tracks included
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f9fafb" padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="13px" font-weight="bold" color="#6b7280" padding="0 0 10px" letter-spacing="1px">
          VLOGS &amp; LIFESTYLE
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Golden Hour Drive &nbsp;<span style="color:#9ca3af;">(Acoustic Pop · 105 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Morning Commute &nbsp;<span style="color:#9ca3af;">(Lo-Fi · 88 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;City Wander &nbsp;<span style="color:#9ca3af;">(Indie Folk · 96 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Easy Sunday &nbsp;<span style="color:#9ca3af;">(Chill Acoustic · 78 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 16px">· &nbsp;Weekend Mood &nbsp;<span style="color:#9ca3af;">(Pop · 112 BPM)</span></mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#6b7280" padding="0 0 10px" letter-spacing="1px">
          TUTORIALS &amp; HOW-TO
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Focus State &nbsp;<span style="color:#9ca3af;">(Ambient · 70 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Deep Work &nbsp;<span style="color:#9ca3af;">(Lo-Fi · 85 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Soft Flow &nbsp;<span style="color:#9ca3af;">(Minimal Electronic · 90 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Clear Mind &nbsp;<span style="color:#9ca3af;">(Ambient Piano · 60 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 16px">· &nbsp;Step by Step &nbsp;<span style="color:#9ca3af;">(Upbeat Pop · 118 BPM)</span></mj-text>
        <mj-text font-size="13px" font-weight="bold" color="#6b7280" padding="0 0 10px" letter-spacing="1px">
          GAMING &amp; ACTION
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Pixel Rush &nbsp;<span style="color:#9ca3af;">(Synthwave · 140 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Raid Mode &nbsp;<span style="color:#9ca3af;">(Electronic · 150 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Glitch Effect &nbsp;<span style="color:#9ca3af;">(Trap · 145 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 6px">· &nbsp;Level Up &nbsp;<span style="color:#9ca3af;">(Chiptune · 128 BPM)</span></mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 0">· &nbsp;Final Boss &nbsp;<span style="color:#9ca3af;">(Epic Orchestral · 135 BPM)</span></mj-text>
      </mj-column>
    </mj-section>

    <!-- Content ID Explanation -->
    <mj-section background-color="#ffffff" padding="32px 32px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold" color="#111827" padding="0 0 10px">
          How our Content ID protection works
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0 0 8px" line-height="1.6">
          SyncMusic registers all tracks with YouTube's Content ID system under our own license. When you use a track from this pack, your license certificate links your channel directly to our whitelist — preventing any third-party claim from sticking.
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" padding="0" line-height="1.6">
          If a false claim is ever filed, our team files a counter-dispute within 24 hours at no extra cost.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Pricing -->
    <mj-section background-color="#f9fafb" padding="24px 32px 8px">
      <mj-column>
        <mj-text font-size="14px" color="#9ca3af" align="center" padding="0 0 4px">
          <span style="text-decoration:line-through;">Was $129</span>
        </mj-text>
        <mj-text font-size="48px" font-weight="bold" color="#111827" align="center" padding="0 0 4px" line-height="1">
          $69
        </mj-text>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0">
          One-time. Download all 15 tracks. Lifetime use on your channel.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#f9fafb" padding="24px 32px 40px">
      <mj-column>
        <mj-button background-color="#ff0000" color="#ffffff" font-size="16px" font-weight="bold" inner-padding="18px 48px" border-radius="8px" href="#" align="center">
          Get the YouTube Pack
        </mj-button>
        <mj-text font-size="12px" color="#9ca3af" align="center" padding="12px 0 0">
          Instant download after purchase. License certificate included.
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
