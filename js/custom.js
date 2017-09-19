
//fastclick script to eliminate 300ms lag on iOS iphone devices https://github.com/ftlabs/fastclick
//apparently fixed some of the sound issues i had on iOS. (?)
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
		console.log('FastClick loaded');
	}, false);
}

/*function initAnim() {
	var ol = document.getElementById("overlay")
	var overlay1 = document.getElementById("olBg1");
	var overlay2 = document.getElementById("olBg2");
	var intro = document.getElementById("intro");

	overlay1.style.transform = 'translate(-100vw)';
	overlay2.style.transform = 'translate(-100vw)';
	intro.style.transform = 'translate(-100vw)';
};

setTimeout(initAnim, 1000);*/

//click sound
var highClick = new Audio('high.wav');
var lowClick = new Audio('low.wav');
var soundOff = document.getElementById("off");
var soundOn = document.getElementById("on");
var count = 1;
var measure = 4;

//figure out and/or change time measurement
document.getElementById("meas").onchange = function changeMeasurement(){
	measure = parseInt(document.getElementById('meas').value, 10);
};
//play the selected tempo, in selected time measurement.
//play high pitched click on count 1, low pitch on the rest.
function playLow() {
	count++;
	if (soundOff.classList.contains("inactive")) {

		if (count == 1) {
			highClick.play();
			blink();
		}
		else if(count > measure){
			highClick.play();
			count = 1;
			blink();
		}
		else {
			lowClick.play();
			blinkAll();
		} 
	}
};

//blink and blinkback
function blink( )
{
	document.getElementById("circleMeter").style.backgroundColor ="#323232";
	document.getElementById("indicator").style.backgroundColor ="#f33";
	setTimeout(blinkBack, 100);
	
};

function blinkBack( )
{
	document.getElementById("circleMeter").style.backgroundColor ="#212121";
	document.getElementById("indicator").style.backgroundColor ="#2e2f2e";
};
//indicator blink on everything else
function blinkAll() {
	document.getElementById("indicator").style.backgroundColor ="#77aa11";
	setTimeout(blinkBack, 50);
};

//changing the tempo, parse and set inteval accordingly
var lowInterval;
var blinkInt;

document.getElementById("num").onchange = function changeTempo(){


	//get num int
	var numBpm = parseInt(document.getElementById('num').value, 10);
	//calc bpm to ms
	var timeInMs = ( 60000 / numBpm )*2;

	document.getElementById('needle').style.webkitAnimationDuration = timeInMs + "ms";
	document.getElementById("bpmNumber").innerHTML = numBpm;
	/*loop*/
	
	clearInterval(lowInterval);
	var lowTime = ( timeInMs / 2 );
	lowInterval = setInterval(playLow, lowTime);
	
};



//'tap tempo'
//help from https://stackoverflow.com/questions/30795525/performance-now-vs-date-now

var taps = [];
var element = document.getElementById('circleMeter');        
 	detect = 1;
 

    	


    element.onclick = function () {
    	
    	// https://stackoverflow.com/questions/31985051/safari-not-firing-touch-events
    	event.stopPropagation();
   		event.preventDefault();

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

			//set inteval her
			clearInterval(lowInterval);
			lowInterval = setInterval(playLow, timeDiff);
			document.getElementById('needle').style.webkitAnimationDuration = (timeDiff * 2) + "ms";
    };





//sound on off

document.getElementById("onOff").onclick = function() {
	if (soundOff.classList.contains("inactive")) {
		soundOff.classList.remove("inactive");
		soundOn.classList.add("inactive");
	}
	else {
		soundOff.classList.add("inactive");
		soundOn.classList.remove("inactive");
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




//detect input bpm
/*var bpmInput = document.getElementById('num');

setInterval(function() { ObserveInputValue(bpmInput.value); }, 100);

function ObserveInputValue() {
	alert('imput changed');
};




    element.onmousedown = function () {
      var timeNow = (new Date()).getTime();
      
      //taps.push(timeNow)
      //console.log(taps);
    };*/