import React, { useState } from 'react'
import {useUser} from '../context/user'

function Login() {
    
    const user = useUser()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <section>
            <h1>Login or register</h1>
            <form>
                <input type="email" placeholder='Enter Email' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Enter Password' value = {password} onChange={(e) => setPassword(e.target.value)}/>
                <div>
                <button type='button' className='button' onClick={() => user.login(email, password)}>Login</button>
                <button type='button' className='button' onClick={() => user.register(email, password)}>Register</button>
                </div>
            </form>
        </section>
    )
}

export default Login
