import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_PERSON_EMAIL = gql`
    query GetPerson {
        person {
            email
        }
    }
`

const App: React.FC = () => {
    const { loading, error, data } = useQuery<{ user: any }>(
        GET_PERSON_EMAIL,
        {}
    )
    console.log('ql', { loading, error, data })

    useEffect(() => {
        fetch('http://localhost:3000/person', {
            mode: 'cors',
        })
            .then((res) => {
                console.log('response', res)
                return res.json()
            })
            .then((data) => console.log(data))
    }, [])

    return (
        <>
            <div style={{ margin: '0 auto', maxWidth: '80%' }}>
                <h1>Title</h1>
                <button>Get person names</button>
            </div>
        </>
    )
}

export default App
