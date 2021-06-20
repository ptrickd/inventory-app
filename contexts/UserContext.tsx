//React 
import { createContext, useState, useEffect } from 'react'

//save my user
interface IProps {
    children: React.ReactNode
}

interface IUser {
    id: string
    email: string
}

interface IContext {
    currentUser: IUser
    setCurrentUser: (user: IUser) => void
    loggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
    setToken: (token: string) => void
    logout: () => void
}

const UserContext = createContext<Partial<IContext>>({})

const UserProvider = ({ children }: IProps) => {
    const [currentUser, setCurrentUser] = useState<IUser>({ id: '', email: '' })
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        console.log('currentUser::', currentUser)
    }, [currentUser])

    useEffect(() => {
        console.log('loggedIn::', loggedIn)
    }, [loggedIn])
    useEffect(() => {
        console.log("token:", localStorage.getItem("token"))
    }, [])
    const setToken = (token: string) => {
        localStorage.setItem('token', token)
    }
    const logout = () => {
        setCurrentUser({ id: '', email: '' })
        setLoggedIn(false)
        localStorage.removeItem('token')
    }


    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                loggedIn,
                setLoggedIn,
                setToken,
                logout
            }}
        >
            {children}
        </UserContext.Provider >
    )
}
export { UserProvider, UserContext }