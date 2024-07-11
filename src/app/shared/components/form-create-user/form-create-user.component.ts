import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../form/input/input.component";
import { OptionsSelect } from '../form/form.interface';
import { LocalStorageService } from '../../../services/localStorage/localstorage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Training, TrainingCreate } from '../../../interfaces/training.interface';
import { InputPasswordComponent } from "../form/input-password/input-password.component";

@Component({
    selector: 'app-form-create-user',
    standalone: true,
    templateUrl: './form-create-user.component.html',
    styleUrl: './form-create-user.component.scss',
    imports: [InputComponent, ReactiveFormsModule, AsyncPipe, InputPasswordComponent]
})
export class FormCreateUserComponent implements OnInit {

  form: FormGroup = this.fb.group({})
  optionsModelGenerator$: Observable<OptionsSelect[]> = of([])
  optionsDocsTrainingAnswer: OptionsSelect[] = []
  showNameExpected: boolean = false
  loadingButton: boolean = false
  messageNeedConfig: boolean = true
  @Output() saveFrom: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(){
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: this.fb.control('', Validators.required)
    })
  }

  async onSubmit(){
    if(this.form.valid){
      this.loadingButton = true

      this.apiService.createUser(
        this.form.value.email,
        this.form.value.name,
        this.form.value.password
      ).subscribe((res) => {
        if(res.success){
          this.loadingButton = false
          this.notificationService.open({
            title: `Creacion Exitosa!`,
            message: `El Closer ${this.form.value.name} fue creado con exito!`,
            clase: 'success'
          })
  
          this.form.reset()
          this.saveFrom.emit(true)
        } else {
          this.loadingButton = false
          this.notificationService.open({
            title: `Ocurrio un Error`,
            message: `${res.message}`,
            clase: 'error'
          })

          this.form.reset()
        }
      })
    }
  }

}
