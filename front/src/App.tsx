import React, { useEffect } from 'react'

const App: React.FC = () => {
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
