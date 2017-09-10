import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

import { DropboxProvider } from './../../providers/dropbox/dropbox';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Injectable()
export class FileProvider {

  constructor( private dropboxProvider: DropboxProvider, 
    private file: File, private fileOpener: FileOpener, public platform: Platform ) {
  }


  getFileExtension(fileName) {
    let split = fileName.split(".");
    if( split && split.length > 0 ) {
      return split[split.length - 1];
    }
    return "";
  }

  getMymeType(blob, fileName) {
    let mymeType;
    switch(this.getFileExtension(fileName)) { 
      case "mobi":
        mymeType = "application/x-mobipocket-ebook";
        break;
      case "epub":
        mymeType = "application/epub+zip";
        break;
      default:
        mymeType = blob.type;
        break;
    }
      return mymeType;
  }

  downloadFile(fileId, fileName, callback) {
    var self = this;
    this.dropboxProvider.downloadFile(fileId).subscribe(
      data => {
        console.log('DOWNLOAD DATA');
        console.log(data);
        let blob = new Blob([data.blob()], { type: data.headers.get('Content-Type') });

        //We may be on web
        //if( !self.platform.is('ios') && !self.platform.is('android') ) {
        console.log('DOCUMENT URL STARTS WITH HTTP');
        console.log(document.URL.startsWith('http'));
        if( document.URL.startsWith('http') ) {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.hidden = true;
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
          callback(true);
        }
        else { //ios, android
          this.file.writeFile( self.file.cacheDirectory, fileName, blob ).then(
            writeFileRes => {
              if( writeFileRes ) {
                console.log('WRITE FILE SUCCESS');
                console.log(writeFileRes);
                self.fileOpener.open( self.file.cacheDirectory + '/' + fileName, self.getMymeType(blob, fileName) ).then(
                  openFileRes => {
                    console.log('OPEN FILE SUCCESS');
                    console.log(openFileRes);
                    callback(true);
                  },
                  openFileErr => {
                    console.log('OPEN FILE ERROR');
                    console.log(openFileErr);
                    callback(false);
                  }
                )
              }
            },
            writeFileErr => {
              console.log('WRITE FILE ERROR');
              console.log(writeFileErr);
              if( writeFileErr && writeFileErr.message === "PATH_EXISTS_ERR" ) {
                self.fileOpener.open( self.file.cacheDirectory + '/' + fileName, self.getMymeType(blob, fileName) ).then(
                  openFileSuccess => {
                    console.log('OPEN FILE SUCCESS');
                    console.log(openFileSuccess);
                    callback(true);
                  },
                  openFileErr => {
                    console.log('OPEN FILE ERROR');
                    console.log(openFileErr);
                    callback(false);
                  }
                )
              }
            }
          );
        }
      },
      error => {
        console.log('DOWNLOAD ERROR');
        console.log(error);
        callback(false);
      }
    );
  }


}
