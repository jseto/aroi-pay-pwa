import './main.scss'
import React, { Component } from 'react'
import { MenuBar } from '@entropic-bond/menu-bar'
import { StateWithLocale } from '@entropic-bond/localize-react'
import { CodeScanner } from '../code-scanner/code-scanner'

type MainViewProps = StateWithLocale<{
	scanedText: string
}>

export class MainView extends Component<{}, MainViewProps> {

	render() {

		return (
			<div className="main-view">
				<h1>Aroi pay</h1>
				<MenuBar
					menuItems={[
						{ caption: 'Scan' },
						{ caption: 'Setup' }
					]}
					activeIndex={0}
					position="bottom"
				>
					<CodeScanner onCodeScanned={ result=>this.setState({ scanedText: result})} />
					<div>Setup</div>
				</MenuBar>
				{ this.state?.scanedText }
			</div>
		)
	}
}