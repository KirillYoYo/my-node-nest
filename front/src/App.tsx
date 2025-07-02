import React, { useEffect, useState } from 'react'
import { useGetMails } from './AppHooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Persons from './Persons'
import Login from './Login/Login'
import './globalStyles.scss'
import './fonts.scss'

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Persons />} />
                    <Route
                        path="*"
                        element={
                            <React.Fragment>
                                <div>Nothing here</div>
                            </React.Fragment>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
