import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EcgtoolkitService {

  constructor() {

  }


  public highPass(nsamp, data, M) {
    let highPass = {}
    let constant = 1 / M;

    for (let i = 0; i < data.length; i++) {
      let y1 = 0;
      let y2 = 0;

      let y2_index = i - ((M + 1) / 2);
      if (y2_index < 0) {
        y2_index = nsamp + y2_index;
      }
      y2 = data[y2_index];

      let y1_sum = 0;
      for (let j = i; j > i - M; j--) {
        let x_index = i - (i - j);
        if (x_index < 0) {
          x_index = nsamp + x_index;
        }
        y1_sum += data[x_index];
      }

      y1 = constant * y1_sum;
      highPass[i] = y2 - y1;

    }

    return highPass;


  }

  public lowPass(data, M) {
    let lowpass = {}
    for (let i = 0; i < data.length; i++) {
      let sum = 0;
      if (i + 30 < data.length) {
        for (let j = i; j < i + 30; j++) {
          let current = data[j] * data[j];
          sum += current;
        }
      }
      else if (i + 30 >= data.length) {
        let over = i + 30 - data.length;
        for (let j = i; j < data.length; j++) {
          let current = data[j] * data[j];
          sum += current;
        }
        for (let j = 0; j < over; j++) {
          let current = data[j] * data[j];
          sum += current;
        }
      }

      lowpass[i] = sum;
    }

    return lowpass;
  }

  public QRS(data) {
    let QRS = {}

    let treshold = 0;

    for (let i = 0; i < 200; i++) {
      if (data[i] > treshold) {
        treshold = data[i];
      }
    }
    let frame = 2000;

    for (let i = 0; i < data.length; i += frame) {
      let max = 0;
      let index = 0;
      if (i + frame > data.length) {
        index = data.length;
      }
      else {
        index = i + frame;
      }
      for (let j = i; j < index; j++) {
        if (data[j] > max) max = data[j];
      }
      let added = false;
      for (let j = i; j < index; j++) {
        if (data[j] > treshold && !added) {
          QRS[j] = 1;
          added = true;
        }
        else {
          QRS[j] = 0;
        }
      }

      let gamma = (Math.random() > 0.5) ? 0.15 : 0.20;
      let alpha = 0.01 + (Math.random() * ((0.1 - 0.01)));

      treshold = alpha * gamma * max + (1 - alpha) * treshold;

    }

    return QRS;


  }

  public calculateBPMLinear(beats, period) {

    let multiplier = 60 / period;
    let bpm = beats * multiplier
    return bpm

  }


}



