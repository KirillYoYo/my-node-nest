import React, { useEffect } from 'react'
const { Text } = Typography
import { getFromStorage, removeFromStorage } from '../../../utils/utils'
import { Typography } from 'antd'
import { useIsLogin } from './IsLoginContext'

const LoginStatus = () => {
    const { isAuth, setIsAuth } = useIsLogin()

    useEffect(() => {
        if (getFromStorage('token')) {
            setIsAuth(true)
        }
    }, [])

    const out = () => {
        removeFromStorage('token')
        setIsAuth(false)
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                padding: '10px',
                zIndex: 2,
            }}
        >
            {isAuth && (
                <div>
                    <Text>Вы залогинированный </Text>
                    <Text>
                        <a onClick={out} href="#">
                            Выйти (не работает, удали сам из кук)
                        </a>
                    </Text>
                </div>
            )}
            {!isAuth && (
                <div>
                    <Text>Вы НЕзалогинированный </Text>
                    <Text>
                        <a
                            onClick={() => history.pushState({}, '', '/login')}
                            href="#"
                        >
                            Залогинироваться
                        </a>
                    </Text>
                </div>
            )}
        </div>
    )
}

export default LoginStatus
