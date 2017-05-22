import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
//import { moveIn, fallIn, moveInLeft } from '../router.animations';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  //animations: [moveIn(), fallIn(), moveInLeft()],
 // host: { '[@moveIn]': '' }
})
export class MembersComponent implements OnInit {
  name: any;
  state: string = '';
  
  constructor(public af: AngularFire, private router: Router) {


    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
        this.name.auth.photoUrl = null;
        console.log(this.name.uid)
        this.router.navigate(['/members', {outlets: {'dashboard': 'dashboard'}}]);
      }
    });
    
    


  }



  logout() {
    this.af.auth.logout();
    this.router.navigateByUrl('/login');
  }


  delete() {

    this.af.auth.subscribe(login => {
      if(login){
        login.auth.delete().then(succes => this.logout())
      }
    })

  }

  truncate(){

        this.af.database.list('userstorage/users/' + this.name.uid).subscribe(succes => console.log(succes))
        this.af.database.list('userstorage/users/' + this.name.uid).remove().then(
          () => alert("referentie verwijderd"), error => console.log(error)
        )
  }


ngOnInit() {
 
}
}
