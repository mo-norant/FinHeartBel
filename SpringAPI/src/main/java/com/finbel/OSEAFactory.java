package com.finbel;

import com.finbel.classification.BDACParameters;
import com.finbel.classification.BeatAnalyzer;
import com.finbel.classification.BeatDetectionAndClassification;
import com.finbel.classification.Classifier;
import com.finbel.classification.Matcher;
import com.finbel.classification.NoiseChecker;
import com.finbel.classification.PostClassifier;
import com.finbel.classification.RythmChecker;
import com.finbel.detection.QRSDetector;
import com.finbel.detection.QRSDetector2;
import com.finbel.detection.QRSDetectorParameters;
import com.finbel.detection.QRSFilterer;

/**
 * A factory to create detection of classification objects.
 */
public class OSEAFactory 
	{
	
	/**
	 * Creates a BeatDetectorAndClassificator for the given parameters.
	 * 
	 * @param sampleRate The sampleRate of the ECG samples.
	 * @param beatSampleRate The sampleRate for the classification
	 * @return An object capable of detection and classification
	 */
	public static BeatDetectionAndClassification createBDAC(int sampleRate, int beatSampleRate)
		{
		BDACParameters bdacParameters = new BDACParameters(beatSampleRate) ;
		QRSDetectorParameters qrsDetectorParameters = new QRSDetectorParameters(sampleRate);
		
		BeatAnalyzer beatAnalyzer = new BeatAnalyzer(bdacParameters) ;
		Classifier classifier = new Classifier(bdacParameters, qrsDetectorParameters) ;
		Matcher matcher = new Matcher(bdacParameters, qrsDetectorParameters) ;
		NoiseChecker noiseChecker = new NoiseChecker(qrsDetectorParameters) ;
		PostClassifier postClassifier = new PostClassifier(bdacParameters) ;
		QRSDetector2 qrsDetector = createQRSDetector2(sampleRate) ;
		RythmChecker rythmChecker = new RythmChecker(qrsDetectorParameters) ;
		BeatDetectionAndClassification bdac 
			= new BeatDetectionAndClassification(bdacParameters, qrsDetectorParameters) ;

		classifier.setObjects(matcher, rythmChecker, postClassifier, beatAnalyzer) ;
		matcher.setObjects(postClassifier, beatAnalyzer, classifier) ;
		postClassifier.setObjects(matcher) ;
		bdac.setObjects(qrsDetector, noiseChecker, matcher, classifier) ;
		
		return bdac;
		}

	/**
	 * Create a QRSDetector for the given sampleRate
	 * 
	 * @param sampleRate The sampleRate of the ECG samples
	 * @return A QRSDetector
	 */
	public static QRSDetector createQRSDetector(int sampleRate) 
		{
		QRSDetectorParameters qrsDetectorParameters = new QRSDetectorParameters(sampleRate) ;
		
		QRSDetector qrsDetector = new QRSDetector(qrsDetectorParameters) ;
		QRSFilterer qrsFilterer = new QRSFilterer(qrsDetectorParameters) ;
		
		qrsDetector.setObjects(qrsFilterer) ;
		return qrsDetector ;
		}
	
	/**
	 * Create a QRSDetector2 for the given sampleRate
	 * 
	 * @param sampleRate The sampleRate of the ECG samples
	 * @return A QRSDetector2
	 */
	public static QRSDetector2 createQRSDetector2(int sampleRate) 
		{
		QRSDetectorParameters qrsDetectorParameters = new QRSDetectorParameters(sampleRate) ;
		
		QRSDetector2 qrsDetector2 = new QRSDetector2(qrsDetectorParameters) ;
		QRSFilterer qrsFilterer = new QRSFilterer(qrsDetectorParameters) ;
		
		qrsDetector2.setObjects(qrsFilterer) ;
		return qrsDetector2 ;
		}
	}
