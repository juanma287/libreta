import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavController, AlertController, LoadingController} from "ionic-angular";
import { AuthService } from '../../services/auth.service';

import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  // variables
  form: FormGroup;
  erroresRegistro: string;
  
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loading: LoadingController,
    fb: FormBuilder,
    private auth: AuthService
    ) 
  {
      this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // register and go to home page
  register() {

    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };

    let loader = this.loading.create({  content: 'Pocesando, espere por favor…',  });
      loader.present().then(() => {
         
         // REGISTRO
          this.auth.signUp(credentials).then(
            () => this.navCtrl.setRoot(HomePage),
            error => this.erroresRegistro = "Datos incorrectos"
          );
          // finalizo loader
          loader.dismiss()             
        });
      
}


 // vamos al login 
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
