//click sound
var highClick = new Audio('high.wav');
var lowClick = new Audio('low.wav');

function playClick() {
	low.play();
};
//blink and blinkback
function blink( )
{
	document.getElementById("circleMeter").style.backgroundColor ="#aaa";
	setTimeout(blinkBack, 100);
};
function blinkBack( )
{
	document.getElementById("circleMeter").style.backgroundColor ="#212121";
};


document.getElementById("commitBpm").onclick = function changeTempo(){


	//get num int
	var numBpm = parseInt(document.getElementById('num').value, 10);
	//calc bpm to ms
	var timeInMs = ( 60000 / numBpm )*2;

	document.getElementById('needle').style.webkitAnimationDuration = timeInMs + "ms";
	document.getElementById("bpmNumber").innerHTML = numBpm;
	/*loop*/
	//clear precious interval
	clearInterval(blink, blinkTime);

	var blinkTime = ( timeInMs );
	setInterval(blink, blinkTime);
	setInterval(playClick, blinkTime);
};







//detect input bpm
/*var bpmInput = document.getElementById('num');

setInterval(function() { ObserveInputValue(bpmInput.value); }, 100);

function ObserveInputValue() {
	alert('imput changed');
};*/