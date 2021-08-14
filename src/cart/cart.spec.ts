import { Cart } from './cart'

describe('Cart', ()=>{
	let cart: Cart

	beforeEach(()=>{
		cart = new Cart()
	})

	it('should find a item by scan code', ()=>{
		cart.addItemByCode( 'fake_code' )

		expect( cart.items.length ).toBe( 1 )
	})
})