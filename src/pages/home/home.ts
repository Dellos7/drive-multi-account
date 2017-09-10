import { DropboxProvider } from './../../providers/dropbox/dropbox';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Response } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { FileProvider } from './../../providers/file/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  depth: number = 0;
  folders: any;

  constructor(public navCtrl: NavController, public dropboxProvider: DropboxProvider, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, 
    private file: File, private fileOpener: FileOpener, private fileProvider: FileProvider) {}

  ionViewDidLoad() {
    this.loadFoldersAndFiles();
  }

  ionViewDidEnter() {
    this.loadFoldersAndFiles();
  }

  loadFoldersAndFiles() {
    //this.dropboxProvider.setAccessToken( "vlGh8cZxXvAAAAAAAAAAP2ECpsMjTyQzNih23Hd2yG2Zz0U_YCwPOQj7lb_TJgeq" );
    console.log('ACCESS TOKEN');
    console.log(this.dropboxProvider.accessToken);
    this.folders = [];

    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present();

    this.dropboxProvider.getFolders().subscribe(
      data => {
        this.folders = data.entries;
        loading.dismiss();
      },
      err => {
        console.log(err)
      });
  }

  openFolder(path) {

    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present();

    this.dropboxProvider.getFolders(path).subscribe(
      data => {
        this.folders = data.entries;
        this.depth++;
        loading.dismiss();
      },
      err => {
        console.log(err);
      }
    );

  }

  goBack() {
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present();

    this.dropboxProvider.goBackFolder().subscribe(
      data => {
        this.folders = data.entries;
        this.depth--;
        loading.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }

  getThumbnailUrlFromItem(item){
    let baseUrl = 'assets/img/'; 
    if( item['.tag'] === 'folder' ) {
      return baseUrl + 'folder.png';
    }
    else {
      return baseUrl + this.fileProvider.getFileExtension(item.name) + '.png';
    }
  }

  downloadFile(fileId, fileName) {
    var self = this;
    
    let loading = this.loadingCtrl.create({
      content: 'Opening file...'
    });

    loading.present();

    this.fileProvider.downloadFile( fileId, fileName, 
      res => {
        console.log('DOWNLOAD FILE RES');
        console.log(res);
        if( res ) {
          loading.dismiss();
        }
        else {
          loading.dismiss();
          let alert = self.alertCtrl.create({
            title: 'Error',
            subTitle: 'An error ocurred openning the file'
          });
          alert.present();
        }
      }
    );

  }

}
