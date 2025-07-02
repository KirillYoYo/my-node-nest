import React, { useState } from 'react'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { loginStyles } from './loginStyles'
import LoginSider from './LoginSider'
import { CustomPath } from '../utils/CustomPath'
import { getEdges } from '../utils/utils'
import FlyingSVGPaths from './LoginBg'
import * as allPaths from './arrs'
import { Point } from './types'
const allValues = Object.values(allPaths) as Point[][]

const Login = () => {
    const [token, setToken] = useState('')
    const [refreshToken, setRefrehToken] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    const login = async (formData: FormData) => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        })
        response.json().then((token) => {
            setToken(token.access_token)
            setRefrehToken(token.refresh_token)
        })
    }
    const register = async (formData: FormData) => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: formData,
        })
    }

    return (
        <div style={{ height: '100%' }}>
            <Layout style={{ minHeight: '500px' }}>
                {/**/}
                <LoginSider isLogin={isLogin} setIsLogin={setIsLogin} />
                {/**/}
                <Content style={loginStyles.contentStyle}>
                    <div
                        className="bckg"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            top: '0',
                            left: '0',
                        }}
                    >
                        <FlyingSVGPaths
                            g={allValues.map((el) => (
                                <CustomPath
                                    withoutSvg
                                    hideDotes
                                    points={el}
                                    edges={getEdges(el)}
                                    colorFillArr={'rgba(36,168,0, 0.5)'}
                                ></CustomPath>
                            ))}
                        />
                    </div>
                    {isLogin && (
                        <form action={login}>
                            <input name="email" type="text" />
                            <br />
                            <input name="password" type="password" />
                            <br />
                            <input value={'login'} type="submit" />
                        </form>
                    )}
                    {!isLogin && (
                        <form action={register}>
                            <input name="email" type="text" />
                            <br />
                            <input name="password" type="password" />
                            <input name="password2" type="password" />
                            <br />
                            <input value={'register'} type="submit" />
                        </form>
                    )}
                </Content>
            </Layout>
        </div>
    )
}

export default Login
