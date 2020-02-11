import { Component, Input, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../../async-validators/mime-type.validator';
import { DefectService } from '../../services/defect.service';

@Component({
  selector: 'app-defect-raise-bulk',
  templateUrl: './defect-raise-bulk.component.html',
  styleUrls: ['./defect-raise-bulk.component.css']
})

export class DefectRaiseBulkComponent implements OnInit {
  @Input() projectId: string;
  defectForm: FormGroup;
  documentValidFlag = false;
  fileContent: any[] = [];

  constructor(private defectService: DefectService) {}

  ngOnInit() {
    this.defectForm = new FormGroup({
      file: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onDocumentPicked(event: Event) {
    const file = (event.target as HTMLInputElement ).files[0];
    // tslint:disable-next-line: object-literal-shorthand
    this.defectForm.patchValue({file: file});
    this.defectForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const name = file.name;
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'csv') {
      this.documentValidFlag = false;
    } else {
      this.documentValidFlag = true;
    }
  }

  onSaveDocument() {
    this.defectService.bulkDefectUpload(this.projectId, this.defectForm.value.file)
      .subscribe(response => {
        console.log(response);
      });
  }

  onTemplateDownload() {
    this.defectService.onTemplateDownload();
  }

  isDocumentValid() {
    return this.documentValidFlag;
  }

}
