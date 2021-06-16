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

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                loggedIn,
                setLoggedIn
            }}
        >
            {children}
        </UserContext.Provider >
    )
}
export { UserProvider, UserContext }