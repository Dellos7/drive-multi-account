import { AuthProvider } from './../../providers/auth/auth';
import { SignupPage } from './../signup/signup';
import { ResetPasswordPage } from './../reset-password/reset-password';
import { HomePage } from './../home/home';
import { TabsPage } from './../tabs/tabs';
import { DropboxProvider } from './../../providers/dropbox/dropbox';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public dropboxProvider: DropboxProvider, 
    public loadingCtrl: LoadingController, 
    public formBuilder: FormBuilder, 
    public alertCtrl: AlertController,
    public authData: AuthProvider ) {
      this.loginForm = formBuilder.group({
        email: [ '', Validators.compose( [ Validators.required, EmailValidator.isValid ] ) ],
        password: [ '', Validators.compose( [ Validators.minLength(6), Validators.required ] ) ]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //DROPBOX AUTH
    /*if( window.location.hash ) {
      let token = window.location.hash.split("=")[1].split("&")[0];
      if( token ) {
        this.dropboxProvider.setAccessToken(token);
        this.navCtrl.setRoot(TabsPage);
      }
    } */
  }

  loginUser() {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser( this.loginForm.value.email, this.loginForm.value.password )
      .then( authData => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push( ResetPasswordPage );
  }

  createAccount(){
    this.navCtrl.push( SignupPage );
  }

}
