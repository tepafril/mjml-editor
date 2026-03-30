import { nanoid } from 'nanoid'
import type { EditorNode, NodeType } from '@/types/node.types'
import { NODE_DEFAULT_PROPS, NODE_DEFAULT_CONTENT } from '@/types/mjml.types'

export function createNode(type: NodeType, overrides?: Partial<EditorNode>): EditorNode {
  const node: EditorNode = {
    id: nanoid(),
    type,
    props: { ...NODE_DEFAULT_PROPS[type] },
    children: [],
    ...overrides,
  }

  if (NODE_DEFAULT_CONTENT[type] && !node.content) {
    node.content = NODE_DEFAULT_CONTENT[type]
  }

  // Auto-add children for structural/compound nodes
  if (node.children.length === 0) {
    switch (type) {
      case 'mj-section':
        node.children = [createNode('mj-column')]
        break
      case 'mj-wrapper':
        node.children = [createNode('mj-section')]
        break
      case 'mj-hero':
        node.children = [
          createNode('mj-text', { content: 'Hero Title', props: { ...NODE_DEFAULT_PROPS['mj-heading'], color: '#ffffff' } }),
          createNode('mj-button', { content: 'Call to Action' }),
        ]
        break
      case 'mj-group':
        node.children = [createNode('mj-column'), createNode('mj-column')]
        break
      case 'mj-social':
        node.children = [
          createNode('mj-social-element', { props: { ...NODE_DEFAULT_PROPS['mj-social-element'], name: 'facebook' }, content: 'Facebook' }),
          createNode('mj-social-element', { props: { ...NODE_DEFAULT_PROPS['mj-social-element'], name: 'twitter' }, content: 'Twitter' }),
          createNode('mj-social-element', { props: { ...NODE_DEFAULT_PROPS['mj-social-element'], name: 'instagram' }, content: 'Instagram' }),
        ]
        break
      case 'mj-navbar':
        node.children = [
          createNode('mj-navbar-link', { content: 'Home' }),
          createNode('mj-navbar-link', { content: 'About' }),
          createNode('mj-navbar-link', { content: 'Contact' }),
        ]
        break
    }
  }

  return node
}

export function createDefaultTree(): EditorNode {
  return createNode('mj-body', {
    children: [
      createNode('mj-section', {
        children: [
          createNode('mj-column', {
            children: [
              createNode('mj-heading', { content: 'Welcome to SyncMusic' }),
              createNode('mj-text', { content: 'Start building your email by dragging components from the left panel.' }),
              createNode('mj-button', { content: 'Get Started' }),
            ],
          }),
        ],
      }),
    ],
  })
}
