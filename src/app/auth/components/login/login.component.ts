import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { environment } from '../../../../environments/environment';
import { InputComponent } from "../../../shared/components/form/input/input.component";
import { InputPasswordComponent } from "../../../shared/components/form/input-password/input-password.component";
declare const google: any;
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [ReactiveFormsModule, InputComponent, InputPasswordComponent]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService
  ){}

  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
  })

  get f() {
    return this.form.controls;
  }

  get pass() {
    return this.form.get('password');
  }

  getErrorMessage( idControl: string): string {
    const control = this.form.get(idControl)

    if(control){
      if (control.hasError('required')) {
        return 'This field is required';
      }
  
      if (control.hasError('pattern')) {
        return 'This value is not compatible with the expected format'
      }
      return 'This field has an error'
    } else {
      return ''
    }
  }

  onSubmit() {
    // console.log(this.form.value);
    console.log('form =- ', this.form)
    if(this.form.valid){
      const formData = {
        email: this.form.value.email || '',
        password: this.form.value.password || ''
      }
      
      this.authService.login(formData).subscribe((response) => {
        if(response.success){
          this.router.navigate([`/stats`])
        } else {
        //error login snackbar
          this.notify.open({
            title: 'Error en Ingreso',
            message: `${response.message}`,
            clase: 'error'
          });
        }
      })
    }
  }


}
