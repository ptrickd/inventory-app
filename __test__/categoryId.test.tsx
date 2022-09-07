import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ProductsPage from '../pages/category/[categoryId]'

jest.mock('next/router', () => ({
    useRouter() {
        return ({
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null)
        });
    },
}));

describe('<ProductsPage />', () => {

    it('render as intended', async () => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter");
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null)
        }));
        render(
            <ProductsPage />
        )
    })
})