package com.finbel;

import java.util.ArrayList;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/json")
public class MainFinBelAPI {
	
	
	
	Random r = new Random();
	
	public ArrayList<Integer>  randomgetallen(){
		ArrayList<Integer> getallenlijst = new ArrayList<Integer>();
		for(int i = 0 ; i < 10 ; i++){
		getallenlijst.add(new Integer(r.nextInt(1000)));
	}
		return getallenlijst;
	}
	
	
	
	
	
	

	@RequestMapping(value="{name}", method = RequestMethod.GET)
	public @ResponseBody Shop getShopInJSON(@PathVariable String name) {

		Shop shop = new Shop();
		shop.setName(name);
		shop.setStaffName(new String[]{"TEST1", "Test1"});

		
		return shop;

	}
	
	@RequestMapping("/randomgetallen")
	public @ResponseBody ArrayList<Integer> getallen (HttpServletResponse response){
		response.setContentType("application/json");
		
		return randomgetallen();
	}
	
	
}
