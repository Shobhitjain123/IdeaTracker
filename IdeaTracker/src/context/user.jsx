import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import service from "../appwrite/appwrite";

const UserContext = createContext()

export function useUser(){
    return useContext(UserContext)
}

export function UserProvider(props){
    const [user, setUser] = useState(null)

    async function login(email, password) {
        const loggedIn = await service.account.createEmailPasswordSession(email, password)
        setUser(loggedIn);
        window.location.replace("/")
    }

    async function logout(){
        const loggedIn = await service.account.deleteSession("current")
        setUser(loggedIn)
    }

    async function register(email, password) {
        const account = await service.account.create(ID.unique(), email, password)
        if(account) await login(email, password)
    }

    async function getUserStatus() {
        try {   
            const loggedIn = await service.account.get()
            if(loggedIn) setUser(loggedIn)
        } catch (error) {
            setUser(null)
        }
    }

    useEffect(() => {
        getUserStatus()
    }, [])

    return (
        <UserContext.Provider value = {{current: user, login, logout, register}}>;
                {props.children}
        </UserContext.Provider>
    )

}
