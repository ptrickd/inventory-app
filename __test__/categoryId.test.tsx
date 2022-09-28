import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ProductsPage from '../pages/category/[categoryId]'
import {mockedRouter} from './mockedRouter'
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('<ProductsPage />', () => {

    it('render as intended', async () => {
      
        render(
            <RouterContext.Provider 
            value={mockedRouter({ query: { categoryId: '93' }})}
            >
                <ProductsPage />
            </RouterContext.Provider>
            
        )
    })
})