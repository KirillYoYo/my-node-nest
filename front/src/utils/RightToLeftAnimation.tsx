import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface PropTypes {
    children: React.ReactNode
    width?: number | string
    height?: number | string
    duration?: number
    flag?: boolean | string
    xEndAnimationGap?: number
    withoutSvg: boolean
}

const RightToLeftAnimation = ({
    children,
    width = 400,
    height = 120,
    duration = 1000,
    xEndAnimationGap = 0,
    flag = false,
    withoutSvg = false,
}: PropTypes) => {
    const groupRef = useRef(null)

    useEffect(() => {
        const g = d3.select(groupRef.current)

        if (!flag) {
            g.attr('transform', `translate(${width}, 0)`)
                .transition()
                .duration(duration)
                .ease(d3.easeCubicOut)
                .attr('transform', `translate(${width}, 0)`)
            return
        }

        g.attr('transform', `translate(${width}, 0)`) // начальная позиция — за пределами справа
            .transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            .attr('transform', `translate(${0 + xEndAnimationGap}, 0)`) // финальная позиция
    }, [flag, groupRef.current])

    return withoutSvg ? (
        <React.Fragment>
            <g ref={groupRef}>{children}</g>
        </React.Fragment>
    ) : (
        <svg width={width} height={height}>
            <g ref={groupRef}>{children}</g>
        </svg>
    )
}

export default RightToLeftAnimation
