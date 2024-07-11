import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { environment } from '../../../../environments/environment';
import { InputComponent } from '../../../shared/components/form/input/input.component';
import { InputPasswordComponent } from "../../../shared/components/form/input-password/input-password.component";
declare const google: any;
@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [ ReactiveFormsModule, InputComponent, InputPasswordComponent]
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService
  ){}

  isLoading: boolean = false
  repeatValid: boolean = false
  showPass: boolean = false
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    type_person: new FormControl('person'),
    role: new FormControl('user_person'),
    password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    repeat_password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    accept_terms: new FormControl(false, [Validators.requiredTrue])
  })

  ngOnInit(): void {
    this.validRepeatPassInvalid()
  }

  get f() {
    return this.form.controls;
  }

  get pass() {
    return this.form.get('password');
  }

  acceptTerms(event: any){
    console.log('event = ', event)
    if(event){
      this.form.get('accept_terms')?.setValue(true)
      this.form.updateValueAndValidity()
    
    } else {
      this.form.get('accept_terms')?.setValue(false)
      this.form.updateValueAndValidity()
    }
  }

  validRepeatPassInvalid() {
    this.form.get('repeat_password')?.valueChanges.subscribe((pass) => {
      if(pass !== this.form.get('password')?.value){
        return this.repeatValid = false
      } else {
        return this.repeatValid = true
      }
    })
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


  submit() {
    if(this.form.valid){
      this.isLoading = true

      const formData = {
        email: this.form.value.email || '',
        password: this.form.value.password || '',
        type_person: this.form.value.type_person || '',
        role: this.form.value.role || ''
      }

      this.authService.register( formData ).subscribe((response) => {
        this.isLoading = false
        if(response.success){
          this.form.reset()
          this.notify.open({
            title: 'Success Register',
            message: `We send you an Email to validate your account.`, 
            clase: 'success'
          });
          this.router.navigate(['/auth/login'])
        } else {
        this.notify.open({
          title: 'Fail Register',
          message: `${response.message}`, 
          clase: 'error',
         // time: '500000'
        });
        }
      })
    }
  }


}
