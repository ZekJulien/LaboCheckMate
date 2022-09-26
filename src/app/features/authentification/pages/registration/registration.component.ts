import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Password } from 'primeng/password';
import { delay, map, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  fg! : FormGroup
  Gender: any[] = [];

  pseudo : string = 'test'

  constructor(private _authServices : AuthService, private _formBuilder : FormBuilder) { 
    
  }

  ngOnInit(): void {

    this._authServices.StateSubjectCheckPseudo.subscribe({
      next : (data : string) => this.pseudo = data
    })

    
    this.fg = this._formBuilder.group(
      {
        Pseudo : [null,Validators.required, test(this.pseudo)],
        Email : [null,[Validators.required, RxwebValidators.email()]],
        Password : [null,[Validators.required]],
        ConfirmPassword : [null, RxwebValidators.compare({fieldName : 'Password'})],
        BirthDate : [null,Validators.required],
        GenderID : [null,Validators.required],
      }),
      this.Gender = [
        {name: 'Garcon', value: 1},
        {name: 'Fille ', value: 2},
        {name: 'Autre ', value: 3}
      ]
      
      console.log(this.pseudo);
  }

  hasError(myForm : FormGroup, inputName : string, validator : string) : boolean | undefined {
   
    return myForm.get(inputName)?.hasError(validator) && (myForm.get(inputName)?.touched|| (myForm.get(inputName)?.dirty))
  }

  submit(){
    console.log('test');
    
    console.log(this.fg);
    
    if(this.fg.invalid){
      this.validateAllFormFields(this.fg)
      return
    }
    this._authServices.NewMembers(this.fg)
  }

 PseudoCheck(value : any){
  console.log(value);
  
  this._authServices.PseudoCheck(value)
  console.log(this.pseudo);
  
 }


  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);           
      }
    });
  }



}




