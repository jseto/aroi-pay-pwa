import React, { Component } from 'react'
import { MenuBar } from '@entropic-bond/menu-bar'
import { CodeScanner } from '../code-scanner/code-scanner'

export class MainPage extends Component {

	render() {

		return (
			<div className="main-page">
				<MenuBar
					menuItems={[
						{ caption: 'Scan' },
						{ caption: 'Setup' }
					]}
					activeIndex={0}
					// position="bottom"
				>
					<CodeScanner onCodeScanned={()=>{}} />
					<div>Setup</div>
				</MenuBar>
			</div>
		)
	}
}