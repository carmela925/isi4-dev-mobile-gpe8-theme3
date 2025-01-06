import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private cloudinary: Cloudinary) {
  }

  getUploadUrl(): string {
    return `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/pdf/upload`;
  }
}
