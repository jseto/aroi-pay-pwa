import { Product } from '../item/product'

interface CartItem {
	item: Product
	amount: number
}

export class Cart {
	addItemByCode( code: string ) {
	}

	

	get items() {
		return [...this._items]
	}

	private _items: CartItem[]
}
