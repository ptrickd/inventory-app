// import React from 'react'
import { render, screen } from '@testing-library/react'
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { default as LoginPage } from '../pages/login'

// import client from '../apollo-client'
// import { UserContext } from '../contexts/UserContext'


import { LOGIN } from '../graphql/queries'

const mocks: any = [{
    request: {
        query: LOGIN,
        variables: {
            email: 'rick@email.com',
            password: '987654'
        }
    },
    result: {
        data: {
            login: {
                token: '1111',
                user: {
                    id: '01',
                    email: 'myemail@email.com'
                },
                error: null
            }
        }
    }
}]



// const customRender = (ui: React.FC, { providerProps, ...renderOptions }: any) => {
//     return render(
//         <UserContext.Provider{...providerProps}>ui</UserContext.Provider>,
//         renderOptions
//     )
// }

describe('<Login />', () => {
    it('render as intended', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LoginPage />
            </MockedProvider>
        )


        const loginHeading = screen.getByRole('heading', { name: 'Login' })
        expect(loginHeading).toBeVisible()

        //need an input for email
        //need an input for password
        //need a button for login
        //need a button for register

        screen.debug(screen.getByRole('button', { name: 'Login' }))
        // expect(await screen.findByText('Login')).toBeVisible()
        // const loginButton = await screen.findByText("test")
        // expect(loginButton).toBeInTheDocument()



    })

    // it('Got a Start button', () => {
    //     render(<Home />)

    //     const button = screen.getByRole('button')
    //     expect(button).toBeInTheDocument()

    // })
})