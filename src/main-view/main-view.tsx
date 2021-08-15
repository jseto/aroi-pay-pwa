import React, { Component } from 'react'
import { MenuBar } from '@entropic-bond/menu-bar'
import { StateWithLocale } from '@entropic-bond/localize-react'
import { ScannerView } from './scanner-view'
import ScanIcon from '@fortawesome/fontawesome-free/svgs/solid/barcode.svg'
import './main-menu.scss'

type MainViewState = StateWithLocale<{
	activeMenu: number
}>

export class MainView extends Component<{}, MainViewState> {
	constructor( props: {} ) {
		super( props )
		this.state = {
			activeMenu: 0
		}
	}

	render() {
		const { activeMenu } = this.state

		return (
			<div className="main-view">
				<MenuBar
					className="main-menu"
					menuItems={[
						{ caption: <ScanIcon/> },
						{ caption: <ScanIcon/> }
					]}
					activeIndex={ activeMenu }
					position="bottom"
				>
					<ScannerView />
					<div></div>
				</MenuBar>
			</div>
		)
	}
}