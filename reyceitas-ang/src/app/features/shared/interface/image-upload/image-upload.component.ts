import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileUploadService } from '@services/file-upload.service';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() formControl!: FormControl;
  @Input() requiredFileType: string | null = null;
  @Output() uploaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleted: EventEmitter<any> = new EventEmitter<any>();

  fileName = '';
  imagePreview: string | ArrayBuffer | null = null;
  alreadyUploadedImage: boolean = false;

  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  constructor(private fileUploadService: FileUploadService){}

  ngOnInit(): void {
    if(this.formControl.value != null) {
      this.imagePreview = this.formControl.value;
      this.alreadyUploadedImage = true;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.setImagePreview(file);
    if (file) {
      this.uploadSub = this.fileUploadService.upload(file).pipe(
        finalize(() => this.reset())
      ).subscribe(event => {
        this.fileName = file.name;
        this.formControl.setValue(event)
        //this.uploaded.emit(event as string);
        console.log(event); 
        
        
        /*
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } */
      })
    }
  }

  deleteFile() {
    this.deleted.emit();
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  private setImagePreview(file: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
        this.imagePreview = reader.result; 
    }
  }

}
