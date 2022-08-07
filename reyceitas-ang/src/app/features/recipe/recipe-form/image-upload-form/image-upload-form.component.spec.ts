import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadFormComponent } from './image-upload-form.component';

describe('ImageUploadFormComponent', () => {
  let component: ImageUploadFormComponent;
  let fixture: ComponentFixture<ImageUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
