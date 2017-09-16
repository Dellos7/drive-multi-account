import { SettingsPage } from './../pages/settings/settings';
import { AccountsPage } from './../pages/accounts/accounts';
import { ResetPasswordPage } from './../pages/reset-password/reset-password';
import { SignupPage } from './../pages/signup/signup';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { DropboxProvider } from '../providers/dropbox/dropbox';
import { DropboxEndpoints } from '../providers/dropbox/dropbox-endpoints';
import { FileProvider } from '../providers/file/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthProvider } from '../providers/auth/auth';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBEPkmyZ-4r2LrCadZAJkcfWpbASe3PVe4",
  authDomain: "drivemultiaccount.firebaseapp.com",
  databaseURL: "https://drivemultiaccount.firebaseio.com",
  projectId: "drivemultiaccount",
  storageBucket: "drivemultiaccount.appspot.com",
  messagingSenderId: "968388576872"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AccountsPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AccountsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DropboxProvider,
    DropboxEndpoints,
    File,
    FileOpener,
    FileProvider,
    InAppBrowser,
    AuthProvider
  ]
})
export class AppModule {}
