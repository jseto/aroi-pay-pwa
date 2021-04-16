import { h, render } from 'preact'

function App() {
	return (
		<h1>Hi there</h1>
	)
}

render(<App/>, document.getElementsByTagName('App')[0]);
