//React 
import { createContext, useState } from 'react'

//save my user
interface IProps {
    children: React.ReactNode
}

interface IUser {
    id: string
    email: string
}

interface IContext {
    user: IUser
    setUser: (user: IUser) => void
    loggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
}

const UserContext = createContext<Partial<IContext>>({})

const UserProvider = ({ children }: IProps) => {
    const [user, setUser] = useState<IUser>({ id: '', email: '' })
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            loggedIn,
            setLoggedIn
        }} >
            {children}
        </UserContext.Provider >
    )
}
export { UserProvider, UserContext }