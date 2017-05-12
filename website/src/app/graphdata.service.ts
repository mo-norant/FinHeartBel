import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class GraphdataService {
  user;
  items;
  
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


public getReferencesECGs(){
  
return




}

  

}
