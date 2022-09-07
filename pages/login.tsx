//React
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//Form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

//GraphQL
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'

//Context
import { UserContext } from '../contexts/UserContext'

//Components
import AuthForm from '../components/AuthForm'

interface IForm {
    email: string
    password: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        minHeight: '70vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    }
}))

const Login: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const { currentUser, setCurrentUser, loggedIn, setLoggedIn, setToken, logout } = useContext(UserContext)
    const [submitting, setSubmitting] = useState(false)
    const [serverErrorMess, setServerErrorMess] = useState('')

    const { reset } = useForm<IForm>()

    const [login] = useMutation(LOGIN)

    useEffect(() => {
        if (loggedIn) {
            router.push('/dashboard')
        }
    }, [loggedIn])

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        setSubmitting(true)
        const loginResponse = await login({ variables: { email: data.email, password: data.password } })
        // console.log('user on login', loginResponse.data.login.user)
        // console.log('error on login', loginResponse.data.errors)
        console.log('login response', loginResponse.data.login)


        if (
            loginResponse?.data?.login?.error && setLoggedIn && logout
        ) {
            console.log('Error::', loginResponse.data.login.error)
            setServerErrorMess(loginResponse.data.login.error)
            logout()
            setLoggedIn(false)
        }
        else if (
            loginResponse?.data?.login?.user &&
            currentUser !== undefined && setCurrentUser !== undefined
            && setLoggedIn !== undefined && setToken !== undefined
        ) {
            setCurrentUser(loginResponse.data.login.user)
            setToken(loginResponse.data.login.token)
            setLoggedIn(true)
            setServerErrorMess('')
        }
        setSubmitting(false)
        reset({ email: '', password: '' })

    }

    return (<Container className={classes.root} maxWidth="xs">
        <Typography variant="h2" align="center">
            Login
        </Typography>
        {
            serverErrorMess.length > 1 && <Typography
                variant='body1'
                align="center"
                color="secondary"
            >
                {serverErrorMess}
            </Typography>
        }
        <AuthForm onSubmit={onSubmit} submitting={submitting} label="Login" />
        <Link href="/register"><Button color="inherit" variant="contained">Register</Button></Link>
    </Container>


    )
}

export default Login

