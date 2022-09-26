import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MembersConnected, TokenDTO } from '../../Models';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  fg! : FormGroup
  MemberConnected! : MembersConnected
  items: MenuItem[]  = []
  constructor(private _router : Router, private _authServices : AuthService, private _formBuilder : FormBuilder) { 
   
  }

  ngOnInit(): void {

    this.fg = this._formBuilder.group(
      {
        Login : [null,Validators.required],
        Password : [null,Validators.required]
      }
    )
    if(localStorage.getItem('Connect') === 'true'){
      this._router.navigate([''])
    }
    
  }

  hasError(myForm : FormGroup, inputName : string, validator : string) : boolean | undefined {
    return myForm.get(inputName)?.hasError(validator) && (myForm.get(inputName)?.touched|| (myForm.get(inputName)?.dirty))
  }

  submit(){
    if(this.fg.invalid){
      return;
    }
    this._authServices.login(this.fg.value)
    }

  
  test(){
    // this.msgs = [{severity:'error', summary:'Success', detail:'Message Content'}]
  }

  
}
