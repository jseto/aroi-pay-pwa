import './main-view/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Locale } from '@entropic-bond/localize-react'
import { MainView } from './main-view/main-view'

Locale.config({
	localePath: 'locales' 
})

render(<MainView/>, document.getElementsByTagName('App')[0]);
