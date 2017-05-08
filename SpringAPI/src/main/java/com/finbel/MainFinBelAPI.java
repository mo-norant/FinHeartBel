package com.finbel;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.TestData.TestData;


@Controller
public class MainFinBelAPI {
	
	
	TestData testdata = new TestData();
	
	
	
	
	
	

	
	
	@RequestMapping("/print")
	public @ResponseBody String getallen (){
		
		return testdata.getMeasurements().toString();
	}
	
	
}
