import { Maximize2, Pause, Play, ShieldCheck } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const reduceMotion = useReducedMotion()
  const [playing, setPlaying] = useState(!reduceMotion)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduceMotion) { video.pause(); setPlaying(false); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) void video.play().catch(() => setPlaying(false))
      else video.pause()
    }, { threshold: 0.2 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduceMotion])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { userPaused.current = false; void video.play() } else { userPaused.current = true; video.pause() }
  }

  const openFullscreen = () => {
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    if (!video) return
    if (video.requestFullscreen) void video.requestFullscreen()
    else video.webkitEnterFullscreen?.()
  }

  return <div className="hero-video-shell">
    <div className={`hero-video-frame ${ready ? 'is-ready' : ''}`}>
      <video ref={videoRef} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster="milkdoordelivery.jpeg"
        onCanPlay={() => setReady(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        aria-label="KS Farms brand film">
        <source src="ksfarmswebsitevideo.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
    <div className="hero-video-meta">
      <div className="hero-video-promise"><ShieldCheck size={20} /><span><small>KS FARMS QUALITY PROMISE</small><strong>Pure A1 milk • Farm fresh • Carefully handled</strong></span></div>
      <div className="hero-video-actions">
        <button className="hero-video-control" onClick={togglePlayback} aria-label={playing ? 'Pause KS Farms video' : 'Play KS Farms video'}>{playing ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}<span>{playing ? 'Pause' : 'Play'}</span></button>
        <button className="hero-video-control" onClick={openFullscreen} aria-label="Watch KS Farms video fullscreen"><Maximize2 size={15} /><span>Fullscreen</span></button>
      </div>
    </div>
  </div>
}
