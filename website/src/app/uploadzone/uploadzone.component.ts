import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-uploadzone',
  templateUrl: './uploadzone.component.html',
  styleUrls: ['./uploadzone.component.css']
})
export class UploadzoneComponent implements OnInit {

  @Input() percentage: number = 100;

  constructor(public af: AngularFire) {

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
            var text = reader.result;
            console.log(text)
          }

          reader.readAsText(file);

        }



      }

      var datum = new Date().toString().replace(/ /g, '');


      // const userref = this.af.database.object("userstorage/users/" + auth.uid + "/" + datum + "&&&" + fileInput.target.files[0].name.split('.json').join("")).set();

    })



  }
}