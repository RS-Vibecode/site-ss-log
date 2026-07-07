"use client"

import { useEffect } from "react"

/**
 * ScrollEffects — reveal-on-scroll via IntersectionObserver (1x por elemento) +
 * play/pause das bandas de vídeo no viewport. Portado do protótipo.
 * Respeita prefers-reduced-motion: revela tudo de imediato, sem animar.
 * Renderiza null.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    // --- Hero: respeita reduced-motion (pausa o vídeo → fica o poster estático) ---
    if (reduce) {
      const heroVideo =
        document.querySelector<HTMLVideoElement>("[data-hero-video]")
      if (heroVideo) {
        heroVideo.removeAttribute("autoplay")
        heroVideo.pause()
      }
    }

    // --- Reveal on scroll ---
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    if (reduce || !("IntersectionObserver" in window) || !els.length) {
      els.forEach((el) => el.classList.add("is-visible"))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible")
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
      )
      els.forEach((el) => io.observe(el))
    }

    // --- Video bands play/pause on viewport (placeholders sem <video> por ora) ---
    const bands = Array.from(
      document.querySelectorAll<HTMLElement>("[data-video-band]"),
    )
    let bandIo: IntersectionObserver | undefined
    if (bands.length && "IntersectionObserver" in window) {
      bandIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const band = e.target as HTMLElement
            const video = band.querySelector("video")
            if (e.isIntersecting) {
              band.classList.add("is-playing")
              if (video && video.paused) video.play().catch(() => {})
            } else {
              band.classList.remove("is-playing")
              if (video && !video.paused) video.pause()
            }
          })
        },
        { threshold: 0.35 },
      )
      bands.forEach((b) => bandIo!.observe(b))
    }

    return () => bandIo?.disconnect()
  }, [])

  return null
}
