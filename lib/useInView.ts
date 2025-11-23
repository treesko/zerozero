import { useEffect, useRef, useState } from 'react'

// Simple IntersectionObserver hook to toggle reveal animations
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px', ...(options || {}) }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}

