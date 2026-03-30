export type TemplateCategory =
  | 'Newsletter'
  | 'Promotional'
  | 'Transactional'
  | 'Welcome'
  | 'Announcement'
  | 'Minimal'
  | 'Retention'
  | 'Discovery'
  | 'Account'

export interface EmailTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  mjml: string
}
