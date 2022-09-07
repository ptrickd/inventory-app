import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { default as LoginPage } from '../pages/login'

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

        //need an heading
        const loginHeading = screen.getByRole('heading', { name: 'Login' })
        expect(loginHeading).toBeVisible()

        //need an input for email
        const emailInput = screen.getByText('Email')
        expect(emailInput).toBeVisible()

        //need an input for password
        const passwordInput = screen.getByText('Password')
        expect(passwordInput).toBeVisible()

        //need a button for login
        const loginButton = screen.getByRole('button', { name: 'Login' })
        expect(loginButton).toBeVisible()

        //need a button for register
        const registerButton = screen.getByRole('button', { name: 'Register' })
        expect(registerButton).toBeVisible()

    })

})