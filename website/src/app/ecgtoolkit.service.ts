import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EcgtoolkitService {
 
  constructor() {

  }

  public filterStage(data) {

    for (let i = 2; i < data.length; i++) {
        data[i] = (data[i] + 2 * data[i - 1] + data[i-2] )/ 4
    }
    return data;

  }

  public differentiation(data){
    for(let i = 2 ; i< data.length ; i++){
        data[i] = data[i]- data[i-1]
      
    }

    return data
  }

  public squariation(data){
    for(let i = 0; i< data.length ; i++){
      data[i] = Math.pow(data[i],2)
    }
    return data
  }

  public thresholdchecker(data){
    for(let i = 2 ; i < data.length;i++){
      if(data[i] < 100){
        data[i]= 0
      }
    }
  }

   


}



