import './main-view/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Locale } from '@entropic-bond/localize-react'
import { MainPanel } from './main-view/main-panel'
import { UserController } from './user/user-controller'
import { Store, JsonDataSource, CloudStorage, MockCloudStorage, Auth, AuthMock } from 'entropic-bond'
import mockData from '../mocks/mock-data.json'
import { User } from './user/user'

new User()

const runMode = process.env.RUN_MODE || 'production'

if ( runMode === 'mocks') {
  Store.useDataSource( new JsonDataSource( mockData as any ) )
  CloudStorage.useCloudStorage( new MockCloudStorage( 'mock-data/img/' ) )
  Auth.registerAuthService( new AuthMock()
    .fakeRegisteredUser({
      email: 'admin@test.com',
      emailVerified: true,
      creationDate: new Date( '2017-01-01' ).getDate(),
      lastLogin: new Date( '2017-01-03' ).getDate(),
      customData: { role: 'admin' },
      id: 'testAdminUser',
    })
    .fakeRegisteredUser({
      email: 'user@test.com',
      emailVerified: true,
      creationDate: new Date( '2017-01-01' ).getDate(),
      lastLogin: new Date( '2017-01-03' ).getDate(),
      customData: { role: 'experimenter' },
      id: 'testNormalUser',
    })
  )
  setTimeout(
    () => UserController.instance.login({ email: 'admin@test.com', password: '' }),
    300
  )
}

// if ( runMode === 'emulators' ) {
//   FirebaseHelper.setFirebaseConfig({
//     projectId: 'demo-test',
//     storageBucket: 'default-bucket'
//   })
//   FirebaseHelper.useEmulator({ 
//     firestorePort: 9080,
//     authPort: 9099,
//     storagePort: 9199
//   })
//   Store.useDataSource( new FirebaseDatasource() )
//   CloudStorage.useCloudStorage( new FirebaseCloudStorage() )
//   Auth.registerAuthService( new FirebaseAuth() )
// }

// if ( runMode === 'beta') {
//   FirebaseHelper.setFirebaseConfig({
//     apiKey: "AIzaSyCwXqU6nNfHIZ91K8ccCnWxo_-1mWdp4sw",
//     authDomain: "beta-experience-manager.firebaseapp.com",
//     projectId: "beta-experience-manager",
//     storageBucket: "beta-experience-manager.appspot.com",
//     messagingSenderId: "798331690652",
//     appId: "1:798331690652:web:b90680739c3f59ea649759"
//   })
//   Store.useDataSource( new FirebaseDatasource() )
//   CloudStorage.useCloudStorage( new FirebaseCloudStorage() )
//   Auth.registerAuthService( new FirebaseAuth() )
// }

// if ( runMode === 'production') {
//   FirebaseHelper.setFirebaseConfig({
//     apiKey: "AIzaSyCwXqU6nNfHIZ91K8ccCnWxo_-1mWdp4sw",
//     authDomain: "beta-experience-manager.firebaseapp.com",
//     projectId: "beta-experience-manager",
//     storageBucket: "beta-experience-manager.appspot.com",
//     messagingSenderId: "798331690652",
//     appId: "1:798331690652:web:b90680739c3f59ea649759"
//   })
//   Store.useDataSource( new FirebaseDatasource() )
//   CloudStorage.useCloudStorage( new FirebaseCloudStorage() )
//   Auth.registerAuthService( new FirebaseAuth() )
// }

Locale.config({
	localePath: 'locales' 
})

render(<MainPanel/>, document.getElementsByTagName('App')[0]);
