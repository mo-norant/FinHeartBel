package hello;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.xpath.internal.SourceTree;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.omg.CORBA.INTERNAL;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.log4j.Logger;

@RestController
public class GreetingController {


  @RequestMapping("/greeting")
  public String greeting() {
    Random random = new Random();
    return String.valueOf(random.nextInt());
  }



  @RequestMapping("/mo")
  public void aangekomen() {



  lowPass(highPass(getECGarray(),getFrequencylocal());




  }


  @SuppressWarnings("unchecked")
  public int getFrequencylocal() {
    JSONParser parser = new JSONParser();

    try {

      Object obj = parser.parse(new FileReader(
        "C:\\Users\\mobou\\OneDrive\\schooljaar 2016-2017\\International Project\\qrsserver\\src\\main\\java\\hello\\ecg.json"));

      JSONObject jsonObject = (JSONObject) obj;
      JSONArray sensor1 = (JSONArray) jsonObject.get("sensor1");
      int frequency = (int) (long) jsonObject.get("frequency");
      return frequency;


    } catch (Exception e) {
      e.printStackTrace();
    }

    return 0;


  }

  static final int M = 5;

  @SuppressWarnings("unchecked")
  public ArrayList getECGarray() {
    JSONParser parser = new JSONParser();

    try {

      Object obj = parser.parse(new FileReader(
        "C:\\Users\\mobou\\OneDrive\\schooljaar 2016-2017\\International Project\\qrsserver\\src\\main\\java\\hello\\ecg.json"));

      JSONObject jsonObject = (JSONObject) obj;
      JSONArray sensor1 = (JSONArray) jsonObject.get("sensor1");

      ArrayList<String> list = new ArrayList<String>();

      if (sensor1 != null) {
        int len = sensor1.size();
        for (int i = 0; i < len; i++) {
          list.add(sensor1.get(i).toString());
        }
      }


      return list;


    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public static float[] highPass(int[] sig0, int nsamp) {
    float[] highPass = new float[nsamp];
    float constant = (float) 1/M;

    for(int i=0; i<sig0.length; i++) {
      float y1 = 0;
      float y2 = 0;

      int y2_index = i-((M+1)/2);
      if(y2_index < 0) {
        y2_index = nsamp + y2_index;
      }
      y2 = sig0[y2_index];

      float y1_sum = 0;
      for(int j=i; j>i-M; j--) {
        int x_index = i - (i-j);
        if(x_index < 0) {
          x_index = nsamp + x_index;
        }
        y1_sum += sig0[x_index];
      }

      y1 = constant * y1_sum;
      highPass[i] = y2 - y1;

    }

    return highPass;
  }

  // Low pass filter;
  public static float[] lowPass(float[] sig0, int nsamp) {
    float[] lowPass = new float[nsamp];
    for(int i=0; i<sig0.length; i++) {
      float sum = 0;
      if(i+30 < sig0.length) {
        for(int j=i; j<i+30; j++) {
          float current = sig0[j] * sig0[j];
          sum += current;
        }
      }
      else if(i+30 >= sig0.length) {
        int over = i+30 - sig0.length;
        for(int j=i; j<sig0.length; j++) {
          float current = sig0[j] * sig0[j];
          sum += current;
        }
        for(int j=0; j<over; j++) {
          float current = sig0[j] * sig0[j];
          sum += current;
        }
      }

      lowPass[i] = sum;
    }

    return lowPass;

  }

  public void QRS(float[] lowPass, int nsamp) {
    int[] QRS = new int[nsamp];

    double treshold = 0;

    for(int i=0; i<200; i++) {
      if(lowPass[i] > treshold) {
        treshold = lowPass[i];
      }
    }

    int frame = 250;

    for(int i=0; i<lowPass.length; i+=frame) {
      float max = 0;
      int index = 0;
      if(i + frame > lowPass.length) {
        index = lowPass.length;
      }
      else {
        index = i + frame;
      }
      for(int j=i; j<index; j++) {
        if(lowPass[j] > max) max = lowPass[j];
      }
      boolean added = false;
      for(int j=i; j<index; j++) {
        if(lowPass[j] > treshold && !added) {
          QRS[j] = 1;
          added = true;
        }
        else {
          QRS[j] = 0;
        }
      }

      double gama = (Math.random() > 0.5) ? 0.15 : 0.20;
      double alpha = 0.01 + (Math.random() * ((0.1 - 0.01)));

      treshold = alpha * gama * max + (1 - alpha) * treshold;

    }

    System.out.println(QRS.toString());
  }



}
