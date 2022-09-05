import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
    it('Got a title', () => {
        render(<Home />)

        const title = screen.getByText("Gruyere")
        expect(title).toBeInTheDocument()



    })

    it('Got a Start button', () => {
        render(<Home />)

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()

    })
})