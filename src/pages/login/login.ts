import { HomePage } from './../home/home';
import { TabsPage } from './../tabs/tabs';
import { DropboxProvider } from './../../providers/dropbox/dropbox';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dropboxProvider: DropboxProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if( window.location.hash ) {
      let token = window.location.hash.split("=")[1].split("&")[0];
      if( token ) {
        this.dropboxProvider.setAccessToken(token);
        this.navCtrl.setRoot(TabsPage);
      }
    } 
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();

    this.dropboxProvider.login(loading).then(
      (success) => {
        console.log('RESOLVE SUCCESS');
        console.log(success);
        this.navCtrl.setRoot(TabsPage);
      },
      (err) => {
        console.log('RESOLVE ERROR');
        console.log(err);
      }
    );

    /*this.dropboxProvider.login(loading, 
      res => {
        if( res ) {
          console.log('RESOLVE SUCCESS');
          console.log(res);
          this.navCtrl.setRoot(TabsPage);
        }
        else {
          console.log('RESOLVE ERROR');
          console.log(res);
        }
      }
    );*/
  }

}
