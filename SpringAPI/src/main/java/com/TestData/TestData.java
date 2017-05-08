package com.TestData;

import java.io.File;
import java.io.FileReader;
import java.net.URL;

import org.json.JSONObject;
import org.skyscreamer.jsonassert.JSONParser;


public class TestData {
    JSONParser parser = new JSONParser();

	
	//ArrayList<Measurement> measuremenjsonts =  new ArrayList<>();
	
	public JSONObject getMeasurements(){
		

	    try{
	    	

            Object obj = parser.parse(new FileReader(
                    "/Users/mohamedbouzimgroenendaal/Desktop/test.txt"));
	    	
   	  	
        JSONObject jsonObject = (JSONObject) obj;

   	  	System.out.println(jsonObject.toString());
   	  	
	    	return jsonObject;
	    	
	    	
	    }
	    catch (Exception e) {
            e.printStackTrace();
        }
		
	    return null;
		
		
	}
	
	
	
    

	
}
