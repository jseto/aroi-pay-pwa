import React, { Component, createRef, RefObject } from 'react';
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from '@zxing/library'
import ExpandIcon from '@fortawesome/fontawesome-free/svgs/solid/expand.svg';
import './code-scanner.scss'

type CameraPosition = 'user' | 'environment'

interface CodeScannerState {
	videoPlaying: boolean
}

interface CodeScannerProps {
	onCodeScanned: ( code: string ) => void
}

export class CodeScanner extends Component<CodeScannerProps, CodeScannerState> {
	constructor( props ) {
		super( props )

		this.state = {
			videoPlaying: false
		}

		this.videoInstance = createRef()
	}

	async componentDidMount() {
		this.scanCode()
	}

	componentWillUnmount() {
		this.video.pause()
		this.stream.getTracks().forEach( track => track.stop() )
	}

	private async attachCamStream( cameraPositon: CameraPosition ) {
		this.video.srcObject = await navigator.mediaDevices.getUserMedia({ 
			video: {
				aspectRatio: 4/3,
				facingMode: cameraPositon
			}
		})
	}

	async scanCode() {
		await this.attachCamStream('environment')

		this.setState({
			videoPlaying: true
		})

		const hints = new Map().set( DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE] )
		this.codeReader = new BrowserMultiFormatReader( hints, 200 )

		await this.video.play()

		const result = await this.codeReader.decodeOnceFromStream(	
			this.video.srcObject as MediaStream
		)
			
		if ( result ) {
			const { onCodeScanned } = this.props
			
			this.pause()
			onCodeScanned?.( result.getText() )
		}
	}

	get video() { 
		return this.videoInstance.current 
	}

	get stream(): MediaStream {
		return this.video.srcObject as MediaStream
	}

	pause() {
		this.video.pause()
		this.stream.getTracks().forEach( track => track.stop() )
		this.setState({
			videoPlaying: false
		})
	}

	render() {
		const { videoPlaying } = this.state

		return (
			<div className="qr-scanner">
				<div className="view-finder">
					<video ref={ this.videoInstance } style={{ width: '100%'}}/>
					<ExpandIcon className={ videoPlaying? 'animate' : '' } preserveAspectRatio="none" />
				</div>
				<button onClick={()=>this.scanCode()}>scan</button>
				<button onClick={()=>this.pause()}>pause</button>
			</div>
		)
	}

	private videoInstance: RefObject<HTMLVideoElement>
	private codeReader: BrowserMultiFormatReader
}
