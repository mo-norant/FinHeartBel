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


  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartData: Array<any> = [
    { data: [],
       label: 'ECG'
      }];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
  };
  public lineChartColors: Array<any> = [
    { // grey
      fill: false,
      borderColor: 'red',
      pointRadius: 0,
      borderWidth: 1

    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';



  constructor(public af: AngularFire) {
    af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth

        this.itemsobservable = af.database.list('userstorage/users/' + this.user.uid);
        this.itemsobservable.subscribe(succes => {
          this.ECGs = succes;
          for (let item of succes) {
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
    this.lineChartData[0].data = this.currentECG.measurement1.sensor1
    this.lineChartLabels = this.getXaxis(this.currentECG)
  }

  getXaxis(ECG) {
    let period, xaxis = [];
    period = 1 / ECG.measurement1.frequency;

    for (let i = 0; i < ECG.measurement1.sensor1.length; i++) {

      if (i == 0) {
        xaxis[i] = 0
      } else {
        xaxis[i] = xaxis[i - 1] + period;
      }

    }
    return xaxis;





  }





}
