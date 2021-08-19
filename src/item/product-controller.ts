import { CrudController } from '@entropic-bond/crud-panel'
import { Store } from 'entropic-bond'
import { Product } from './product'

export class ProductController extends CrudController<Product> {
	constructor( product: Product = new Product ) {
		super( product )
	}
	
	getModel() {
		return ProductController._getmodel()
	}

	static getProduct( id: string ) {
		return this._getmodel().findById( id )
	}

	private static _getmodel = ()=>Store.getModel<Product>( 'Product' )
}