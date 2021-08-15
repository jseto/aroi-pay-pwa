import { localize, StateWithLocale } from '@entropic-bond/localize-react'
import React, { Component } from 'react'
import { CodeScanner } from '../components/code-scanner/code-scanner'
import FindIcon from '@fortawesome/fontawesome-free/svgs/solid/search.svg'
import './scanner-view.scss'

interface ScannerViewProps {
	onScan?: ( code: string ) => void
}

type ScannerViewState = StateWithLocale<{
	code: string
}>

@localize('ScannerView')
export class ScannerView extends Component<ScannerViewProps, ScannerViewState> {

	codeScanned( code: string ) {
		const { onScan } = this.props

		this.setState( { code } )
		onScan?.( code )
	}

	render() {
		const { locale, code } = this.state

		return (
			<div className="scanner-view">
				<CodeScanner onCodeScanned={ code => this.codeScanned( code ) } />
				<input
					placeholder={ locale.enterCode } 
					value={ code || '' }
					onChange={ e => this.setState({ code: e.target.value }) }
				/>
				<FindIcon onClick={ ()=>this.codeScanned( code ) }/>
			</div>
		)
	}
}