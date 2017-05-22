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

  @RequestMapping("/momo")
  public void nieuwalgo() {
    QRS_test qrs_test = new QRS_test();
  }


  @RequestMapping("/mo")
  public String aangekomen() {


    int frequency = 300;

    while (frequency < 2200) {
    QRSDetector2 qrsDetector = OSEAFactory.createQRSDetector2(frequency);
    ArrayList<String> list = getECGarray();




      for (int i = 0; i < list.size(); i++) {
        int result = qrsDetector.QRSDet(Integer.valueOf(list.get(i)));
        if (result != 0) {
          System.out.println("Freq" + Integer.toString(frequency) + " @ A QRS-Complex was detected at sample: " + (i - result));
          return "Freq" + Integer.toString(frequency) + " @ A QRS-Complex was detected at sample: " + (i - result);

        }
      }

      BeatDetectionAndClassification bdac = OSEAFactory.createBDAC(frequency, frequency / 2);
      for (int i = 0; i < list.size(); i++) {
        BeatDetectionAndClassification.BeatDetectAndClassifyResult result = bdac.BeatDetectAndClassify(Integer.valueOf(list.get(i)));
        if (result.samplesSinceRWaveIfSuccess != 0) {
          int qrsPosition = i - result.samplesSinceRWaveIfSuccess;
          if (result.beatType == ECGCODES.UNKNOWN) {
            System.out.println("Freq" + Integer.toString(frequency) + " @ A unknown beat type was detected at sample: " + qrsPosition);
            return "Freq" + Integer.toString(frequency) + " @ A unknown beat type was detected at sample: " + qrsPosition;
          } else if (result.beatType == ECGCODES.NORMAL) {
            System.out.println("Freq" + Integer.toString(frequency) + " @ A normal beat type was detected at sample: " + qrsPosition);
            return "Freq" + Integer.toString(frequency) + " @ A normal beat type was detected at sample: " + qrsPosition;
          } else if (result.beatType == ECGCODES.PVC) {
            System.out.println("Freq" + Integer.toString(frequency) + " @ A premature ventricular contraction was detected at sample: " + qrsPosition);
            return "Freq" + Integer.toString(frequency) + " @ A premature ventricular contraction was detected at sample: " + qrsPosition;

          }
        }
      }
      frequency+=50;

    }

    return "";
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


}
