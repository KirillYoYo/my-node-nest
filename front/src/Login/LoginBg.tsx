import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Point } from './types'

const FlyingSVGPaths = ({ g }: { g: Array<React.ReactNode> }) => {
    const [positions, setPositions] = useState<Point[]>([])
    const velocitiesRef = useRef<{ dx: number; dy: number }[]>([])

    const width = window.innerWidth
    const height = window.innerHeight

    // Инициализация позиций и скоростей
    useEffect(() => {
        const initialPositions = g.map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
        }))

        const velocities = g.map(() => ({
            dx: (Math.random() - 0.5) * 4,
            dy: (Math.random() - 0.5) * 4,
        }))

        setPositions(initialPositions)
        velocitiesRef.current = velocities
    }, [g])

    // D3-анимация
    useEffect(() => {
        if (positions.length === 0) return

        const ticker = d3.timer(() => {
            setPositions((prev) =>
                prev.map((pos, i) => {
                    let { x, y } = pos
                    let { dx, dy } = velocitiesRef.current[i]

                    x += dx
                    y += dy

                    if (x < 0 || x > width) dx *= -1
                    if (y < 0 || y > height) dy *= -1

                    velocitiesRef.current[i] = { dx, dy }
                    return { x, y }
                })
            )
        })

        return () => ticker.stop()
    }, [positions.length])

    return (
        <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
        >
            {positions.map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                    {g[i]}
                </g>
            ))}
        </svg>
    )
}

export default FlyingSVGPaths
