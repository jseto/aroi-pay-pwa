import React, { PropsWithChildren, ReactChildren, useState } from 'react'
import Dropzone, { DropzoneState } from 'react-dropzone'

export type FileUploadProps = PropsWithChildren<{
	className?: string;
	onDrop: ( files: File[] )=>(string | JSX.Element | void)
	onError?: string | ( ()=>string ) //returns error message 
	emptyMessage?: string | JSX.Element
	accept?: string | string[]
}>

export function FileUpload({ onDrop, onError, accept, className, children, emptyMessage }: FileUploadProps) {
	const [ dragOver, setDragOver ] = useState( false )
	const [ error, setError ] = useState( '' ) 
	const [ droppedFileNames, setDroppedFileNames ] = useState( [] )
	const [ droppedMessage, setDroppedMessage ] = useState<string | JSX.Element>('')

	const filesDropped = ( files: File[] ) => {
		if ( files.length ) {
			setError( '' )
			setDroppedFileNames( files.map( file => file.name ) )
		}
		else onError && setError( typeof onError === 'function'? ()=> onError() : onError )

		const message = onDrop( files ) 
		setDroppedMessage( message || '' )
	}

	return (
		<Dropzone 
			accept={ accept }
			onDrop={ files => filesDropped( files ) }
			onDragEnter={ ()=>setDragOver( true ) }
			onDragLeave={ ()=>setDragOver( false ) }
		>
		{
			( dropState: DropzoneState ) => (
				<div className={ `file-upload ${ className || '' } ${ dragOver? 'drag-over' : ''}` }
					{ ...dropState.getRootProps() }>
					<input { ...dropState.getInputProps() } />

					<div className="children">
						{ children }
					</div>

					<div className="text-info-panel">
						{ droppedFileNames.length	?	droppedMessage : emptyMessage	}
					</div>
				  { emptyMessage }
					{ error && <p className="error">{ error }</p> }

				</div>
			)
		}
		</Dropzone>
	)
}