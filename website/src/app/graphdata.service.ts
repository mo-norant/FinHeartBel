import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { TestData } from './testdata';

@Injectable()
export class GraphdataService {
  user;
  
  constructor(public af: AngularFire) { 

    this.af.auth.subscribe(user => {

      if(user){
        this.user = user;
        
        
      }
      else{
          this.user = undefined;

      }

    })

  }


  writetodatabase(){

  if(this.user){
    const promise = this.af.database.object('/data/'+this.user.uid).set(TestData);
      promise.then(_ => console.log('success+ /data/'+this.user.uid))
       .catch(err => console.log(err, 'You dont have access!'));
  }

  }


}
