import React, { Component } from 'react'
import { Product } from './product'

interface ProductCardProps {
	product: Product
}
interface ProductCardState {}

export class ProductCard extends Component<ProductCardProps, ProductCardState> {
	
	render() {
		const { product } = this.props
		
		return (
			<div className="product-card">
				<h3>{ product.name }</h3>
			</div>
		)		
	}
}
