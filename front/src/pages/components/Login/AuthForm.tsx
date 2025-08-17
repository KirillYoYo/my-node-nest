import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Typography,
    Switch,
    Space,
    Card,
    message,
} from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useIsLogin } from './IsLoginContext'
// @ts-ignore
import styles from './styles.module.scss'

const { Title, Text } = Typography

const AuthForm = ({
    isLogin,
    setIsLogin,
}: {
    isLogin: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const { isAuth, setIsAuth } = useIsLogin()

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        try {
            const res = await fetch('http://localhost:3000/collections', {
                credentials: 'include',
            })

            if (res.ok) {
                setIsAuth(true)
                return
            }

            if (res.status === 401) {
                const refreshRes = await fetch(
                    'http://localhost:3000/auth/refresh',
                    {
                        method: 'POST',
                        credentials: 'include',
                    }
                )

                setIsAuth(refreshRes.ok)
            } else {
                setIsAuth(false)
            }
        } catch (error) {
            console.error('Ошибка проверки токена', error)
            setIsAuth(false)
        }
    }

    const sendAuthRequest = async (url: string, data: any) => {
        try {
            setLoading(true)
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error(`Ошибка ${res.status}`)
            return await res.json()
        } catch (e) {
            message.error('Ошибка авторизации')
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            const payload = {
                email: values.email,
                password: values.password,
            }

            if (!isLogin && values.confirm !== values.password) {
                message.error('Пароли не совпадают')
                return
            }

            const endpoint = isLogin ? '/auth/login' : '/auth/register'
            const result = await sendAuthRequest(
                `http://localhost:3000${endpoint}`,
                payload
            )

            if (result) {
                setIsAuth(true)
            }
        } catch (error) {
            console.error('Validation failed:', error)
        }
    }

    return (
        <div className={styles.container}>
            <Card className={styles.card} bordered={false}>
                <Title level={3} className={styles.title}>
                    {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
                </Title>

                <Form form={form} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Введите email!' },
                            { type: 'email', message: 'Невалидный email!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="example@mail.com"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Пароль"
                        />
                    </Form.Item>

                    {!isLogin && (
                        <Form.Item
                            name="confirm"
                            label="Повторите пароль"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Подтвердите пароль!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error('Пароли не совпадают!')
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Повторите пароль" />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Form.Item>
                </Form>

                <Space direction="vertical" className={styles.switchContainer}>
                    <Text type="secondary">
                        {isLogin ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}
                    </Text>
                    <Switch
                        checkedChildren="Регистрация"
                        unCheckedChildren="Вход"
                        checked={!isLogin}
                        onChange={() => setIsLogin(!isLogin)}
                    />
                </Space>
            </Card>
        </div>
    )
}

export default AuthForm
