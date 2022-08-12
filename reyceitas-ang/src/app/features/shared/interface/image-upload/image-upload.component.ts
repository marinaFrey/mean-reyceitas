import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '@services/file-upload.service';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() requiredFileType: string | null = null;
  fileName = '';
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  constructor(private fileUploadService: FileUploadService){}

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(event, file)
    if (file) {
      this.uploadSub = this.fileUploadService.upload(file).pipe(
        finalize(() => this.reset())
      ).subscribe(event => {
        console.log(event); /*
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } */
      })
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
