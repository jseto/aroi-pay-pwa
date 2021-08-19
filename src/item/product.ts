import { EntropicComponent, persistent } from 'entropic-bond'

export class Product extends EntropicComponent {
	
	set name( value: string ) {
		this.changeProp( 'name', value )
	}
	
	get name(): string {
		return this._name
	}
	
	set price( value: number ) {
		this.changeProp( 'price', value )
	}
	
	get price(): number {
		return this._price
	}
	
	@persistent private _name: string
	@persistent private _price: number
}