//React 
import { createContext, useState, useEffect } from 'react'

//GraphQL
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

//Types
import { IUser } from '../types/types'
//save my user
interface IProps {
    children: React.ReactNode
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
    const {  data } = useQuery(GET_CURRENT_USER)

    // useEffect(() => {
    //     console.log('currentUser::', currentUser)
    // }, [currentUser])

    // useEffect(() => {
    //     console.log('loggedIn::', loggedIn)
    // }, [loggedIn])
    // useEffect(() => {
    //     console.log("token:", localStorage.getItem("token"))
    // }, [])
    /*
    check If LoggedIn on reload 
    */
    useEffect(() => {

        if (typeof (localStorage.getItem('token')) !== 'undefined' && data && data.currentUser) {
            // console.log('refetch data on reload:', data.currentUser)
            setCurrentUser({ id: data.currentUser.id, email: data.currentUser.email })
            setLoggedIn(true)
        }

    }, [data])



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