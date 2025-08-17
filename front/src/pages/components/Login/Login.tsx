import React, { useState } from 'react'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { loginStyles } from './loginStyles'
import LoginSider from './LoginSider'
import { CustomPath } from '../../../utils/CustomPath'
import { getEdges } from '../../../utils/utils'
import FlyingSVGPaths from './LoginBg'
import * as allPaths from './arrs'
import { Point } from './types'
import AuthForm from './AuthForm'
const allValues = Object.values(allPaths) as Point[][]

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)

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
                    <AuthForm
                        isLogin={isLogin}
                        setIsLogin={setIsLogin}
                    ></AuthForm>
                </Content>
            </Layout>
        </div>
    )
}

export default Login
