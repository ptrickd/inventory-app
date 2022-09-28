import { render, screen, fireEvent, cleanup,RenderOptions } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { default as LoginPage } from '../pages/login'
import {mockedRouterProps} from './mockedRouter'
import { UserContext } from '../contexts/UserContext'

import { LOGIN } from '../graphql/queries'
import React from 'react'

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

const props = {
            currentUser:{ id: '', email: '' }, 
            setCurrentUser:jest.fn(), 
            loggedIn:false, 
            setLoggedIn:jest.fn(), 
            setToken:jest.fn(), 
            logout:jest.fn()
        }

const AllTheProviders: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <UserContext.Provider value={props} >
        <MockedProvider mocks={mocks} addTypename={false}>
            {children}
        </MockedProvider> 
    </UserContext.Provider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

jest.mock('next/router', () => ({
    useRouter() {
        return ({
            ...mockedRouterProps,
            pathname:'/register'
            
        }        );
    },
}));

describe('<Login />', () => {

    afterEach(() => {
        cleanup()
    })

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

    it('navigate when clicking REGISTER button', async ( ) => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter");
        useRouter.mockImplementation(() =>    ({ 
            ...mockedRouterProps,
            pathname:'/register'
        }));

        

        customRender(<LoginPage />)

        //click on the register button
        const registerButton = screen.getByRole('button', {name:'Register'})
        // fireEvent.click(registerButton)

    })

})