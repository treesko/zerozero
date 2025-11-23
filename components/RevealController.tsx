"use client"
import React from 'react'

export function RevealController() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          obs.unobserve(e.target)
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return null
}

