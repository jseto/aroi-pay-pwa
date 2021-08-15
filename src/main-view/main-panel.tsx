import React, { Component } from 'react'
import { MenuBar } from '@entropic-bond/menu-bar'
import { ScannerView } from './scanner-view'
import ScanIcon from '@fortawesome/fontawesome-free/svgs/solid/barcode.svg'
import FoodIcon from '@fortawesome/fontawesome-free/svgs/solid/concierge-bell.svg'
import UserIcon from '@fortawesome/fontawesome-free/svgs/solid/user-cog.svg'
import './main-panel.scss'

type MainViewPanel = {
	activeMenu: number
}

export class MainPanel extends Component<{}, MainViewPanel> {
	constructor( props: {} ) {
		super( props )
		this.state = {
			activeMenu: 0
		}
	}

	render() {
		const { activeMenu } = this.state

		return (
			<div className="main-panel">
				<MenuBar
					className="main-menu"
					menuItems={[
						{ caption: <ScanIcon/> },
						{ caption: <FoodIcon/> },
						{ caption: <UserIcon/> }
					]}
					activeIndex={ activeMenu }
					position="bottom"
				>
					<ScannerView />
					<div></div>
					<div></div>
				</MenuBar>
			</div>
		)
	}
}