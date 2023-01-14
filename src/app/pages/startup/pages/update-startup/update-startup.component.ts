import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StartupsService } from 'src/app/core/services/satrtup/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-startup',
  templateUrl: './update-startup.component.html',
  styleUrls: ['./update-startup.component.css'],
})
export class UpdateStartupComponent implements OnInit {
  key: string = '';
  formGroup: FormGroup;
  imgSrc: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _startupService: StartupsService,
    private _uploadService: UploadService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      city: null,
      emailAddress: [null, [Validators.email, Validators.required]],
      logo: null,
      name: [null, [Validators.required]],
      numberOfEmployees: null,
      sectors: [null, [Validators.required]],
      websiteUrl: [null, [Validators.required]],
      yearOfEstablish: null,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result) => {
      if (result['key']) {
        this.key = result['key'];
        this.getById();
      }
    });
  }

  getById() {
    this._startupService.getById(this.key).subscribe((result:any) => {
      this.formGroup = this.formBuilder.group({
        city: result['city'],
        emailAddress: [result['emailAddress'], [Validators.email, Validators.required]],
        logo: result['logo'],
        name: [result['name'], [Validators.required]],
        numberOfEmployees: result['numberOfEmployees'],
        sectors: [result['sectors'], [Validators.required]],
        websiteUrl: [result['websiteUrl'], [Validators.required]],
        yearOfEstablish: result['yearOfEstablish'],
      })
      this.imgSrc = result['logo'];
    });
  }

  getErrorMessage(control: any) {
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'You must enter a value';
      }
      if (control.hasError('email')) {
        return 'Not a valid email';
      }
    }
    return '';
  }

  onUpdateClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      } else {
        this.updateStartup();
      }
    }
    this.router.navigate(['/startup/all-startup']);
  }
  upload() {
    this._uploadService
      .upload(this.formGroup.controls['logo'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }

  getDownloadURL() {
    this._uploadService.getDownloadURL().subscribe((url) => {
      console.log();
      this.formGroup.controls['logo'].setValue(url);
      this.updateStartup();
    });
  }

  updateStartup() {
    this._startupService
      .update(this.key, {
        name: this.formGroup.controls['name'].value,
        emailAddress: this.formGroup.controls['emailAddress'].value,
        websiteUrl: this.formGroup.controls['websiteUrl'].value,
        sectors: this.formGroup.controls['sectors'].value,
        city: this.formGroup.controls['city'].value,
        numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
        logo: this.formGroup.controls['logo'].value,
        yearOfEstablish: this.formGroup.controls['yearOfEstablish'].value,
      })
      .then(() => {
        this.location.back();
      });
  }

  onFileInputChange($event: any) {
    console.log($event);
    this.formGroup.controls['logo'].setValue($event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['logo'].value);
  }

  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
