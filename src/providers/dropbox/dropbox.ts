import { DropboxEndpoints } from './dropbox-endpoints';
import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DropboxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DropboxProvider {

  accessToken: any;
  folderHistory: any = [];
  appKey: any;
  redirectURI: any;
  url: any;

  constructor(public http: Http, private dropboxEndPoints: DropboxEndpoints, public inAppBrowser: InAppBrowser)  {
    this.appKey = 'u09y8m9ka2dd1ta';
    //this.redirectURI = 'http://localhost';
    this.redirectURI = ( window.location.protocol && window.location.host ? window.location.protocol + '//' + window.location.host : 'http://localhost' );
    console.log('REDIRECT URI');
    console.log(this.redirectURI);
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
  }

  setAccessToken( token ){ 
    this.accessToken = token;
  }

  getHeaders() {
    let headers = new Headers();

    headers.append( 'Authorization', 'Bearer ' + this.accessToken );
    headers.append( 'Content-Type', 'application/json' );

    return headers;
  }

  getFileHeaders( dbApiArg: any ) {
    let headers = new Headers();

    headers.append( 'Authorization', 'Bearer ' + this.accessToken );
    headers.append( 'Dropbox-API-Arg', JSON.stringify(dbApiArg) );

    return headers;
  }

  post( url: string, data? ) {
    let headers = this.getHeaders();

    return this.http.post( url, JSON.stringify(data), { headers: headers } )
      .map( res => res.json() );
  }

  filePost( url: string, dbApiArg: any ) {
    let headers = this.getFileHeaders( dbApiArg );
    
    return this.http.post( url, null, { headers: headers, responseType: ResponseContentType.Blob } )
      .map( res => res );
  }

  getUserInfo() {
    let url = this.dropboxEndPoints.GET_USER_INFO;
    let data = "null";
    return this.post( url, data );
  }

  getFolders(path?) {
    let url = this.dropboxEndPoints.LIST_FOLDER;

    let folderPath;

    if( !path ) { 
      folderPath = {
        path: ""
      };
    }
    else {
      folderPath = {
        path: path
      };

      if( this.folderHistory[this.folderHistory.length - 1] != path ) {
        this.folderHistory.push(path);
      }
    }

    return this.post( url, folderPath );
  }

  goBackFolder() {
    if( this.folderHistory.length > 0 ) {
      this.folderHistory.pop();
      let path = this.folderHistory[this.folderHistory.length - 1];
      
      return this.getFolders(path);
    }
    else {
      return this.getFolders();
    }
  }

  downloadFile(fileId) {
    let dbApiArg = {
      "path": fileId
    }
    return this.filePost( this.dropboxEndPoints.DOWNLOAD_FILE, dbApiArg );
  }

  login(loading) {
    return new Promise( (resolve, reject) => {
      loading.dismiss();
      let browserType = ( document.URL.startsWith('http') ? '_self' : '_blank' );
      //let browser = this.inAppBrowser.create(this.url, '_blank', 'hidden=no,location=no,clearsessioncache=yes');
      let browser = this.inAppBrowser.create(this.url, browserType, 'hidden=no,location=no');

      let listener = browser.on('loadstart').subscribe( (event: any) => {
        console.log('EVENT');
        console.log(event);

        //Ignore the dropbox authorize screen
        if( event.url.indexOf('oauth2/authorize') > -1 ) {
          console.log('OAUTH2/AUTHORIZE');
          return;
        }

        if( event.url.indexOf(this.redirectURI) > -1 ) {
          listener.unsubscribe();
          browser.close();
          let token = event.url.split("=")[1].split("&")[0];
          console.log('token');
          console.log(token);
          this.accessToken = token;
          resolve(event.url);
        }
        /*else {
          reject("Could not authenticate");
        }*/

      });
    });

  }

}
