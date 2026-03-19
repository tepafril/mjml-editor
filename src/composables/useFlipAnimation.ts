import { ref } from 'vue'

interface FlipSnapshot {
  rects: Map<string, DOMRect>
  movedNodeId: string
  timestamp: number
}

const pendingFlip = ref<FlipSnapshot | null>(null)

const DURATION = 300
const EASING = 'cubic-bezier(0.2, 0, 0.2, 1)'
const STALE_THRESHOLD = 2000

function extractNodeId(el: Element): string | null {
  const match = el.className.match(/node-([^\s"]+)/)
  return match ? match[1] : null
}

export function useFlipAnimation() {
  function captureBeforeMove(doc: Document, movedNodeId: string) {
    const rects = new Map<string, DOMRect>()
    const elements = doc.querySelectorAll('[class*="node-"]')

    elements.forEach(el => {
      const id = extractNodeId(el)
      if (id) {
        rects.set(id, el.getBoundingClientRect())
      }
    })

    pendingFlip.value = { rects, movedNodeId, timestamp: Date.now() }
  }

  function playFlipAnimation(doc: Document) {
    const flip = pendingFlip.value
    if (!flip) return

    // Expire stale snapshots
    if (Date.now() - flip.timestamp > STALE_THRESHOLD) {
      pendingFlip.value = null
      return
    }

    const elements = doc.querySelectorAll('[class*="node-"]')

    elements.forEach(el => {
      const nodeId = extractNodeId(el)
      if (!nodeId) return

      const oldRect = flip.rects.get(nodeId)
      if (!oldRect) return

      const newRect = el.getBoundingClientRect()
      const deltaX = oldRect.left - newRect.left
      const deltaY = oldRect.top - newRect.top

      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return

      ;(el as HTMLElement).animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: 'translate(0, 0)' },
        ],
        { duration: DURATION, easing: EASING },
      )
    })

    // Highlight the moved node
    const movedEl = doc.querySelector(`.node-${flip.movedNodeId}`) as HTMLElement | null
    if (movedEl) {
      movedEl.animate(
        [
          { outline: '3px solid rgba(99, 102, 241, 0.5)', outlineOffset: '0px' },
          { outline: '3px solid rgba(99, 102, 241, 0)', outlineOffset: '4px' },
        ],
        { duration: 600, easing: 'ease-out' },
      )
    }

    pendingFlip.value = null
  }

  function cancelFlip() {
    pendingFlip.value = null
  }

  return { captureBeforeMove, playFlipAnimation, cancelFlip }
}
