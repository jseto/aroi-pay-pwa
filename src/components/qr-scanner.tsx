import { Component, createRef, RefObject } from 'preact';
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from '@zxing/library'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'														// cSpell: disable-line
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { faSync } from '@fortawesome/free-solid-svg-icons'

type CameraPosition = 'user' | 'environment'

export class QrScanner extends Component {
	constructor( props ) {
		super( props )

		this.videoInstance = createRef()
	}

	async componentDidMount() {
		// this.codeReader = new BrowserMultiFormatReader()
		// const videoInputDevices = await this.codeReader.listVideoInputDevices()
		// this.selectedDeviceId = videoInputDevices[1]?.deviceId || videoInputDevices[0]?.deviceId
		// console.log( this.selectedDeviceId )
		// this.scanCode()
		await this.attachCamStream('environment')
		this.scanCode()
	}

	private async attachCamStream( cameraPositon: CameraPosition ) {
		this.video.srcObject = await navigator.mediaDevices.getUserMedia({ 
			video: {
				width: 1600,
				height: 1200,
				facingMode: cameraPositon
			}
		})
	}


	private async scanCode() {
		const hints = new Map().set( DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE] )
		this.codeReader = new BrowserMultiFormatReader( hints, 200 )

		await this.video.play()
		const result = await this.codeReader.decodeOnceFromStream(	
			this.video.srcObject as MediaStream
		)
			
		if ( result ) {
			this.video.pause()
			console.log( result )
		}
	}

	private pause() {
		this.video.pause()
	}

	get video() { 
		return this.videoInstance.current
	}

	render() {
		return (
			<div className="qr-scanner">
				<video ref={ this.videoInstance } style={{ width: '100%'}}/>
				<FontAwesomeIcon icon={ faExpand }/>
				<button onClick={()=>this.scanCode()}>scan</button>
				<button onClick={()=>this.pause()}>pause</button>
			</div>
		)
	}

	private videoInstance: RefObject<HTMLVideoElement>
	private codeReader: BrowserMultiFormatReader
}