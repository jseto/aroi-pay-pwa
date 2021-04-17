import { Component, createRef, RefObject } from 'preact';
import { BrowserMultiFormatReader } from '@zxing/library'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'														// cSpell: disable-line
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export class QrScanner extends Component {
	constructor( props ) {
		super( props )

		this.videoInstance = createRef()
	}

	async componentDidMount() {
		this.codeReader = new BrowserMultiFormatReader()
		const videoInputDevices = await this.codeReader.listVideoInputDevices()
		this.selectedDeviceId = videoInputDevices[1]?.deviceId || videoInputDevices[0]?.deviceId
		// codeReader.decodeFromVideoDevice(
		// 	this.selectedDeviceId, this.videoInstance.current, ( result, error ) => {
		// 		if ( result ) {
		// 			console.log( result.getText())
		// 			this.videoInstance.current.pause()
		// 		}
		// 		// if ( error ) console.error( error.message )
		// 	}
		// )
		this.scanCode()
	}
	
	private async scanCode() {
		const result = await this.codeReader.decodeOnceFromVideoDevice(	
			this.selectedDeviceId, this.videoInstance.current 
		)

		this.videoInstance.current.pause()
		console.log( result )
	}

	render() {
		return (
			<div className="qr-scanner">
				<video ref={ this.videoInstance }/>
				<FontAwesomeIcon icon={ faExpand }/>
				<button onClick={()=>this.scanCode()}>scan</button>
			</div>
		)
	}

	private videoInstance: RefObject<HTMLVideoElement>
	private selectedDeviceId: string
	private codeReader: BrowserMultiFormatReader
}