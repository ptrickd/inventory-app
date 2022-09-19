import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ProductsPage from '../pages/category/[categoryId]'
import {mockedRouterProps} from './mockedRouter'



jest.mock('next/router', () => ({
    useRouter() {
        return ({
            mockedRouterProps
        });
    },
}));

describe('<ProductsPage />', () => {

    it('render as intended', async () => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter");
        useRouter.mockImplementation(() =>           mockedRouterProps        );
        render(
            <ProductsPage />
        )
    })
})