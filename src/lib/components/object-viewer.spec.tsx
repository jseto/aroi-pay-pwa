import { render, within } from '@testing-library/react'
import React from 'react'
import { ObjectViewer } from './object-viewer'

describe( 'Object Viewer', ()=>{

	it( 'should process a plain object', ()=>{
		const obj = {
			aString: 'a string',
			aNumber: 3.1416,
			aBoolean: true
		}
		const wrapper = render( 
		
			<ObjectViewer object={ obj }/>
		
		)

		const aString = wrapper.getByText( 'aString:' )
		expect( aString ).toBeInTheDocument()
		expect( aString.nextSibling ).toHaveTextContent( 'a string' )

		const aNumber = wrapper.getByText( 'aNumber:' )
		expect( aNumber ).toBeInTheDocument()
		expect( aNumber.nextSibling ).toHaveTextContent( '3.1416' )

		const aBoolean = wrapper.getByText( 'aBoolean:' )
		expect( aBoolean ).toBeInTheDocument()
		expect( aBoolean.nextSibling ).toHaveTextContent( 'true' )
	})
	
	it( 'should process an object with inner objects', ()=>{
		const obj = {
			anObject: {
				aString: 'a string',
				aNumber: 3.1416,
			},
			aBoolean: true
		}
		const wrapper = render( 
		
			<ObjectViewer object={ obj }/>
		
		)

		const list = wrapper.getAllByRole( 'list' )[0]
		expect( list ).toBeInTheDocument()

		const listItems = within( list ).getAllByRole( 'listitem' )

		expect( listItems[0] ).toHaveTextContent( 'anObject' )

		const objectListItems = within( listItems[0] ).getAllByRole( 'listitem' )
		expect( objectListItems[0] ).toHaveTextContent( 'aString' )
		expect( objectListItems[0] ).toHaveTextContent( 'a string' )
		
		expect( objectListItems[1] ).toHaveTextContent( 'aNumber' )
		expect( objectListItems[1] ).toHaveTextContent( '3.1416' )
		
		expect( within( listItems[0] ).queryByText( 'aBoolean' ) ).not.toBeInTheDocument()
		expect( wrapper.getByText( 'aBoolean', { exact: false }) ).toBeInTheDocument()
	})
	
	xit( 'should process an object with inner arrays', ()=>{
		const obj = {
			anArray: [ 1, 3, 6, 8, {
				aString: 'a string',
				aNumber: 3.1416,
			} ],
			aBoolean: true
		}
		const wrapper = render( 
		
			<ObjectViewer object={ obj }/>
		
		)

		const list = wrapper.getAllByRole( 'list' )[0]
		expect( list ).toBeInTheDocument()

		const listItems = within( list ).getAllByRole( 'listitem' )

		expect( listItems[0] ).toHaveTextContent( 'anArray' )

		const objectListItems = within( listItems[0] ).getAllByRole( 'listitem' )
		expect( objectListItems[0] ).toHaveTextContent( 'aString' )
		expect( objectListItems[0] ).toHaveTextContent( 'a string' )
		
		expect( objectListItems[1] ).toHaveTextContent( 'aNumber' )
		expect( objectListItems[1] ).toHaveTextContent( '3.1416' )
		
		expect( within( listItems[0] ).queryByText( 'aBoolean' ) ).not.toBeInTheDocument()
		expect( wrapper.getByText( 'aBoolean', { exact: false }) ).toBeInTheDocument()

	})
	
	it( 'should not throw on falsy object', ()=>{
		expect(
			()=>render(
				<div>
					<ObjectViewer object={ undefined } />
					<ObjectViewer object={ null } />
				</div>
			)
		).not.toThrow()
	})
	
})