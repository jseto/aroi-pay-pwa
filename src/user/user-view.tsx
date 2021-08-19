import React, { Component } from 'react'
import { Unsubscriber } from 'entropic-bond'
import { StateWithLocale, localize } from '@entropic-bond/localize-react'
import { User } from './user'
import CameraIcon from '@fortawesome/fontawesome-free/svgs/solid/camera.svg'
import { ImageUpload } from '../lib/components/image-upload'
import { replaceValue } from '../lib/utils/utils'

interface UserViewProps {
	user: User
}

type UserViewState = StateWithLocale<{
	countries: {
		name: string
		code: string
	}[]
}>

@localize( 'UserView' )
export class UserView extends Component<Partial<UserViewProps>, UserViewState> {

	async componentDidMount() {
		const { user } = this.props

		this.unsubscribe = user.onChange( async e => {
			this.setState({}) 
		})

		const countries = await ( await fetch( 'locales/countries.json' ) ).json()

		this.setState({
			countries: Object.entries( countries ).map( ([ key, value ]) => ({
				name: key,
				code: value as string
			}))
		})

	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	render() {
		const { user } = this.props
		const { locale, countries } = this.state

		return (
			<div className="user-view">
				<ImageUpload 
					onDrop={ files => user.thumbnail.setDataToStore( files[0] ) as any }
					onError={ validImageFiles => replaceValue( 
						locale.invalidFileType, { validImageFiles: validImageFiles.join(', ') } 
					)}
					existingImgUrl={ user.thumbnail.url }
				>
					<CameraIcon />
				</ImageUpload>

				<div className="text-data">
					<input 
						className="user-name"
						placeholder={ locale.namePlaceholder }
						value={ user.name || '' }
						onChange={ e => user.name = e.target.value }
					/>

					<input 
						placeholder={ locale.languagePlaceholder }
						value={ user.language || '' }
						onChange={ e => user.language = e.target.value }
					/>
				</div>
			</div>
		)		
	}

	private unsubscribe: Unsubscriber
}
