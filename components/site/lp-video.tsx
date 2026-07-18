"use client"

import { useRef, useState } from "react"
import Image from "next/image"

/**
 * LpVideo — vídeo institucional atrás de um clique.
 *
 * O arquivo tem 31 MB. Numa página de Ads, carregá-lo de saída atrasaria a dobra
 * e encareceria o CPL, então só o poster (263 KB) entra no carregamento inicial:
 * o <video> nasce sem `src` e a fonte só é anexada no play. Quem não clica não
 * baixa nada além da imagem.
 */
export function LpVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ativo, setAtivo] = useState(false)

  const tocar = () => {
    const v = videoRef.current
    if (!v) return

    // Anexa a fonte só agora — antes disso o vídeo não existe para a rede.
    if (!v.querySelector("source")) {
      const s = document.createElement("source")
      s.src = "/media/institucional.mp4"
      s.type = "video/mp4"
      v.appendChild(s)
      v.load()
    }

    setAtivo(true)
    void v.play().catch(() => {
      // Autoplay negado: o vídeo fica visível com os controles nativos.
    })

    window.dataLayer?.push({
      event: "video_play",
      video_title: "institucional",
      cta_location: "lp_video",
    })
  }

  return (
    <div className={`lp-video${ativo ? " is-ativo" : ""}`}>
      <video
        ref={videoRef}
        className="lp-video-el"
        controls={ativo}
        playsInline
        preload="none"
        poster="/media/institucional-poster.jpg"
        aria-label="Vídeo institucional da S&S Log"
      />

      {!ativo ? (
        <button type="button" className="lp-video-capa" onClick={tocar}>
          <Image
            src="/media/institucional-poster.jpg"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
          <span className="lp-video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="lp-video-label">
            Ver o vídeo institucional
            <small>1 min · a operação por dentro</small>
          </span>
        </button>
      ) : null}
    </div>
  )
}
