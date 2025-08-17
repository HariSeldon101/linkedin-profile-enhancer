"use client"

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0

    // Wave parameters - enhanced visibility for home page (+10% more)
    const waves = [
      {
        amplitude: 200,
        wavelength: 0.008,
        frequency: 0.015,
        offset: -100,
        colors: [
          { r: 147, g: 51, b: 234, a: 0.95 }, // Purple - very prominent
          { r: 59, g: 130, b: 246, a: 0.75 }  // Blue - very prominent
        ]
      },
      {
        amplitude: 250,
        wavelength: 0.006,
        frequency: 0.01,
        offset: 0,
        colors: [
          { r: 59, g: 130, b: 246, a: 0.85 },  // Blue - very prominent
          { r: 147, g: 51, b: 234, a: 0.65 }   // Purple - very prominent
        ]
      },
      {
        amplitude: 160,
        wavelength: 0.01,
        frequency: 0.018,
        offset: 100,
        colors: [
          { r: 236, g: 72, b: 153, a: 0.75 },  // Pink - very prominent
          { r: 99, g: 102, b: 241, a: 0.55 }   // Indigo - very prominent
        ]
      }
    ]

    function drawWave(wave: typeof waves[0], index: number) {
      if (!ctx || !canvas) return

      const points: { x: number; y: number }[] = []
      
      // Calculate wave points
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = 
          canvas.height / 2 +
          wave.offset +
          wave.amplitude * Math.sin(x * wave.wavelength + time * wave.frequency) +
          wave.amplitude * 0.5 * Math.sin(x * wave.wavelength * 2 + time * wave.frequency * 0.5) +
          Math.sin(x * 0.003 + time * 0.01) * 50

        points.push({ x, y })
      }

      // Draw the wave with gradient
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      
      // Create smooth curve through points
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      
      // Complete the shape
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      // Create vibrant gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `rgba(${wave.colors[0].r}, ${wave.colors[0].g}, ${wave.colors[0].b}, ${wave.colors[0].a})`)
      gradient.addColorStop(0.5, `rgba(${wave.colors[1].r}, ${wave.colors[1].g}, ${wave.colors[1].b}, ${wave.colors[1].a})`)
      gradient.addColorStop(1, `rgba(${wave.colors[0].r}, ${wave.colors[0].g}, ${wave.colors[0].b}, ${wave.colors[0].a * 0.3})`)

      ctx.fillStyle = gradient
      ctx.fill()

      // Add glow effect
      ctx.shadowBlur = 40
      ctx.shadowColor = `rgba(${wave.colors[0].r}, ${wave.colors[0].g}, ${wave.colors[0].b}, 0.5)`
      ctx.fill()
      ctx.shadowBlur = 0
    }

    function animate() {
      if (!ctx || !canvas) return

      // Clear with very dark background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply global composite operation for better blending
      ctx.globalCompositeOperation = 'screen'

      // Draw waves
      waves.forEach((wave, index) => {
        drawWave(wave, index)
      })

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over'

      time += 0.5
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Pure black base */}
      <div className="fixed inset-0 bg-black" />
      
      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0"
        style={{ zIndex: 1 }}
      />
      
      {/* Additional vibrant gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-600/20 via-transparent to-transparent" />
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Side glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />
      </div>
    </>
  )
}