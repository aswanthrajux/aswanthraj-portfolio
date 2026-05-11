import { useRef, useState, useCallback, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface VideoPlayerProps {
  src: string
  poster?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  loop?: boolean
  initialMuted?: boolean
  videoTitle?: string
  section?: string
  contentType?: string
}

const SPEEDS = [0.5, 1, 1.25, 1.5, 2]

function fmt(secs: number) {
  if (!isFinite(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VideoPlayer({
  src,
  poster,
  style,
  autoPlay = false,
  loop = false,
  initialMuted = false,
  videoTitle,
  section,
  contentType,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekBarRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const thumbnailClickFiredRef = useRef(false)
  const playFiredRef = useRef(false)

  const [playing, setPlaying] = useState(autoPlay)
  const [muted, setMuted] = useState(initialMuted)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [speedIdx, setSpeedIdx] = useState(1)

  // ─── Auto-hide ────────────────────────────────────────────────────────────

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000)
  }, [])

  const revealControls = useCallback(() => {
    setControlsVisible(true)
    const v = videoRef.current
    if (v && !v.paused) scheduleHide()
  }, [scheduleHide])

  useEffect(() => {
    if (autoPlay) scheduleHide()
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current) }
  }, [autoPlay, scheduleHide])

  // ─── Play / Pause ─────────────────────────────────────────────────────────

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      if (!thumbnailClickFiredRef.current) {
        thumbnailClickFiredRef.current = true
        trackEvent('video_thumbnail_click', {
          video_title: videoTitle ?? src,
          video_id_or_url: src,
          page_path: window.location.pathname,
          section: section ?? 'unknown',
          content_type: contentType ?? 'video',
        })
      }
      v.play()
      setPlaying(true)
      scheduleHide()
    } else {
      v.pause()
      setPlaying(false)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      setControlsVisible(true)
    }
  }, [scheduleHide, videoTitle, src, section, contentType])

  // Keep state in sync with native play/pause events (e.g. OS media keys)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlay = () => {
      setPlaying(true)
      scheduleHide()
      if (!playFiredRef.current) {
        playFiredRef.current = true
        trackEvent('video_play', {
          video_title: videoTitle ?? src,
          video_id_or_url: src,
          page_path: window.location.pathname,
          section: section ?? 'unknown',
          content_type: contentType ?? 'video',
        })
      }
    }
    const onPause = () => { setPlaying(false); setControlsVisible(true) }
    const onEnded = () => { if (!loop) { setPlaying(false); setControlsVisible(true) } }
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
    }
  }, [loop, scheduleHide, videoTitle, src, section, contentType])

  // ─── Volume ───────────────────────────────────────────────────────────────

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const onVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    const val = parseFloat(e.target.value)
    v.volume = val
    v.muted = val === 0
    setVolume(val)
    setMuted(val === 0)
  }, [])

  // ─── Seek ─────────────────────────────────────────────────────────────────

  const seekTo = useCallback((clientX: number) => {
    const bar = seekBarRef.current
    const v = videoRef.current
    if (!bar || !v || !v.duration) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    v.currentTime = pct * v.duration
    setProgress(pct)
    setCurrentTime(pct * v.duration)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    seekTo(e.clientX)
  }, [seekTo])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    seekTo(e.clientX)
  }, [dragging, seekTo])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDragging(false)
    seekTo(e.clientX)
  }, [seekTo])

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v || dragging) return
    const ct = v.currentTime
    const d = v.duration || 0
    setCurrentTime(ct)
    setProgress(d ? ct / d : 0)
  }, [dragging])

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration)
    v.volume = volume
    v.muted = initialMuted
  }, [volume, initialMuted])

  // ─── Speed ────────────────────────────────────────────────────────────────

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length
    const v = videoRef.current
    if (v) v.playbackRate = SPEEDS[next]
    setSpeedIdx(next)
  }, [speedIdx])

  // ─── Fullscreen ───────────────────────────────────────────────────────────

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) el.requestFullscreen?.()
    else document.exitFullscreen?.()
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // ─── Picture in Picture ───────────────────────────────────────────────────

  const hasPiP = typeof document !== 'undefined' && 'pictureInPictureEnabled' in document

  const togglePiP = useCallback(async () => {
    const v = videoRef.current
    if (!v) return
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture()
      else await v.requestPictureInPicture?.()
    } catch {}
  }, [])

  // ─── Styles ───────────────────────────────────────────────────────────────

  const isPortrait = /^9\s*\/\s*16/.test(String(style?.aspectRatio ?? ''))

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden',
    cursor: controlsVisible ? 'default' : 'none',
    ...style,
    // Fullscreen overrides
    ...(fullscreen ? {
      borderRadius: 0,
      border: 'none',
      ...(isPortrait ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        aspectRatio: 'unset',
        maxWidth: 'unset',
      } : {}),
    } : {}),
  }

  const volumeLevel = muted || volume === 0 ? 'mute' : volume < 0.5 ? 'low' : 'high'

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseMove={revealControls}
      onMouseLeave={() => { if (playing) scheduleHide() }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline
        autoPlay={autoPlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload noremoteplayback"
        onClick={togglePlay}
        style={
          fullscreen && isPortrait
            ? {
                width: 'auto',
                height: '100%',
                maxWidth: '100%',
                display: 'block',
                aspectRatio: '9 / 16',
                objectFit: 'contain',
                cursor: 'inherit',
              }
            : {
                width: '100%',
                display: 'block',
                aspectRatio: style?.aspectRatio ?? '16 / 9',
                objectFit: 'cover',
                cursor: 'inherit',
              }
        }
      />

      {/* Controls overlay — fades out after inactivity */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '36px 14px 14px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          opacity: controlsVisible ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: controlsVisible ? 'auto' : 'none',
        }}
      >
        {/* Seekbar */}
        <div
          ref={seekBarRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ position: 'relative', width: '100%', height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${progress * 100}%`, background: '#fff', borderRadius: '2px',
              transition: dragging ? 'none' : 'width 0.1s linear',
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: `${progress * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '11px', height: '11px', borderRadius: '50%',
              background: '#fff', boxShadow: '0 0 4px rgba(0,0,0,0.5)',
            }} />
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Play/Pause */}
          <IconBtn onClick={togglePlay} label={playing ? 'Pause' : 'Play'}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </IconBtn>

          {/* Volume */}
          <IconBtn onClick={toggleMute} label={muted ? 'Unmute' : 'Mute'}>
            {volumeLevel === 'mute' ? <MuteIcon /> : volumeLevel === 'low' ? <VolumeLowIcon /> : <VolumeHighIcon />}
          </IconBtn>
          <input
            type="range"
            min={0} max={1} step={0.05}
            value={muted ? 0 : volume}
            onChange={onVolumeChange}
            aria-label="Volume"
            style={{ width: '60px', accentColor: '#fff', cursor: 'pointer', flexShrink: 0 }}
          />

          {/* Time */}
          <span style={{
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 400,
            letterSpacing: '0.03em',
            userSelect: 'none',
            flexShrink: 0,
            marginLeft: '2px',
          }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div style={{ flex: 1 }} />

          {/* Speed */}
          <button
            onClick={cycleSpeed}
            aria-label="Playback speed"
            style={{
              background: 'none', border: 'none', padding: '0 2px',
              cursor: 'pointer', color: 'rgba(255,255,255,0.85)',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.72rem', fontWeight: 500, flexShrink: 0,
            }}
          >
            {SPEEDS[speedIdx]}×
          </button>

          {/* PiP */}
          {hasPiP && (
            <IconBtn onClick={togglePiP} label="Picture in picture">
              <PiPIcon />
            </IconBtn>
          )}

          {/* Fullscreen */}
          <IconBtn onClick={toggleFullscreen} label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            {fullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </IconBtn>
        </div>
      </div>
    </div>
  )
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function IconBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        background: 'none', border: 'none', padding: 0,
        cursor: 'pointer', color: '#fff',
        display: 'flex', alignItems: 'center', flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
}

function PauseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
}

function VolumeHighIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  )
}

function VolumeLowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.46 1.46L20.46 18l-16-16L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  )
}

function FullscreenIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
}

function ExitFullscreenIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
}

function PiPIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z" />
    </svg>
  )
}
