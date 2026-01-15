import React from 'react'
import styles from './styles.module.scss'
import { WaveAnimation } from './animations/WaveAnimation'
import { Parralax } from './Parralax/Parralax'
import Zones from './Zones'
import Forest from './Zones'
import { Layer8 } from './Parralax/layers/Layer8'

export const BgComponent: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <div className={styles.mainBackground}>
                {/*<div className={styles.top}></div>*/}
                {/*<div className={styles.bottom}></div>*/}
            </div>
            <div style={{ zIndex: 1, position: 'relative', width: '100%', height: '100%' }}>
                <Parralax />
                {/*<Layer8 offsetX={0} ></Layer8>*/}
            </div>
        </div>
    )
}
