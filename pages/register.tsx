//React
import React, { useState } from 'react'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//Form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

//GraphQL
import { gql, useMutation } from '@apollo/client'

interface IForm {
    email: string
    password: string
}


const REGISTER = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password){
            id 
            email
        }
    }
`

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        minHeight: '70vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        marginTop: 15
    }
}))

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Register: React.FC = () => {
    const classes = useStyles()
    const [submiting, setSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>()

    const [register] = useMutation(REGISTER)

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        setSubmitting(true)
        console.log(`email: ${data.email}, password: ${data.password}`)
        register({ variables: { email: data.email, password: data.password } })
        setSubmitting(false)
        reset({ email: '', password: '' })
    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <Typography variant="h2" align="center">
                Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={
                        { required: true, pattern: emailRegex }
                    }
                    render={({ field }) => <TextField
                        {...field}
                        label="Email"
                        autoComplete="off"
                    />
                    }
                />
                {errors.email?.type === 'required' && <span>*Required</span>}
                {errors.email?.type === 'pattern' && <span>Must be a valid email</span>}
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={
                        { required: true, minLength: 6 }
                    }
                    render={({ field }) => <TextField
                        {...field}
                        label="Password"
                        autoComplete="off"
                        type="password"
                    />
                    }
                />
                {errors.password?.type === "required" && <span>*Required</span>}
                {errors.password?.type === "minLength" && <span>Must be at least 6 characters</span>}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                >
                    Register
                </Button>
            </form>

        </Container>

    )
}

export default Register