import { Auth, Callback, UserCredentials, Store, SignData, Observable, Model } from 'entropic-bond'
import { User } from './user'

interface UserEvent {
	user: User
}

export class UserController {
	private constructor() {
		Auth.instance.onAuthStateChange( async userCredentials => {
			if ( userCredentials ) {
				this._user = await this.loadUserInfo( userCredentials )
			}
			else {
				this._user = null
			}
			this._onChange.notify({ user: this._user })
		})
	}

	static get instance() {
		return this._instance || ( this._instance = new UserController() )
	}

	onChange( cb: Callback<UserEvent> ) {
		return this._onChange.subscribe( cb )
	}

	private async loadUserInfo( userCredentials: UserCredentials ) {
		let user = await this.model.findById( userCredentials.id )

		if ( !user ) {
			const users = await this.model.find().where( 'email', '==', userCredentials.email ).get()
			const oldId = users[0].id
			user = users[0]
	
			user.setCredentials( userCredentials )
	
			await this.model.delete( oldId )
			await this.model.save( user )
		}

		user.setCredentials( userCredentials )

		return user
	}

	get currentUser() {
		return this._user
	}

	async login( signData: SignData) {
		return new Promise<User>( resolve => {
			const unsubscribe = this.onChange( event => {
				resolve( event.user )
				unsubscribe()
			})	
			Auth.instance.login( signData )
		})
	}

	async save() {
		await this._user.thumbnail.store()
		return this.model.save( this._user )
	}

	private model: Model<User> = Store.getModel<User>( 'User' )
	private static _instance: UserController
	private _user: User
	private _onChange: Observable<UserEvent> = new Observable<UserEvent>()
}