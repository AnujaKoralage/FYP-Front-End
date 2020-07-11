import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {NewHttpService} from '../../shared/services/custom.new.http.service';
import {UserTypeEnum} from '../../shared/enum/userType.enum';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private http: NewHttpService,
              private router: Router) { }

  public username = '';
  public email = '';
  public password = '';
  public confirmPassword = '';
  public termsConditionsError;
  public nameFeildError = true;
  public nameFeildErrorMessage = '';
  public passwordError = true;
  public passwordErrorMessage = '';
  public scope;

  ngOnInit() {
  }
  onSubmit() {
    if (this.email !== '' && this.email !== undefined && this.username !== '' && this.username !== undefined && this.password !== '' && this.password !== undefined) {
      const params = {
        email: this.email,
        username: this.username,
        password: this.password
      };
      console.log(UserTypeEnum.INVESTOR);
      if (this.scope) {
        this.userService.createNewUser(UserTypeEnum.TRADER, params).subscribe(value => {
          this.http.getAccessToken(params.username, params.password).subscribe(value1 => {
            this.router.navigate(['/dashboard']);
          });
        });
      } else {
        this.userService.createNewUser(UserTypeEnum.INVESTOR, params).subscribe(value => {
          this.http.getAccessToken(params.username, params.password).subscribe(value1 => {
            this.router.navigate(['/dashboard']);
          });
        });
      }
    }
  }
  tns(event) {
    this.termsConditionsError = event.target.checked;
  }
  checkScope(event) {
    this.scope = event.target.checked;
  }
  checkUsername(event) {
    if (event.target.value.length > 3) {
      if (this.scope) {
        this.userService.checkUsername('trader', event.target.value)
          .subscribe(value => {
            if (!value) {
              this.nameFeildError = false;
              this.nameFeildErrorMessage = 'Username Already Taken';
            } else {
              this.nameFeildError = true;
            }
          });
      } else {
        this.userService.checkUsername('investor', event.target.value)
          .subscribe(value => {
            if (!value) {
              this.nameFeildError = false;
              this.nameFeildErrorMessage = 'Username Already Taken';
            } else {
              this.nameFeildError = true;
            }
          });
      }
    } else {
      this.nameFeildError = true;
      this.nameFeildErrorMessage = 'Need More Characters Idiot';
    }
  }
  checkUserPassword(event) {
    if (event.target.value.length < 6) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Please provide required length';
    } else {
      if (this.password !== this.confirmPassword) {
        this.passwordError = true;
        this.passwordErrorMessage = 'Password mismatch';
      } else {
        this.passwordError = false;
      }
    }
  }

}
