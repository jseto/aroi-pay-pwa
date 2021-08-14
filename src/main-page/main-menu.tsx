import React, { Component } from 'react'
import { MenuBar } from '@entropic-bond/menu-bar'
import { StateWithLocale } from '@entropic-bond/localize-react'
import { CodeScanner } from '../code-scanner/code-scanner'

type MainMenuProps = StateWithLocale<{
	scanedText: string
}>


export class MainMenu extends Component<{}, MainMenuProps> {

	render() {

		return (
			<div className="main-menu">
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