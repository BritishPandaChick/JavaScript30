const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
		.then(localMediaStream => {
			console.log(localMediaStream);
			video.src = window.URL.createObjectURL(localMediaStream);
			//video.play();
		})
		.catch(err => {
			console.error(`Oh No!!!`, err);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	//console.log(width, height);
	canvas.width = width;
	canvas.height = height;
	
	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		//console.log(pixels);
		//mess with them 
		pixels = redEffect(pixels);
		pixels = rgbSplit(pixels);
		ctx.globalAlpha = 0.1;
		pixels = greenScreen(pixels);
		//debugger;
		//put them back 
		ctx.putImagesData(pixels, 0, 0);
	}, 16);
}

function takePhoto() {
	//played the sound 
	snap.currentTime = 0;
	snap.play();
	
	//take data out of the canvas 
	const data = canvas.toDataURL('image/jpeg');
	//console.log(data);
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.innerHTML = `<img src="${data}" alt="Handsome Man"
 />`;	
	//link.textContent = 'Download Image';
	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
	for(let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 200; //red
		pixels.data[i + 1] = pixels.data [i  + 1] - 50; //green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue 
	}
	return pixels;
}

function rgbSplit(pixels) {
	for(let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0]; //red
		pixels.data[i + 500] = pixels.data[i + 1]; //green 
		pixels.data[i - 550] = pixels.data[i + 2]; //blue 
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};
	document.querySelectorAll('.rgb input').forEach((input) => {
		levels[input.name] = input.value;
	});
	
	console.log(levels);
	
	for (i = 0; i < pixels.data.lenght; i = i + 4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];
		
		if (red >= levels.rmin
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax 
			&& green <= levels.gmax 
			&& blue <= levels.bmax) {
				pixels.data[i + 3] = 0;
			}
	}
	return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);