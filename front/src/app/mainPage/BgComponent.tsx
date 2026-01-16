import React from 'react'
import styles from './styles.module.scss'
import { FullScreenCanvas } from './ZoneImageExample'
import { Parralax } from '@/app/mainPage/Parralax/Parralax'

export const BgComponent: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <div className={styles.mainBackground}></div>
            <div style={{ zIndex: 1, position: 'relative', width: '100%', height: '100%' }}>
                <FullScreenCanvas />
                {/*<Parralax></Parralax>*/}
            </div>
        </div>
    )
}
