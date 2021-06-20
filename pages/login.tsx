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
    const { currentUser, setCurrentUser, loggedIn, setLoggedIn, setToken } = useContext(UserContext)
    const [submitting, setSubmitting] = useState(false)

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
        console.log(loginResponse.data.login.user)
        if (
            loginResponse && loginResponse.data &&
            currentUser !== undefined && setCurrentUser !== undefined
            && setLoggedIn !== undefined && setToken !== undefined
        ) {
            setCurrentUser(loginResponse.data.login.user)
            setToken(loginResponse.data.login.token)
            setLoggedIn(true)
        }
        setSubmitting(false)
        reset({ email: '', password: '' })

    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <Typography variant="h2" align="center">
                Login
            </Typography>
            <AuthForm onSubmit={onSubmit} submitting={submitting} label="Login" />
            <Link href="/register"><Button color="inherit" variant="contained">Register</Button></Link>
        </Container>

    )
}

export default Login