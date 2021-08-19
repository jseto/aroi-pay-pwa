import React from 'react'

interface ObjectViewerProps {
	object: {
		[ key:string ]:unknown
	}
}

export function ObjectViewer( props: ObjectViewerProps ) {
	return(
		<ul className="object-viewer">
			{
				Object.entries( props.object || {} ).map(([ key, value ])=>
					<li key={ key }>
						<strong>{ key }:</strong>{ typeof value === 'object'
							? <ObjectViewer object={ value as {} }/>
							: String( value ) }
					</li>
				)
			}
		</ul>
	)
}