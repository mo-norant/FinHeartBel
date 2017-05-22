import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EcgtoolkitService {

  M = 5;
  N = 7
  WINSIZE = 130;
  HP_CONSTANT = 100

  constructor() {

  }






  public getECGAtIndex(data) {

    //circular buffer for input ecg signal
    // we need to keep a history of M + 1 samples for HP filter

    let ecg_circ_buff = [this.M + 1];
    let ecg_circ_WR_idx = 0;
    let ecg_circ_RD_idx = 0;


    // circular buffer for input ecg signal
    // we need to keep a history of N+1 samples for LP filter

    let hp_circ_buff = [this.N + 1];
    let hp_circ_WR_idx = 0;
    let hp_circ_RD_idx = 0;

    // LP filter outputs a single point for every input point
    // This goes straight to adaptive filtering for eval

    let next_eval_pt = 0;
    let QRS = [data.length];

    // running sums for HP and LP filters, values shifted in FILO

    let hp_sum = 0;
    let lp_sum = 0;

    // parameters for adaptive thresholding
    let treshold = 0;
    let triggered = false;
    let trig_time = 0;
    let win_max = 0;
    let win_idx = 0;

    for (let i = 0; i < data.length; i++) {
      ecg_circ_buff[ecg_circ_WR_idx++] = data[i];
      ecg_circ_WR_idx %= (this.M + 1);

      /* High pass filtering */
      if (i < this.M) {
        // first fill buffer with enough points for HP filter
        hp_sum += ecg_circ_buff[ecg_circ_RD_idx];
        hp_circ_buff[hp_circ_WR_idx] = 0;
      }
      else {
        hp_sum += ecg_circ_buff[ecg_circ_RD_idx];

        let tmp = ecg_circ_RD_idx - this.M;
        if (tmp < 0) {
          tmp += this.M + 1;
        }
        hp_sum -= ecg_circ_buff[tmp];

        let y1 = 0;
        let y2 = 0;

        tmp = (ecg_circ_RD_idx - ((this.M + 1) / 2));
        if (tmp < 0) {
          tmp += this.M + 1;
        }
        y2 = ecg_circ_buff[tmp];

        y1 = this.HP_CONSTANT * hp_sum;

        hp_circ_buff[hp_circ_WR_idx] = y2 - y1;
      }

      ecg_circ_RD_idx++;
      ecg_circ_RD_idx %= (this.M + 1);

      hp_circ_WR_idx++;
      hp_circ_WR_idx %= (this.N + 1);


      /* Low pass filtering */

      // shift in new sample from high pass filter
      lp_sum += hp_circ_buff[hp_circ_RD_idx] * hp_circ_buff[hp_circ_RD_idx];

      if (i < this.N) {
        // first fill buffer with enough points for LP filter
        next_eval_pt = 0;

      }
      else {
        // shift out oldest data point
        let tmp = hp_circ_RD_idx - this.N;
        if (tmp < 0) {
          tmp += this.N + 1;
        }
        lp_sum -= hp_circ_buff[tmp] * hp_circ_buff[tmp];

        next_eval_pt = lp_sum;
      }

      hp_circ_RD_idx++;
      hp_circ_RD_idx %= (this.N + 1);
      /* Adapative thresholding beat detection */
      // set initial threshold				


      if (i < this.WINSIZE) {
        if (next_eval_pt > treshold) {
          treshold = next_eval_pt;
        }
      }

      // check if detection hold off period has passed
      if (triggered) {
        trig_time++;

        if (trig_time >= 100) {
          triggered = false;
          trig_time = 0;
        }
      }

      // find if we have a new max
      if (next_eval_pt > win_max) win_max = next_eval_pt;

      // find if we are above adaptive threshold
      if (next_eval_pt > treshold && !triggered) {
        QRS[i] = 1;

        triggered = true;
      }
      else {
        QRS[i] = 0;
      }
      // adjust adaptive threshold using max of signal found 
      // in previous window            
      if (++win_idx > this.WINSIZE) {
        // weighting factor for determining the contribution of
        // the current peak value to the threshold adjustment
        let gamma = 0.175;

        // forgetting factor - 
        // rate at which we forget old observations
        let alpha = 0.01 + (Math.random() * ((0.1 - 0.01)));

        treshold = alpha * gamma * win_max + (1 - alpha) * treshold;

        // reset current window ind
        win_idx = 0;
        win_max = -10000000;
      }
    }

    for (let i = 0; i < QRS.length; i++) {
      if (QRS[i] != 0) {
      }
    }







  }

  public filterStage(data) {

    for (let i = 0; i < data.length; i++) {

      if (!data[0]) {
        data[i] = data[i] + 2 * data[i - 1] + data[i] / 4

      }

    }

    return data

  }

  public differentiation(data){
    for(let i = 0 ; i< data.length ; i++){
      if(!data[0]){
        data[i] = data[i]- data[i-1]
      }
    }

    for(let i = 0 ; i< data.length ; i++){
      if(!data[0]){
        data[i] = data[i]- data[i-1]
      }
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
    for(let i = 0 ; i < data.length;i++){
      if(data[i] < 100){
        data[i]= 0
      }
    }
  }

   


}



