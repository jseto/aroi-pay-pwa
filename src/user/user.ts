import { EntropicComponent, persistent, registerPersistentClass, StoredFile, UserCredentials } from 'entropic-bond'

@registerPersistentClass( 'User' )
export class User extends EntropicComponent {
	constructor( userId?: string ) {
		super( userId )
		this._thumbnail  = new StoredFile()
		this._thumbnail.onChange( 
			event => this.notify<User>({ thumbnail: event.storedFile })
		)
	}

	set email( value: string ) {
		this.changeProp( 'email', value )
	}

	get email() {
		return this._userCredentials?.email
	}

	setCredentials( userCredentials: UserCredentials ) {
		this.setId( userCredentials.id )
		this._userCredentials = userCredentials
	}
	
	set name( value: string ) {
		this.changeProp( 'name', value )
	}
	
	get name(): string {
		return this._name
	}

	get thumbnail(): StoredFile {
		return this._thumbnail
	}
	
	set language( value: string ) {
		this._language = value
	}
	
	get language(): string {
		return this._language
	}
	
	@persistent private _language: string
	@persistent private _name: string
	@persistent private _thumbnail: StoredFile
	private _userCredentials: UserCredentials
}