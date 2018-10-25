import {Component, ViewChild} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

 // variables
  @ViewChild('email') email;
  @ViewChild('username') username;
  @ViewChild('password') password;
  data:string;
  
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    private http: Http, 
    public loading: LoadingController
    ) 
  {

  }

  // register and go to home page
  register() {

    if(this.username.value=="")
    {
      let alert = this.alertCtrl.create({
      title:"ATENTION",
      subTitle:"El nombre de usuario no puede estar vacio",
      buttons: ['OK']
      });
      alert.present();
  } 
  else if(this.email.value == "")
  {
      let alert = this.alertCtrl.create({
      title:"ATENTION",
      subTitle:"El email no puede estar vacio",
      buttons: ['OK']
      });
      alert.present();
}

 else if(this.password.value== "")
 {
      let alert = this.alertCtrl.create({
      title:"ATENTION",
      subTitle:"La contraseña no puede estar vacia",
      buttons: ['OK']
      });
      alert.present();
}
else
{

      var headers = new Headers()
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });
      let data = {
          username: this.username.value,
          password: this.password.value,
          email: this.email.value
       };


      let loader = this.loading.create({
            content: 'Pocesando, espere por favor…',
       });

      loader.present().then(() => { this.http.post('http://localhost:80/libreta_virtual_ionic/src/api/register.php',data,options).map(res => res.text())
      .subscribe(res => {
      console.log(res)
      loader.dismiss()
       
      if(res== "Registro exitoso!")
       {
          let alert = this.alertCtrl.create({
          title:"CONGRATS",
          subTitle:(res),
          buttons: ['OK']
        });
       alert.present();
       // lo enviamos a la home page 
   //   this.navCtrl.setRoot(HomePage);

      }
      else
      {
        let alert = this.alertCtrl.create({
        title:"ERROR",
        subTitle:(res),
        buttons: ['OK']
        });
        alert.present();
      }
     });
    });
 } // fin else

   // luego de registrarse lo enviamos a la home page
  // this.navCtrl.setRoot(HomePage);
}


 // vamos al login 
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
