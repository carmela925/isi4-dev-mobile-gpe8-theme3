import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  /*This service keeps informations in the phone such as 
  * user credentials so he won't have to login again before a certain amount of time
  * routes so that the user can use the map offline
  * time table because for now it is an offline functionality
  * saved past questions 
  * subjects of the user
  */

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }
}
