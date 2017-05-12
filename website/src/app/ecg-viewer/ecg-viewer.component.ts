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
  currentPosition;
  currentECG;
  Xaxis
  

  
   public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



  constructor(public af: AngularFire) {
    af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth

        this.itemsobservable = af.database.list('userstorage/users/' + this.user.uid);      
        this.itemsobservable.subscribe(succes => {
          this.ECGs = succes;
          for(let item of succes){
            this.ECGnames.push(item.$key)
          }
        })
      }
      else {
        this.error = 'Could not find uid from user';
      }
    })
  }


  ngOnInit() {
  }

   selectionChanged(deviceValue) {
    console.log(deviceValue);
    this.currentPosition = this.ECGnames.indexOf(deviceValue);
    this.currentECG = this.ECGs[this.currentPosition];
    
    this.getXaxis(this.currentECG)
  }

  getXaxis(ECG){
    let period, xaxis = [];
    period = 1/ECG.measurement1.frequency;
    console.log(ECG.measurement1.sensor1.length)
    
    for(let i = 0 ; i< ECG.measurement1.sensor1.length ; i++){

      if(i == 0){
        xaxis[i] = 0
      }else{
        xaxis[i] = xaxis[i-1] + period;
      }

    }

    alert(xaxis)




  }

  

  

}
