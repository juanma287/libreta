import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavController, AlertController, ToastController, MenuController, LoadingController} from "ionic-angular";
import { AuthService } from '../../services/auth.service';

import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  // variables
  loginForm: FormGroup;
  loginError: string;
 

  constructor(
    public nav: NavController, 
    public forgotCtrl: AlertController,
    public alertCtrl: AlertController,
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public loading: LoadingController,
    private auth: AuthService,
    fb: FormBuilder
    )

  {
    this.menu.swipeEnable(false);
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }


  // MÉTODOS

  // Si presiona crear nuevo usuario, lo re-dirigimos a dicha pagina
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login 
  login() {

   let data = this.loginForm.value;
   let credentials = {
      email: data.email,
      password: data.password
    };

   let loader = this.loading.create({  content: 'Pocesando, espere por favor…',  });
   loader.present().then(() => {
         
       // AUTENTICACION
       this.auth.signInWithEmail(credentials)
      .then(() => this.nav.setRoot(HomePage),
        error => this.loginError = "Datos de ingreso incorrectos"
      );
      // finalizo loader
      loader.dismiss()            
           
        });
           // luego del log enviamos al usuario a la home page
       // this.nav.setRoot(HomePage);
    } 

  // ingresar con google
  loginWithGoogle() {
  this.auth.signInWithGoogle()
    .then(() => this.nav.setRoot(HomePage),
    error => this.loginError = "Datos de ingreso incorrectos"
    );
  }


// resetar pass
 forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
