import type { NodeType } from './node.types'

export const NODE_DEFAULT_PROPS: Record<NodeType, Record<string, string>> = {
  'mj-body': {
    'background-color': '#ffffff',
    'width': '600px',
  },
  'mj-section': {
    'padding': '20px 0',
    'background-color': '',
    'text-align': 'left',
  },
  'mj-column': {
    'padding': '0px',
    'background-color': '',
    'vertical-align': 'top',
  },
  'mj-text': {
    'font-size': '14px',
    'color': '#000000',
    'font-family': 'Arial, sans-serif',
    'line-height': '1.5',
    'padding': '10px 25px',
    'align': 'left',
  },
  'mj-heading': {
    'font-size': '24px',
    'color': '#000000',
    'font-weight': 'bold',
    'font-family': 'Arial, sans-serif',
    'padding': '10px 25px',
    'align': 'left',
  },
  'mj-button': {
    'background-color': '#4A90D9',
    'color': '#ffffff',
    'font-size': '14px',
    'padding': '10px 25px',
    'border-radius': '4px',
    'align': 'center',
    'href': '#',
    'width': '',
  },
  'mj-image': {
    'src': 'https://via.placeholder.com/600x200',
    'width': '600px',
    'alt': '',
    'align': 'center',
    'padding': '10px 25px',
  },
  'mj-divider': {
    'border-color': '#cccccc',
    'border-style': 'solid',
    'border-width': '1px',
    'padding': '10px 25px',
  },
  'mj-spacer': {
    'height': '20px',
  },
  'mj-avatar': {
    'src': 'https://via.placeholder.com/80',
    'width': '80px',
    'border-radius': '50%',
    'align': 'center',
    'padding': '10px 25px',
  },
  // --- Phase 1 ---
  'mj-wrapper': {
    'padding': '20px 0',
    'background-color': '',
    'background-url': '',
    'background-repeat': 'repeat',
    'background-size': 'auto',
    'full-width': 'full-width',
    'text-align': 'center',
  },
  'mj-hero': {
    'mode': 'fixed-height',
    'height': '400px',
    'background-height': '400px',
    'background-url': 'https://via.placeholder.com/600x400',
    'background-color': '#2f2f2f',
    'background-position': 'center center',
    'padding': '100px 0px',
    'vertical-align': 'middle',
    'width': '600px',
  },
  'mj-social': {
    'font-size': '15px',
    'icon-size': '30px',
    'mode': 'horizontal',
    'align': 'center',
    'padding': '10px 25px',
    'icon-padding': '4px',
    'text-padding': '4px 4px 4px 0',
  },
  'mj-social-element': {
    'name': 'facebook',
    'href': '#',
    'background-color': '',
    'border-radius': '3px',
    'icon-size': '',
  },
  'mj-navbar': {
    'align': 'center',
    'hamburger': 'hamburger',
    'ico-color': '#000000',
    'ico-font-size': '30px',
    'ico-padding': '10px',
  },
  'mj-navbar-link': {
    'href': '#',
    'color': '#000000',
    'font-size': '13px',
    'font-family': 'Arial, sans-serif',
    'padding': '10px 15px',
    'text-decoration': 'none',
    'text-transform': 'uppercase',
  },
  // --- Phase 2 ---
  'mj-group': {
    'width': '100%',
    'direction': 'ltr',
    'background-color': '',
    'vertical-align': 'top',
  },
  'mj-table': {
    'color': '#000000',
    'font-size': '13px',
    'font-family': 'Arial, sans-serif',
    'padding': '10px 25px',
    'width': '100%',
    'cellpadding': '0',
    'cellspacing': '0',
  },
  'mj-raw': {},
  // --- Phase 4 ---
  'mj-accordion': {
    'border': '1px solid #e0e0e0',
    'padding': '10px 25px',
    'icon-position': 'right',
    'icon-align': 'middle',
    'icon-height': '32px',
    'icon-width': '32px',
  },
  'mj-accordion-element': {
    'background-color': '',
    'font-family': 'Arial, sans-serif',
  },
  'mj-accordion-title': {
    'color': '#000000',
    'font-size': '16px',
    'font-family': 'Arial, sans-serif',
    'padding': '16px',
    'background-color': '#f0f0f0',
  },
  'mj-accordion-text': {
    'color': '#333333',
    'font-size': '14px',
    'font-family': 'Arial, sans-serif',
    'padding': '16px',
    'background-color': '#ffffff',
  },
}

export const NODE_DEFAULT_CONTENT: Partial<Record<NodeType, string>> = {
  'mj-text': 'Enter your text here',
  'mj-heading': 'Heading',
  'mj-button': 'Click me',
  'mj-social-element': 'Share',
  'mj-navbar-link': 'Link',
  'mj-table': '<tr><td style="padding:4px">Cell 1</td><td style="padding:4px">Cell 2</td></tr><tr><td style="padding:4px">Cell 3</td><td style="padding:4px">Cell 4</td></tr>',
  'mj-raw': '<!-- Your HTML here -->',
  'mj-accordion-title': 'Question?',
  'mj-accordion-text': 'Answer goes here...',
}

// --- Head Settings ---
export interface GoogleFont {
  name: string
  href: string
}

export interface HeadSettings {
  title: string
  previewText: string
  fonts: GoogleFont[]
  styles: string
  breakpoint: string
  globalAttributes: Record<string, Record<string, string>>
}

export function createDefaultHeadSettings(): HeadSettings {
  return {
    title: '',
    previewText: '',
    fonts: [],
    styles: '',
    breakpoint: '',
    globalAttributes: {},
  }
}
