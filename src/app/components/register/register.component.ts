import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,   
    private router: Router,
    private flashMsg: FlashMessagesService,  
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.email, this.password).then(res => {
      this.flashMsg.show('You are now registered and logged in', {
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/'])
    }).catch(err => {
      if(err.code == 'auth/weak-password') {
        alert('The password is too weak. Must be at least 6 characters');
      } else {
      this.flashMsg.show(err.message, {
        cssClass: 'alert-danger', timeout: 6000
      })};
    })
  }

  

}
