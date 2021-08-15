import './main-view/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Locale } from '@entropic-bond/localize-react'
import { MainPanel } from './main-view/main-panel'

Locale.config({
	localePath: 'locales' 
})

render(<MainPanel/>, document.getElementsByTagName('App')[0]);
