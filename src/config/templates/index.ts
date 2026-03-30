import type { EmailTemplate, TemplateCategory } from '@/types/template.types'
import { newsletterBasic } from './newsletter-basic'
import { promoSale } from './promo-sale'
import { welcomeEmail } from './welcome-email'
import { passwordReset } from './password-reset'
import { orderConfirmation } from './order-confirmation'
import { eventAnnouncement } from './event-announcement'
import { minimalPlain } from './minimal-plain'
import { productLaunch } from './product-launch'
import { welcomeNewAccount } from './welcome-new-account'
import { welcomeConfirmEmail } from './welcome-confirm-email'
import { welcomeTrialStart } from './welcome-trial-start'
import { onboardingStep1 } from './onboarding-step-1'
import { onboardingStep2 } from './onboarding-step-2'
import { onboardingStep3 } from './onboarding-step-3'
import { welcomeFilmmaker } from './welcome-filmmaker'
import { welcomeGameDev } from './welcome-game-dev'
import { purchaseConfirmationStandard } from './purchase-confirmation-standard'
import { purchaseConfirmationExtended } from './purchase-confirmation-extended'
import { purchaseConfirmationExclusive } from './purchase-confirmation-exclusive'
import { invoiceReceipt } from './invoice-receipt'
import { subscriptionRenewal } from './subscription-renewal'
import { licenseBundleDelivery } from './license-bundle-delivery'
import { subscriptionUpgrade } from './subscription-upgrade'
import { subscriptionDowngrade } from './subscription-downgrade'
import { paymentFailed } from './payment-failed'
import { refundProcessed } from './refund-processed'
import { promoBlackFriday } from './promo-black-friday'
import { promoFlashSale } from './promo-flash-sale'
import { promoNewYear } from './promo-new-year'
import { promoReferral } from './promo-referral'
import { promoAnnualPlanNudge } from './promo-annual-plan-nudge'
import { promoExclusiveSpotlight } from './promo-exclusive-spotlight'
import { promoPodcastBundle } from './promo-podcast-bundle'
import { promoYoutubePack } from './promo-youtube-pack'
import { promoStemsLaunch } from './promo-stems-launch'
import { discoveryNewTracksWeekly } from './discovery-new-tracks-weekly'
import { discoveryArtistSpotlight } from './discovery-artist-spotlight'
import { discoveryCuratedPlaylist } from './discovery-curated-playlist'
import { discoveryCinematicGenre } from './discovery-cinematic-genre'
import { discoveryTrending } from './discovery-trending'
import { discoverySummerSounds } from './discovery-summer-sounds'
import { discoveryLofiGenre } from './discovery-lofi-genre'
import { discoveryFocusMood } from './discovery-focus-mood'
import { accountPaymentExpiring } from './account-payment-expiring'
import { accountSubscriptionExpiring } from './account-subscription-expiring'
import { accountPasswordReset } from './account-password-reset'
import { accountDownloadLimit } from './account-download-limit'
import { accountAnnualSummary } from './account-annual-summary'
import { accountProfileCompletion } from './account-profile-completion'
import { reengagementInactive } from './reengagement-inactive'
import { reengagementAbandonedCart } from './reengagement-abandoned-cart'
import { reengagementTrialExpired } from './reengagement-trial-expired'
import { reengagementWinBack } from './reengagement-win-back'
import { retentionLoyaltyReward } from './retention-loyalty-reward'
import { retentionFeedbackSurvey } from './retention-feedback-survey'
import { notificationTrackRetired } from './notification-track-retired'
import { notificationContentIdResolved } from './notification-content-id-resolved'
import { notificationNewLicenseTerms } from './notification-new-license-terms'

export const TEMPLATES: EmailTemplate[] = [
  newsletterBasic,
  promoSale,
  welcomeEmail,
  passwordReset,
  orderConfirmation,
  eventAnnouncement,
  minimalPlain,
  productLaunch,
  welcomeNewAccount,
  welcomeConfirmEmail,
  welcomeTrialStart,
  onboardingStep1,
  onboardingStep2,
  onboardingStep3,
  welcomeFilmmaker,
  welcomeGameDev,
  purchaseConfirmationStandard,
  purchaseConfirmationExtended,
  purchaseConfirmationExclusive,
  invoiceReceipt,
  subscriptionRenewal,
  licenseBundleDelivery,
  subscriptionUpgrade,
  subscriptionDowngrade,
  paymentFailed,
  refundProcessed,
  promoBlackFriday,
  promoFlashSale,
  promoNewYear,
  promoReferral,
  promoAnnualPlanNudge,
  promoExclusiveSpotlight,
  promoPodcastBundle,
  promoYoutubePack,
  promoStemsLaunch,
  discoveryNewTracksWeekly,
  discoveryArtistSpotlight,
  discoveryCuratedPlaylist,
  discoveryCinematicGenre,
  discoveryTrending,
  discoverySummerSounds,
  discoveryLofiGenre,
  discoveryFocusMood,
  accountPaymentExpiring,
  accountSubscriptionExpiring,
  accountPasswordReset,
  accountDownloadLimit,
  accountAnnualSummary,
  accountProfileCompletion,
  reengagementInactive,
  reengagementAbandonedCart,
  reengagementTrialExpired,
  reengagementWinBack,
  retentionLoyaltyReward,
  retentionFeedbackSurvey,
  notificationTrackRetired,
  notificationContentIdResolved,
  notificationNewLicenseTerms,
]

export const TEMPLATE_CATEGORIES: Array<TemplateCategory | 'All'> = [
  'All',
  'Newsletter',
  'Promotional',
  'Transactional',
  'Welcome',
  'Announcement',
  'Minimal',
  'Retention',
  'Discovery',
  'Account',
]
