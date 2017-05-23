import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { EcgtoolkitService } from '../ecgtoolkit.service';

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

  show: boolean = false


  public lineChartLabels: Array<any> = [];
  public filterLabels: Array<any> = [];
  public derivativeLabels: Array<any> = [];
  public squaringLabels: Array<any> = [];


  public ecgdata: Array<any> = [
    {
      data: [],
      label: 'ECG'
    }
  ];
  public filterdata: Array<any> = [
    {
      data: [],
      label: 'filter function'
    }
  ];
  public derivativedata: Array<any> = [
    {
      data: [],
      label: 'second derivative function'
    }
  ];
  public squaringdata: Array<any> = [
    {
      data: [],
      label: 'squaring function'
    }
  ];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
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



  constructor(public af: AngularFire, public ecgtoolkit: EcgtoolkitService) {
    af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth

        this.itemsobservable = af.database.list('userstorage/users/' + this.user.uid);
        this.itemsobservable.subscribe(succes => {
          this.ECGs = succes;
          for (let item of succes) {
            this.ECGnames.push(item.$key)
          }
          this.selectionChanged(this.ECGnames[0]);

        }
        )
      }
      else {
        this.error = 'Could not find uid from user';
      }
    })
  }


  ngOnInit() {
  }

  selectionChanged(deviceValue) {
    this.currentPosition = this.ECGnames.indexOf(deviceValue);
    this.currentECG = this.ECGs[this.currentPosition];
    this.ecgdata[0].data = this.currentECG.measurement1.sensor1;
    this.lineChartLabels = this.getXaxis(this.currentECG);
    console.log(this.ecgdata[0].data )
    let highpass = this.ecgtoolkit.highPass(5,this.ecgdata[0].data,5);
    let lowpass = this.ecgtoolkit.lowPass(this.ecgdata[0].data,5);
    let qrs = this.ecgtoolkit.QRS(this.ecgdata[0].data);

     for (var key in qrs) {

      if(qrs[key] != 0){
        console.log(qrs[key])
      }

      
     }
   
    this.show = true
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

  getXaxisforothers(data) {
    let period, xaxis = [];

    period = 1 / this.currentECG.measurement1.frequency




    for (let i = 0; i < data.length; i++) {

      if (i == 0) {
        xaxis[i] = 0
      } else {
        xaxis[i] = xaxis[i - 1] + period;
      }

    }
    return xaxis;
  }





}
