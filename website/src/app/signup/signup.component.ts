import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
//import { moveIn, fallIn } from '../router.animations';



import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // animations: [moveIn(), fallIn()],
  // host: { '[@moveIn]': '' }
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  image: any;
  imageUrl: string = '';
  percentage: number = 0;

  constructor(public af: AngularFire, private router: Router) {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {

          //   var storageRef = firebase.storage().ref().child("profilepictures/" + success.uid);
          //   var task = storageRef.put(this.image);



          console.log({
            displayName: formData.value.username,
            photoURL: this.imageUrl
          })

          success.auth.updateProfile({
            displayName: formData.value.username,
            photoURL: this.imageUrl
          }).then(succes => this.router.navigate(['/members/(dashboard:dashboard)']));



        }).catch(
        (err) => {
          this.error = err;
        })
    }
  }

  public fileChangeEvent(fileInput: any) {
    this.image = fileInput.target.files[0]
  }

  ngOnInit() {
  }

}
