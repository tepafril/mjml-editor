import type { EmailTemplate } from '@/types/template.types'

export const retentionFeedbackSurvey: EmailTemplate = {
  id: 'retention-feedback-survey',
  name: 'How Are We Doing? (Quick 2-Min Survey)',
  description: 'Post-purchase feedback survey 7 days after a license purchase.',
  category: 'Retention',
  mjml: `<mjml>
  <mj-head>
    <mj-title>How Are We Doing? Share Your Feedback</mj-title>
    <mj-preview>Help us improve SyncMusic — takes 2 minutes and you could win $100 in account credit.</mj-preview>
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

    <!-- Intro -->
    <mj-section background-color="#ffffff" padding="32px 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 8px">
          How are we doing?
        </mj-text>
        <mj-text font-size="15px" color="#6b7280" align="center" padding="0">
          You licensed a track 7 days ago — we'd love to know about your experience. It takes just 2 minutes and your feedback directly shapes what we build next.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- NPS Question -->
    <mj-section background-color="#ffffff" padding="24px 24px 8px">
      <mj-column>
        <mj-text font-size="15px" font-weight="bold" color="#111827" align="center" padding="0 0 16px">
          How likely are you to recommend SyncMusic to a colleague or friend?
        </mj-text>
        <mj-text font-size="11px" color="#9ca3af" align="center" padding="0 0 12px">
          0 = Not at all likely &nbsp;&nbsp;·&nbsp;&nbsp; 10 = Extremely likely
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- NPS Scale Row 1: 0–5 -->
    <mj-section background-color="#ffffff" padding="0 24px 4px">
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">0</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">1</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">2</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">3</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">4</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">5</mj-button>
      </mj-column>
    </mj-section>

    <!-- NPS Scale Row 2: 6–10 -->
    <mj-section background-color="#ffffff" padding="0 24px 8px">
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">6</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">7</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">8</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#f3f4f6" color="#374151" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">9</mj-button>
      </mj-column>
      <mj-column padding="2px">
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="13px" font-weight="bold" border-radius="6px" href="#" inner-padding="10px 0" width="100%">10</mj-button>
      </mj-column>
    </mj-section>

    <!-- Full Survey Link -->
    <mj-section background-color="#ffffff" padding="8px 24px 16px">
      <mj-column>
        <mj-text font-size="13px" color="#6b7280" align="center" padding="0">
          Or <a href="#" style="color: #4f46e5; text-decoration: underline;">click here to take the full 2-minute survey</a> with additional questions about your experience.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Credit Draw Offer -->
    <mj-section background-color="#f5f3ff" padding="0 24px 24px">
      <mj-column border="1px solid #c4b5fd" border-radius="10px" padding="20px 24px">
        <mj-text font-size="13px" font-weight="bold" color="#4f46e5" padding="0 0 6px" align="center">
          🎁 Complete the survey and be entered to win
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#111827" align="center" padding="0 0 6px">
          $100 Account Credit
        </mj-text>
        <mj-text font-size="12px" color="#6b7280" align="center" padding="0">
          One winner drawn monthly from all completed survey responses.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA -->
    <mj-section background-color="#ffffff" padding="20px 24px 28px">
      <mj-column>
        <mj-button background-color="#4f46e5" color="#ffffff" font-size="15px" font-weight="bold" border-radius="8px" href="#" inner-padding="14px 32px" align="center">
          Share My Feedback
        </mj-button>
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
