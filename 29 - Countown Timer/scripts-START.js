let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	//clear any existing items 
	clearInterval(countdown);
	
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	//console.log({now, then});
	
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) /1000);
		//check if we should stop it 
		if(secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		//display it
		console.log(secondsLeft);
	}, 1000);
	
	/* setInterval(function() {
		seconds--;
	}, 1000); */
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}: ${remainderSeconds > < 10 : '0' : '' }${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
	//console.log({minutes, remainderSeconds});
}

function displayEndtime(timeStamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	//const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back at ${hour} > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

button.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins * 60);
	this.reset();
});