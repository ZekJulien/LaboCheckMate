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

  CheckPseudoAPI(control : FormControl) : Promise<any> | Observable<any>{
    const response = new Promise((resolve, reject) =>{
      setTimeout(() =>{
        if (control.value === '') {
          resolve({CheckPseudo: true})
        }else{
          resolve(null)
        }
      },500)
    });
    return response;
  }



}


// export class UsernameValidator {
//   static createValidator(pseudo: RegistrationComponent): AsyncValidatorFn {
//     return (control: AbstractControl): Observable<ValidationErrors> => {
//       return pseudo
//         .checkIfUsernameExist(control.value)
//         .pipe(
//           map((result: boolean) =>
//             result ? { usernameAlreadyExists: true } : null
//           )
//         );
//     };
//   }
// }



function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
          return { 'ageRangeValidator': true };
      }
      return null;
  };
}


function test(pseudo : string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value.toString() === pseudo )) {
          return { 'test': true };
      }
      return null;
  };
}

export function gte(control: AbstractControl): 
         Observable<ValidationErrors> | null {
 
    const v:number=+control.value;
 
    console.log(v)
    
    if (isNaN(v)) {
      return of({ 'gte': true, 'requiredValue': 10 })
    }      
 
    if (v <= 10) {
      return of({ 'gte': true, 'requiredValue': 10 })
    } 
 
    return (null)
 
}


