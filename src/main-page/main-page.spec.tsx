import { render, screen } from '@testing-library/react'
import { MainPage } from './main-page'

describe('Main Page', ()=>{

	beforeEach(()=>{
		render(<MainPage />)	
	})

	describe('Bottom navigation buttons', ()=>{
		it('should show main page navigation buttons', ()=>{
			expect( screen.getByTestId( 'scanCode' ) ).toBeInTheDocument()
			expect( screen.getByTestId( 'settings' ) ).toBeInTheDocument()
			expect( screen.getByTestId( 'find' ) ).toBeInTheDocument()
		})
	})
})