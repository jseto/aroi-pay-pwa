import { localize, StateWithLocale } from '@entropic-bond/localize-react'
import { SignData, Auth, AuthError, Store, AuthProvider } from 'entropic-bond'
import React, { Component } from 'react'
import { User } from './user'

type Mode = 'login' | 'signUp'

interface LoginPanelProps {}

type LoginPanelState = StateWithLocale<{
	email: string
	password: string
	error: string
	mode: Mode
}>

@localize( 'LoginPanel' )
export class LoginPanel extends Component<LoginPanelProps, LoginPanelState> {
	constructor( props: LoginPanelProps ) {
		super( props )
		this.state = {
			email: '',
			password: '',
			error: '',
			mode: 'login'
		}
	}

	private async login( provider: AuthProvider ) {
		const { email, password, locale, mode } = this.state
		const signData: SignData = {
			authProvider: provider,
			email, 
			password
		}

		try {
			if ( mode === 'login' ) {
				await Auth.instance.login( signData )
			}
			else {
				await this.signUp( signData )
			}
		} catch ( e ) {
			const error: AuthError = e
			this.setState({
				error: locale.errorMessages[ error.code ] || error.message
			})
		}
	}

	private async signUp( signData: SignData ) {
		const { locale } = this.state
		const userModel = Store.getModel<User>( 'User' )
		const users = await userModel.find()
			.where( 'email', '==', signData.email ).get()

		if ( !users.length ) throw ({ 
			code: 'needsInvitation', 
			message: locale.errorMessages?.['needsInvitation'] 
		})

		await Auth.instance.signUp( signData )
	}

	private inputChange( event: React.ChangeEvent<HTMLInputElement> ) {
		this.setState({
			[event.target.name]: event.target.value,
			error: ''
		} as any)
	}

	private switchMode() {
		this.setState( prevState => ({
			mode: prevState.mode === 'login'? 'signUp' : 'login'
		})) 
	}

	render() {
		const { locale, email, password, error, mode } = this.state

		return (
			<div className="login-panel">
				<h2>{ locale.header }</h2>
				<input
					placeholder={ locale.emailPlaceholder }
					type="email"
					name="email"
					value={ email }
					onChange={ e => this.inputChange( e ) }
				/>
				<input
					placeholder={ locale.passwordPlaceholder }
					type="password"
					name="password"
					value={ password }
					onChange={ e => this.inputChange( e ) }
				/>
				<button onClick={ ()=> this.login( 'email' ) }>
					{ mode==='login'? locale.loginButton : locale.signUpButton }
				</button>
				{ error && <div className="error">{ error }</div> }

				<a href="#" onClick={ ()=> this.switchMode() }>
					{ mode === 'login' ? locale.notAMember : locale.alreadyAMember }
				</a>
			</div>
		)		
	}
}
