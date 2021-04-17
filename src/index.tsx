import { h, render } from 'preact'
import { QrScanner } from './components/qr-scanner';

function App() {
	return (
		<>
			<h1>Hi there</h1>
			<QrScanner />
		</>
	)
}

render(<App/>, document.getElementsByTagName('App')[0]);
