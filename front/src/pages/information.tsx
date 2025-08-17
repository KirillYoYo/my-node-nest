import React from 'react'
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next'
import * as cookie from 'cookie'

type Props = Array<{ name: string; type: string; options: unknown }>

export default function Information({ message }: { message: string }) {
    const parsed: Props = JSON.parse(message) || []
    return (
        <div>
            {parsed.map((el) => (
                <div>
                    <div>
                        <div>name: {el.name}</div>
                        <div>type: {el.type}</div>
                        <div>{JSON.stringify(el.options)}</div>
                        <div>--</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { req } = ctx
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies['access_token']
    const rawCookies = req.headers.cookie || ''

    const res = await fetch('http://localhost:3000/collections', {
        headers: {
            cookie: rawCookies, // 👈 передаём оригинальные куки от клиента
        },
    })
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    if (!res.ok) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const data = await res.text()

    return {
        props: {
            message: data,
        },
    }
}
