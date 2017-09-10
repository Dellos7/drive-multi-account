import { Injectable } from '@angular/core';

@Injectable()
export class DropboxEndpoints {

    API_BASE : string = 'https://api.dropboxapi.com/2/';
    CONTENT_BASE: string = 'https://content.dropboxapi.com/2/';

    GET_USER_INFO: string = this.API_BASE + 'users/get_current_account';
    LIST_FOLDER: string = this.API_BASE + 'files/list_folder';
    DOWNLOAD_FILE: string = this.CONTENT_BASE + 'files/download';

}