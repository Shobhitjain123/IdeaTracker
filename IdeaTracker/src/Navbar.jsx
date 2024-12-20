import React from 'react'
import { useUser } from './context/user'

function Navbar() {
    const user = useUser()

    return (
        <nav>
            <a href="/">Idea Tacker</a>
            <div>
                {
                    user.current ? (
                        <>
                            <span>
                                {user.current.email}
                            </span>
                            <button type='button' onClick={() => user.logout()}> 
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login">Login</a>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
