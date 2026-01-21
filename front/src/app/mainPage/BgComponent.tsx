import React from 'react'

import { Parralax } from '@/app/mainPage/Parralax/Parralax'
import LightingTest from '@/utils/LightingTest'

import styles from './styles.module.scss'
import { FullScreenCanvas } from './ZoneImageExample'

const BgComponent: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <div className={styles.mainBackground}></div>
            <div style={{ zIndex: 1, position: 'relative', width: '100%', height: '100%' }}>
                <FullScreenCanvas />
                {/*<LightingTest />*/}
                {/*<Parralax></Parralax>*/}
            </div>
        </div>
    )
}

export default BgComponent
