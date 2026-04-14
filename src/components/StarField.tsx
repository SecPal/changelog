// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-FileCopyrightText: Tailwind Labs Inc.
// SPDX-License-Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus

'use client'

import { useEffect, useId, useRef } from 'react'
import clsx from 'clsx'

type Star = [x: number, y: number, dim?: boolean, blur?: boolean]

const stars: Array<Star> = [
  [4, 4, true, true],
  [4, 44, true],
  [36, 22],
  [50, 146, true, true],
  [64, 43, true, true],
  [76, 30, true],
  [101, 116],
  [140, 36, true],
  [149, 134],
  [162, 74, true],
  [171, 96, true, true],
  [210, 56, true, true],
  [235, 90],
  [275, 82, true, true],
  [306, 6],
  [307, 64, true, true],
  [380, 68, true],
  [380, 108, true, true],
  [391, 148, true, true],
  [405, 18, true],
  [412, 86, true, true],
  [426, 210, true, true],
  [427, 56, true, true],
  [538, 138],
  [563, 88, true, true],
  [611, 154, true, true],
  [637, 150],
  [651, 146, true],
  [682, 70, true, true],
  [683, 128],
  [781, 82, true, true],
  [785, 158, true],
  [832, 146, true, true],
  [852, 89],
]

const constellations: Array<Array<Star>> = [
  [
    [247, 103],
    [261, 86],
    [307, 104],
    [357, 36],
  ],
  [
    [586, 120],
    [516, 100],
    [491, 62],
    [440, 107],
    [477, 180],
    [516, 100],
  ],
  [
    [733, 100],
    [803, 120],
    [879, 113],
    [823, 164],
    [803, 120],
  ],
]

function Star({
  blurId,
  point: [cx, cy, dim, blur],
}: {
  blurId: string
  point: Star
}) {
  let groupRef = useRef<React.ElementRef<'g'>>(null)
  let ref = useRef<React.ElementRef<'circle'>>(null)

  useEffect(() => {
    if (!groupRef.current || !ref.current) {
      return
    }

    let delay = Math.random() * 2000

    let groupAnimation = groupRef.current.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { delay, duration: 4000, fill: 'forwards' },
    )

    let starAnimation = ref.current.animate(
      [
        {
          opacity: dim ? 0.2 : 1,
          transform: `scale(${dim ? 1 : 1.2})`,
        },
        {
          opacity: dim ? 0.5 : 0.6,
          transform: `scale(${dim ? 1.2 : 1})`,
        },
      ],
      {
        delay,
        duration: (Math.random() * 2 + 2) * 1000,
        direction: 'alternate',
        fill: 'both',
        iterations: Infinity,
      },
    )

    return () => {
      groupAnimation.cancel()
      starAnimation.cancel()
    }
  }, [dim])

  return (
    <g ref={groupRef} className="opacity-0">
      <circle
        ref={ref}
        cx={cx}
        cy={cy}
        r={1}
        style={{
          transformOrigin: `${cx / 16}rem ${cy / 16}rem`,
          opacity: dim ? 0.2 : 1,
          transform: `scale(${dim ? 1 : 1.2})`,
        }}
        filter={blur ? `url(#${blurId})` : undefined}
      />
    </g>
  )
}

function Constellation({
  points,
  blurId,
}: {
  points: Array<Star>
  blurId: string
}) {
  let ref = useRef<React.ElementRef<'path'>>(null)
  let uniquePoints = points.filter(
    (point, pointIndex) =>
      points.findIndex((p) => String(p) === String(point)) === pointIndex,
  )
  let isFilled = uniquePoints.length !== points.length

  useEffect(() => {
    if (!ref.current) {
      return
    }

    let path = ref.current
    let drawAnimation: Animation | null = null
    let fillAnimation: Animation | null = null
    let startTimeout = window.setTimeout(
      () => {
        path.style.visibility = 'visible'

        drawAnimation = path.animate(
          [{ strokeDashoffset: '1' }, { strokeDashoffset: '0' }],
          { duration: 5000, fill: 'forwards' },
        )

        if (!isFilled) {
          return
        }

        drawAnimation.finished
          .then(() => {
            if (!path.isConnected) {
              return
            }

            fillAnimation = path.animate(
              [{ fill: 'transparent' }, { fill: 'rgb(255 255 255 / 0.02)' }],
              { duration: 1000, fill: 'forwards' },
            )
          })
          .catch(() => {})
      },
      (Math.random() * 3 + 2) * 1000,
    )

    return () => {
      window.clearTimeout(startTimeout)
      drawAnimation?.cancel()
      fillAnimation?.cancel()
    }
  }, [isFilled])

  return (
    <>
      <path
        ref={ref}
        stroke="white"
        strokeOpacity="0.2"
        strokeDasharray={1}
        strokeDashoffset={1}
        pathLength={1}
        fill="transparent"
        d={`M ${points.join('L')}`}
        className="invisible"
      />
      {uniquePoints.map((point) => (
        <Star key={point.join(':')} point={point} blurId={blurId} />
      ))}
    </>
  )
}

export function StarField({ className }: { className?: string }) {
  let blurId = useId()

  return (
    <svg
      viewBox="0 0 881 211"
      fill="white"
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute w-220.25 origin-top-right rotate-30 overflow-visible opacity-70',
        className,
      )}
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
        </filter>
      </defs>
      {constellations.map((points) => (
        <Constellation
          key={points.map((point) => point.join(':')).join('|')}
          points={points}
          blurId={blurId}
        />
      ))}
      {stars.map((point) => (
        <Star key={point.join(':')} point={point} blurId={blurId} />
      ))}
    </svg>
  )
}
