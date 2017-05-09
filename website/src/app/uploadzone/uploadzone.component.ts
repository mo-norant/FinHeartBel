import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-uploadzone',
  templateUrl: './uploadzone.component.html',
  styleUrls: ['./uploadzone.component.css']
})
export class UploadzoneComponent implements OnInit {

  @Input() percentage: number = 50;

  constructor(public af: AngularFire) { 
    this.getECGhistory();

  }


  ngOnInit() {
  }


  public getECGhistory() {

    this.af.auth.subscribe(auth => {
      if (auth) {


        var storageRef = firebase.storage().ref();

        var userref = storageRef.child("userstorage/users/" + auth.uid + "/");
        





      }
    }

    )
  }




  public fileChangeEvent(fileInput: any) {



    this.af.auth.subscribe(auth => {
      if (auth) {
        var storageRef = firebase.database().ref();
        var datum = new Date().toString().replace(/ /g,'');
        console.log(datum);
        var userref = storageRef.child("userstorage/users/" + auth.uid + "/" + datum + "&&&" + fileInput.target.files[0].name.split('.json').join("")).set(fileInput.target.files[0]);


       

        console.log(fileInput.target.files[0]);
      }
    });



  }
}
