import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-ecg-viewer',
  templateUrl: './ecg-viewer.component.html',
  styleUrls: ['./ecg-viewer.component.css']
})
export class ECGViewerComponent implements OnInit {

  itemsobservable: FirebaseListObservable<any>;
  ECGnames = [];
  user;
  error;
  ECGs;
  



  constructor(public af: AngularFire) {
    af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth

        this.itemsobservable = af.database.list('userstorage/users/' + this.user.uid);      
        this.itemsobservable.subscribe(succes => {
          for(let item of succes){
            this.ECGnames.push(item.$key)
          }
          console.log(this.ECGnames)
        })
      }
      else {
        this.error = 'Could not find uid from user';
      }
    })
  }


  ngOnInit() {
  }

}
