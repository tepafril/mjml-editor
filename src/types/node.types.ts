export type NodeType =
  | 'mj-body'
  | 'mj-section'
  | 'mj-column'
  | 'mj-text'
  | 'mj-heading'
  | 'mj-button'
  | 'mj-image'
  | 'mj-divider'
  | 'mj-spacer'
  | 'mj-avatar'
  // Phase 1
  | 'mj-wrapper'
  | 'mj-hero'
  | 'mj-social'
  | 'mj-social-element'
  | 'mj-navbar'
  | 'mj-navbar-link'
  // Phase 2
  | 'mj-group'
  | 'mj-table'
  | 'mj-raw'
  // Phase 4
  | 'mj-accordion'
  | 'mj-accordion-element'
  | 'mj-accordion-title'
  | 'mj-accordion-text'

export interface TemplateLogic {
  foreach?: string
  foreachAs?: string
  if?: string
}

export interface EditorNode {
  id: string
  type: NodeType
  props: Record<string, string>
  content?: string
  children: EditorNode[]
  locked?: boolean
  hidden?: boolean
  label?: string
  templateLogic?: TemplateLogic
}

export const LEAF_TYPES: NodeType[] = [
  'mj-text',
  'mj-heading',
  'mj-button',
  'mj-image',
  'mj-divider',
  'mj-spacer',
  'mj-avatar',
  'mj-social-element',
  'mj-navbar-link',
  'mj-table',
  'mj-raw',
  'mj-accordion-title',
  'mj-accordion-text',
]

export const ALLOWED_CHILDREN: Record<NodeType, NodeType[]> = {
  'mj-body': ['mj-section', 'mj-wrapper', 'mj-hero', 'mj-raw'],
  'mj-wrapper': ['mj-section'],
  'mj-section': ['mj-column', 'mj-group'],
  'mj-group': ['mj-column'],
  'mj-column': [
    'mj-text', 'mj-heading', 'mj-button', 'mj-image', 'mj-avatar',
    'mj-divider', 'mj-spacer', 'mj-social', 'mj-navbar', 'mj-table',
    'mj-raw', 'mj-accordion',
  ],
  'mj-hero': ['mj-text', 'mj-heading', 'mj-button', 'mj-image'],
  'mj-social': ['mj-social-element'],
  'mj-navbar': ['mj-navbar-link'],
  'mj-accordion': ['mj-accordion-element'],
  'mj-accordion-element': ['mj-accordion-title', 'mj-accordion-text'],
  // Leaf types
  'mj-text': [],
  'mj-heading': [],
  'mj-button': [],
  'mj-image': [],
  'mj-divider': [],
  'mj-spacer': [],
  'mj-avatar': [],
  'mj-social-element': [],
  'mj-navbar-link': [],
  'mj-table': [],
  'mj-raw': [],
  'mj-accordion-title': [],
  'mj-accordion-text': [],
}
