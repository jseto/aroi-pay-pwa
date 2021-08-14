import { render, screen } from '@testing-library/react'
import { MainMenu } from './main-menu'

describe('Main Menu', ()=>{

	beforeEach(()=>{
		render(<MainMenu />)	
	})

	describe('Bottom navigation buttons', ()=>{
		it('should show main page navigation buttons', ()=>{
			expect( screen.getByTestId( 'scanCode' ) ).toBeInTheDocument()
			expect( screen.getByTestId( 'settings' ) ).toBeInTheDocument()
			expect( screen.getByTestId( 'find' ) ).toBeInTheDocument()
		})
	})
})