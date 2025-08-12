import React, { Dispatch, SetStateAction, useState } from 'react'
import { Form, Input, Button, Typography, Switch, Space, Card } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { RuleObject } from 'antd/es/form'
import { StoreValue } from 'rc-field-form/lib/interface'
// @ts-ignore
import styles from './styles.module.scss'
import { setToStorage } from '../utils/utils'
import { useIsLogin } from './IsLoginContext'
const { Title, Text } = Typography

const AuthForm = ({
    isLogin,
    setIsLogin,
}: {
    isLogin: boolean
    setIsLogin: Dispatch<SetStateAction<boolean>>
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [token, setToken] = useState('')
    const [refreshToken, setRefrehToken] = useState('')
    const [form] = Form.useForm()
    const { isAuth, setIsAuth } = useIsLogin()

    const checkToken = async (tkn: string) => {
        fetch('http://localhost:3000/collections', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${tkn}`,
            },
        })
    }

    const login = async (formData: FormData) => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        response.json().then((token) => {
            setToStorage<unknown>('token', token.access_token)
            setToken(token.access_token)
            setRefrehToken(token.refresh_token)
            checkToken(token.access_token)
            setIsAuth(true)
        })
    }
    const register = async (formData: FormData) => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            if (isLogin) {
                await login(values)
            } else {
                await register(values)
            }
        } catch (error) {
            console.log('Validation failed:', error)
        }
    }

    return (
        <div className={styles.container}>
            <Card className={styles.card} bordered={false}>
                <Title level={3} className={styles.title}>
                    {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
                </Title>

                <Form form={form} layout="vertical">
                    {!isLogin && (
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
                    )}

                    <Form.Item
                        name="email"
                        label="Email пользователя"
                        rules={[
                            {
                                required: true,
                                message: 'Введите Email пользователя!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Ваш логин"
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
                                    validator(
                                        _: RuleObject,
                                        value: StoreValue
                                    ) {
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
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Повторите пароль"
                            />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
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
