import React, { Component, PropsWithChildren } from 'react'
import { FileUpload, FileUploadProps } from './file-upload'

type ImageUploadProps = Omit<FileUploadProps, 'onError' | 'accept' | 'children'> & {
	onError?: ( invalidFileTypes: string[] )=>string
	existingImgUrl: string
}

interface ImageUploadState {
	imageUrl: string
}

export const validImageFiles = [ 'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp' ]

export class ImageUpload extends Component<ImageUploadProps, ImageUploadState> {
	constructor( props: ImageUploadProps ) {
		super( props )
		this.state = { imageUrl: '' }
	}

	private fileDropped( files: File[] ) {
		const reader = new FileReader()
		reader.onload = ()=>this.setState({ imageUrl: reader.result as string })
		reader.readAsDataURL( files[0] )

		this.props.onDrop?.( files )
	}

	render() {
		const { existingImgUrl, emptyMessage, onError, children } = this.props
		const { imageUrl } = this.state
		const imageToShow = imageUrl? imageUrl : existingImgUrl

		return (
			<FileUpload
				className="image-upload"
				onDrop={ files => this.fileDropped( files )} 
				accept={ validImageFiles.map( format => `image/${format}` ) }
				onError={ ()=>onError?.( validImageFiles ) }
				emptyMessage={ emptyMessage }
			>
				{ imageToShow && <img src={ imageToShow }/> }
				{ children }
			</FileUpload>
		)
	}
}