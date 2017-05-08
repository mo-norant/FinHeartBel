package com.TestData;

import java.util.Date;

public class Measurement {

	String nameMeasurement;
	Date date;
	int frequenty;
	int[] sensor1;
	int[] sensor2;
	
	
	public Measurement(String nameMeasurement, Date date, int frequenty, int[] sensor1, int[] sensor2) {
		super();
		this.nameMeasurement = nameMeasurement;
		this.date = date;
		this.frequenty = frequenty;
		this.sensor1 = sensor1;
		this.sensor2 = sensor2;
	}
	
	
	
}
