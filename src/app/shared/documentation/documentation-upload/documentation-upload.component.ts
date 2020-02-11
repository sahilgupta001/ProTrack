import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { mimeType } from '../../async-validators/mime-type.validator';
import { DocumentService } from '../../services/document.service';

@Component ({
  selector: 'app-document-upload',
  templateUrl: './documentation-upload.component.html',
  styleUrls: ['./documentation-upload.component.css']
})

export class DocumentationUploadComponent implements OnInit {
  @Input() projectId: string;
  documentErrorFlag = false;
  documentSuccessFlag = false;
  uploadForm: FormGroup;
  userId: string;
  message: string;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  isDocumentValid() {
    return this.documentErrorFlag;
  }
  isDocumentSuccess() {
    return this.documentSuccessFlag;
  }

  onDocumentPicked(event: Event) {
    const file = (event.target as HTMLInputElement ).files[0];
    // tslint:disable-next-line: object-literal-shorthand
    this.uploadForm.patchValue({file: file});
    this.uploadForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(reader.readAsDataURL(file));
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  onSaveDocument(type: string) {
    if (this.uploadForm.invalid) {
      this.documentErrorFlag = true;
    } else {
      this.documentErrorFlag = false;
      this.userId = this.getUserId();
      this.documentService.uploadDocument(this.userId, this.projectId, type , this.uploadForm.value.description, this.uploadForm.value.file)
      .subscribe((response) => {
        console.log(response.message);
        this.message = response.message;
        this.uploadForm.reset();
        this.documentSuccessFlag = true;
      });
    }
  }
}
