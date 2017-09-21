//variables
var speakerRay = document.getElementsByClassName("speaker_ray");
var highClick = new Audio('high.wav');
var lowClick = new Audio('low.wav');
var sound = document.getElementById("speaker");
var count = 1;
var measure = 4;
var circle = document.getElementById('circleMeter');
var indicator = document.getElementById('indicator');

//fastclick script to eliminate 300ms lag on iOS iphone devices https://github.com/ftlabs/fastclick
//apparently fixed some of the sound issues i had on iOS. (?)
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
		console.log('FastClick loaded');

		clickInterval = setInterval(playTime, (60000 / 120));
		//speaker rays hide
		for (i in speakerRay){
		speakerRay[i].style.opacity = 0;
		}
		//start metronome
		
	}, false);

}

//figure out and/or change time measurement
document.getElementById("meas").onchange = function changeMeasurement(){
	measure = parseInt(document.getElementById('meas').value, 10);
};
//play the selected tempo, in selected time measurement.
//play high pitched click on count 1, low pitch on the rest.
function playTime() {
	count++;
	

		if (count == 1) {
			blink();
			if (sound.classList.contains("active")) {highClick.play();}
		}
		else if(count > measure){
			count = 1;
			blink();
			if (sound.classList.contains("active")) {highClick.play();}
		}
		else {
			blinkAll();
			if (sound.classList.contains("active")) {lowClick.play();}
		} 
	
};

//blink and blinkback
function blink( )
{
	circle.style.backgroundColor ="#323232";
	indicator.style.backgroundColor ="#f33";
	setTimeout(blinkBack, 100);
	
};

function blinkBack( )
{
	circle.style.backgroundColor ="#212121";
	indicator.style.backgroundColor ="#2e2f2e";
};
//indicator blink on everything else
function blinkAll() {
	indicator.style.backgroundColor ="#77aa11";
	setTimeout(blinkBack, 50);
};

//changing the tempo, parse and set inteval accordingly
var clickInterval;
var blinkInt;

document.getElementById("num").onchange = function changeTempo(){


	//get num int
	var numBpm = parseInt(document.getElementById('num').value, 10);
	//calc bpm to ms
	var timeInMs = ( 60000 / numBpm )*2;

	document.getElementById('needle').style.webkitAnimationDuration = timeInMs + "ms";
	document.getElementById("bpmNumber").innerHTML = numBpm;
	/*loop*/
	
	clearInterval(clickInterval);
	var clickTime = ( timeInMs / 2 );
	clickInterval = setInterval(playTime, clickTime);
	
};

//'tap tempo'
//help from https://stackoverflow.com/questions/30795525/performance-now-vs-date-now

var taps = [];
	detect = 1;

circle.onclick = function () {
	
	t0 = performance.now();
	t1 = performance.now();

	if (detect == 1) {
		//start timing now
		detect++;
		start = t0;
		
	} else {
		//stop
		end = t1;		
  		detect = 1; 
	}
		//calc difference
		var timeDiff = Math.abs(start - end);

		   //calc bpm
		tapToBpm = Math.round(60000 / timeDiff);
		//somehow get the metronome to play new tempo
		document.getElementById("bpmNumber").innerHTML = tapToBpm;

		//set inteval here
		clearInterval(clickInterval);
		clickInterval = setInterval(playTime, timeDiff);
		document.getElementById('needle').style.webkitAnimationDuration = (timeDiff * 2) + "ms";
};


//sound on off
sound.onclick = function() {

	if (sound.classList.contains("active")) {
		sound.classList.remove("active");
		for (i in speakerRay){
		speakerRay[i].style.opacity = 0;
		speakerRay[i].classList.remove("speaker_ray-animate")
		}
	}
	else {
		
		sound.classList.add("active");
		for (i in speakerRay){
		//speakerRay[i].style.opacity = 1;
		speakerRay[i].classList.add("speaker_ray-animate")
		}
	}
};

var controls = document.getElementById("controls");
var title = document.getElementById("title");
function blur(){
	controls.classList.add("blur");
	title.classList.add("blur");

};
var timeout;
document.onmousemove = function(){
	if (controls.classList.contains("blur")) {
		controls.classList.remove("blur");
		title.classList.remove("blur");
		}
	else {
  	clearTimeout(timeout);
  	timeout = setTimeout(blur, 5000);
	}
};