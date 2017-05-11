import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import * as firebase from 'firebase';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-uploadzone',
  templateUrl: './uploadzone.component.html',
  styleUrls: ['./uploadzone.component.css']
})
export class UploadzoneComponent implements OnInit {

  @Input() percentage: number = 100;

  items: FirebaseListObservable<any>;
  date = []
  uid;  
  error;
  succesDialog = false;

  constructor(public af: AngularFire) {
    af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;

        this.items = af.database.list('userstorage/users/' + this.uid);
        
        

        
        

      }
      else {
        this.error = 'Could not find uid from user';
      }
    })



  }


  ngOnInit() {
  }


  

  public fileChangeEvent(fileInput: any) {

    this.af.auth.subscribe(auth => {
      if (auth) {

        var file = fileInput.target.files[0]; // FileList object
        if (file) {


          var reader = new FileReader();

          reader.onload = function (e) {

            var json = JSON.parse(reader.result);
            console.log(json);
            moment().locale('nl');
            let now = moment().format('LLL');
      
            var ref = firebase.database().ref("userstorage/users/").child(auth.uid + "/" + now).set(json, function (error) {
              if (error) {
                alert("data not pushed to server" + error)
              } else {
                console.log('data pushed')
              }
            });
            
            


          }

          reader.readAsText(file);

        }



      }




    })



  }
}