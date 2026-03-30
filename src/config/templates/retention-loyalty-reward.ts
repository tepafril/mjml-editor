import type { EmailTemplate } from '@/types/template.types'

export const retentionLoyaltyReward: EmailTemplate = {
  id: 'retention-loyalty-reward',
  name: "You've Earned a Loyalty Reward",
  description: 'Milestone reward email when user reaches 10 tracks licensed.',
  category: 'Retention',
  mjml: `<mjml>
  <mj-head>
    <mj-title>Milestone Unlocked — You've Earned a Loyalty Reward!</mj-title>
    <mj-preview>You've licensed 10 tracks — you're officially a SyncMusic Pro. Claim your $15 credit inside.</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.6" color="#374151" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f3f4f6">

    <!-- Gold Header -->
    <mj-section background-color="#b45309" padding="28px 24px 32px">
      <mj-column>
        <mj-text font-size="22px" font-weight="bold" color="#ffffff" align="center" padding="0 0 4px">
          SyncMusic
        </mj-text>
        <mj-text font-size="11px" color="#fde68a" align="center" padding="0 0 20px">
          YOUR MUSIC, YOUR WAY
        </mj-text>
        <mj-text font-size="40px" align="center" padding="0 0 8px">
          🏆
        </mj-text>
        <mj-text font-size="11px" font-weight="bold" color="#fde68a" align="center" padding="0 0 6px" letter-spacing="2px">
          MILESTONE UNLOCKED
        </mj-text>
        <mj-text font-size="26px" font-weight="bold" color="#ffffff" align="center" padding="0">
          You're a SyncMusic Pro!
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Congrats Copy -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          You've licensed 10 tracks — incredible!
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          You're one of SyncMusic's most dedicated creators. We're celebrating your creativity with a reward.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Personalized Stats -->
    <mj-section background-color="#ffffff" padding="20px 24px">
      <mj-column background-color="#f9fafb" border="1px solid #e5e7eb" border-radius="10px" padding="20px 24px">
        <mj-text font-size="12px" font-weight="bold" color="#6b7280" padding="0 0 12px" letter-spacing="1px">
          YOUR CREATOR STATS
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🎵 &nbsp;<strong>Total tracks licensed:</strong> 10
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0 0 8px">
          🏆 &nbsp;<strong>Most used genre:</strong> Cinematic
        </mj-text>
        <mj-text font-size="14px" color="#374151" padding="0">
          🎬 &nbsp;<strong>Total projects powered:</strong> 7
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Reward -->
    <mj-section background-color="#fffbeb" padding="0 24px 24px">
      <mj-column border="2px solid #f59e0b" border-radius="10px" padding="24px">
        <mj-text font-size="12px" font-weight="bold" color="#92400e" align="center" padding="0 0 6px" letter-spacing="1px">
          YOUR REWARD
        </mj-text>
        <mj-text font-size="36px" font-weight="bold" color="#b45309" align="center" padding="0 0 4px">
          $15 Credit
        </mj-text>
        <mj-text font-size="13px" color="#92400e" align="center" padding="0">
          Added to your SyncMusic account · No expiry · Use on any track or plan
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="8px 24px 12px">
      <mj-column>
        <mj-button background-color="#b45309" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Use Your $15 Credit
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Motivational Note -->
    <mj-section background-color="#ffffff" padding="8px 24px 28px">
      <mj-column>
        <mj-text font-size="14px" color="#6b7280" align="center" padding="0">
          Keep creating. Your next milestone unlocks at 25 tracks — with an even bigger reward waiting for you.
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
