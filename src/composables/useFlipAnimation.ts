import { ref } from 'vue'

interface FlipSnapshot {
  rects: Map<string, DOMRect>
  movedNodeId: string
  timestamp: number
}

const pendingFlip = ref<FlipSnapshot | null>(null)
const isAnimating = ref(false)
let animationTimer: ReturnType<typeof setTimeout> | null = null

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

  function playFlipAnimation(doc: Document, onComplete?: () => void) {
    const flip = pendingFlip.value
    if (!flip) return

    // Expire stale snapshots
    if (Date.now() - flip.timestamp > STALE_THRESHOLD) {
      pendingFlip.value = null
      return
    }

    // Clear any previous animation timer
    if (animationTimer) {
      clearTimeout(animationTimer)
      animationTimer = null
    }

    isAnimating.value = true

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

    pendingFlip.value = null

    // Signal animation end after DURATION, then fire callback
    animationTimer = setTimeout(() => {
      isAnimating.value = false
      animationTimer = null
      onComplete?.()
    }, DURATION)
  }

  function cancelFlip() {
    pendingFlip.value = null
    if (animationTimer) {
      clearTimeout(animationTimer)
      animationTimer = null
    }
    isAnimating.value = false
  }

  return { captureBeforeMove, playFlipAnimation, cancelFlip, isAnimating }
}
