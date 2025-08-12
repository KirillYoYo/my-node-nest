import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Persons from './Persons'
import Login from './Login/Login'
import './globalStyles.scss'
import './fonts.scss'
import Payment from './Payment/Payment'
import LoginStatus from './Login/LoginStatus'
import { IsLoginProvider } from './Login/IsLoginContext'

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <IsLoginProvider>
                    <LoginStatus></LoginStatus>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/payment" element={<Payment />} />
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
                </IsLoginProvider>
            </BrowserRouter>
        </>
    )
}

export default App
