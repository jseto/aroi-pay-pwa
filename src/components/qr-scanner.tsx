import { Component, createRef, RefObject } from 'preact';
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from '@zxing/library'
import ExpandIcon from '@fortawesome/fontawesome-free/svgs/solid/expand.svg';
import './qr-scanner.scss'

type CameraPosition = 'user' | 'environment'

interface QrScannerState {
	scannedCode: string
}

interface QrScannerProps {

}

export class QrScanner extends Component<QrScannerProps, QrScannerState> {
	constructor( props ) {
		super( props )

		this.state = {
			scannedCode: null
		}

		this.videoInstance = createRef()
	}

	async componentDidMount() {
		await this.attachCamStream('environment')
		this.scanCode()
	}

	private async attachCamStream( cameraPositon: CameraPosition ) {
		this.video.srcObject = await navigator.mediaDevices.getUserMedia({ 
			video: {
				aspectRatio: 4/3,
				facingMode: cameraPositon
			}
		})
	}


	private async scanCode() {
		this.setState({
			scannedCode: null
		})

		const hints = new Map().set( DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE] )
		this.codeReader = new BrowserMultiFormatReader( hints, 200 )

		await this.video.play()

		const result = await this.codeReader.decodeOnceFromStream(	
			this.video.srcObject as MediaStream
		)
			
		if ( result ) {
			this.video.pause()
			this.setState({
				scannedCode: result.getText()
			})
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
		const { scannedCode } = this.state
		
		return (
			<div className="qr-scanner">
				<div className="view-finder">
					<video ref={ this.videoInstance } style={{ width: '100%'}}/>
					<ExpandIcon className={ scannedCode? '' : 'animate' } preserveAspectRatio="none" />
				</div>
				<button onClick={()=>this.scanCode()}>scan</button>
				<button onClick={()=>this.pause()}>pause</button>
			</div>
		)
	}

	private videoInstance: RefObject<HTMLVideoElement>
	private codeReader: BrowserMultiFormatReader
}