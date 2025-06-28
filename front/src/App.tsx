import React, { useEffect } from 'react'
import { useGetMails } from './AppHooks'

const App: React.FC = () => {
    const { loading, error, data } = useGetMails()
    console.log('data from graphQl', { loading, error, data })

    useEffect(() => {
        fetch('http://localhost:3000/person', {
            mode: 'cors',
        })
            .then((res) => {
                console.log('Persons from API', res)
                return res.json()
            })
            .then((data) => console.log(data))
    }, [])

    const createCustomUser: () => void = async () => {
        const response = await fetch('http://localhost:3000/person/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        console.log('Created user response:', response)
    }

    return (
        <>
            <div style={{ margin: '0 auto', maxWidth: '80%' }}>
                <br />
                <button onClick={createCustomUser}>Create random person</button>
            </div>
        </>
    )
}

export default App
