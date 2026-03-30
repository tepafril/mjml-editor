import type { NodeType } from './node.types'

export const NODE_DEFAULT_PROPS: Record<NodeType, Record<string, string>> = {
  'mj-body': {
    'background-color': '#ffffff',
    'width': '600px',
  },
  'mj-section': {
    'padding': '20px 0',
    'background-color': '',
    'background-url': '',
    'background-position': '',
    'background-position-x': '',
    'background-position-y': '',
    'background-repeat': '',
    'background-size': '',
    'border': '',
    'border-bottom': '',
    'border-left': '',
    'border-right': '',
    'border-top': '',
    'border-radius': '',
    'css-class': '',
    'direction': '',
    'full-width': '',
    'text-align': 'left',
  },
  'mj-column': {
    'background-color': '',
    'border': '',
    'border-bottom': '',
    'border-left': '',
    'border-radius': '',
    'border-right': '',
    'border-top': '',
    'css-class': '',
    'direction': '',
    'inner-background-color': '',
    'inner-border': '',
    'inner-border-bottom': '',
    'inner-border-left': '',
    'inner-border-radius': '',
    'inner-border-right': '',
    'inner-border-top': '',
    'padding': '0px',
    'vertical-align': 'top',
    'width': '',
  },
  'mj-text': {
    'font-size': '13px',
    'color': '#000000',
    'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
    'font-style': '',
    'font-weight': '',
    'line-height': '22px',
    'letter-spacing': '',
    'text-decoration': '',
    'text-transform': '',
    'height': '',
    'padding': '10px 25px',
    'align': 'left',
    'container-background-color': '',
    'css-class': '',
  },
  'mj-heading': {
    'font-size': '24px',
    'color': '#000000',
    'font-weight': 'bold',
    'font-family': '',
    'font-style': '',
    'line-height': '',
    'letter-spacing': '',
    'text-decoration': '',
    'text-transform': '',
    'height': '',
    'padding': '10px 25px',
    'align': 'left',
    'container-background-color': '',
    'css-class': '',
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
    'background-color': '',
    'background-position': '',
    'background-position-x': '',
    'background-position-y': '',
    'background-repeat': 'repeat',
    'background-size': 'auto',
    'background-url': '',
    'border': '',
    'border-bottom': '',
    'border-left': '',
    'border-radius': '',
    'border-right': '',
    'border-top': '',
    'css-class': '',
    'full-width': '',
    'padding': '20px 0',
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
    'font-family': '',
    'padding': '10px 15px',
    'text-decoration': 'none',
    'text-transform': 'uppercase',
  },
  // --- Phase 2 ---
  'mj-group': {
    'background-color': '',
    'css-class': '',
    'direction': 'ltr',
    'vertical-align': 'top',
    'width': '100%',
  },
  'mj-table': {
    'color': '#000000',
    'font-size': '13px',
    'font-family': '',
    'padding': '10px 25px',
    'width': '100%',
    'cellpadding': '0',
    'cellspacing': '0',
  },
  'mj-raw': {},
}

export const NODE_DEFAULT_CONTENT: Partial<Record<NodeType, string>> = {
  'mj-text': 'Enter your text here',
  'mj-heading': 'Heading',
  'mj-button': 'Click me',
  'mj-social-element': 'Share',
  'mj-navbar-link': 'Link',
  'mj-table': '<tr><td style="padding:4px">Cell 1</td><td style="padding:4px">Cell 2</td></tr><tr><td style="padding:4px">Cell 3</td><td style="padding:4px">Cell 4</td></tr>',
  'mj-raw': '<!-- Your HTML here -->',
}

// --- Head Settings ---
export interface GoogleFont {
  name: string
  href: string
}

export interface HtmlAttributeSelector {
  path: string
  attributes: Record<string, string>
}

export interface HeadSettings {
  title: string
  previewText: string
  fonts: GoogleFont[]
  styles: string
  breakpoint: string
  globalAttributes: Record<string, Record<string, string>>
  htmlAttributes: HtmlAttributeSelector[]
}

export function createDefaultHeadSettings(): HeadSettings {
  return {
    title: '',
    previewText: '',
    fonts: [
      { name: 'Arial', href: '' },
    ],
    styles: '',
    breakpoint: '',
    globalAttributes: {},
    htmlAttributes: [],
  }
}
