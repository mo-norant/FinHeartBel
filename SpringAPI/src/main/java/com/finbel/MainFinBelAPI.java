package com.finbel;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainFinBelAPI {

	@RequestMapping("/greeting")
	public @ResponseBody String greeting(){
		return "hello" ;
	}
	
	
}
