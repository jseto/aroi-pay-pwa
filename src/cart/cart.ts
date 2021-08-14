import { Item } from '../item/item'

interface CartItem {
	item: Item
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
