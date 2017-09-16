import { TabsPage } from './../tabs/tabs';
import { DropboxProvider } from './../../providers/dropbox/dropbox';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public dropboxProvider: DropboxProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
    //DROPBOX AUTH
    /*if( window.location.hash ) {
      let token = window.location.hash.split("=")[1].split("&")[0];
      console.log('WINDOW HASH TOKEN: ' + token);
      if( token ) {
        this.dropboxProvider.setAccessToken(token);
        this.navCtrl.setRoot(TabsPage);
      }
    } */
  }

  //DROPBOX LOGIN
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
  }

}
