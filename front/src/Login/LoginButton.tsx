import React from 'react'
import ArrowAnimation from './ArrowAnimation'
import '../fonts.scss'

interface PropTypes {
    isHovered: boolean
    text?: string
    maskId: string
}

const LoginButton = ({ isHovered, text, maskId }: PropTypes) => {
    return (
        <svg width={376} height={120}>
            <ArrowAnimation
                width={376}
                height={120}
                flag={isHovered}
                xEndAnimationGap={170}
                colorFillArr={'rgba(200,200,0, 0.2)'}
            />
            <mask id={maskId}>
                <ArrowAnimation
                    width={376}
                    height={120}
                    flag={isHovered}
                    xEndAnimationGap={170}
                    colorFillArr={'white'}
                />
            </mask>
            <text
                x={'50%'}
                y={'50%'}
                fontFamily={'LoginFont'}
                text-anchor="middle"
                dominant-baseline="middle"
                fontSize={24}
                fontWeight={800}
                fill="black"
            >
                {text}
            </text>
            <text
                x={'50%'}
                y={'50%'}
                fontFamily={'LoginFont'}
                text-anchor="middle"
                dominant-baseline="middle"
                fontSize={24}
                fontWeight={800}
                fill="#ccc"
                mask={`url(#${maskId})`}
                pointerEvents="none"
            >
                {text}
            </text>
        </svg>
    )
}

export default LoginButton
