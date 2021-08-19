import './scanner-view.scss'
import React, { Component, useState } from 'react'
import { localize, StateWithLocale } from '@entropic-bond/localize-react'
import { CodeScanner } from '../components/code-scanner/code-scanner'
import { ProductController } from '../item/product-controller'
import { Product } from '../item/product'
import FindIcon from '@fortawesome/fontawesome-free/svgs/solid/search.svg'
import { ProductCard } from '../item/product-card'

interface ScannerViewProps {
	onScan?: ( code: string ) => void
}

type ScannerViewState = StateWithLocale<{
	product: Product
}>

@localize('ScannerView')
export class ScannerView extends Component<ScannerViewProps, ScannerViewState> {

	async codeScanned( code: string ) {
		this.setState({ 
			product: await ProductController.getProduct( code ) 
		})

		this.props.onScan?.( code )
	}

	render() {
		const { locale, product } = this.state

		return (
			<div className="scanner-view">
				{ product 
						? <ProductCard product={ product }/>
						: <InputCodeView 
								placeholder={ locale.enterCode } 
								onCodeScanned={ code => this.codeScanned( code )}
							/>
				}
			</div>
		)
	}
}

interface InputCodeViewProps {
	placeholder: string
	onCodeScanned: ( code: string ) => void
}

function InputCodeView({ placeholder, onCodeScanned }: InputCodeViewProps ) {
		const [ code, setCode ] = useState('')
		
		return (
			<div className="input-code-view">
				<CodeScanner onCodeScanned={ code => onCodeScanned( code ) } />
				<div className="manual-input">
					<input
						placeholder={ placeholder } 
						value={ code || '' }
						onChange={ e => setCode( e.target.value ) }
					/>
					<FindIcon onClick={ ()=>onCodeScanned( code ) }/>
				</div>
			</div>
		)
	}

