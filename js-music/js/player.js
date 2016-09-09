var audioPlayer = {
	ids: ["piano", "wave", "forest", "groove", "water"],
	gainProb: [0.2, 0.2, 0.2, 0.2, 0.2],

    samples: {
		piano: 'sounds/piano.ogg',
		wave: 'sounds/wave.ogg',
		forest: 'sounds/forest.ogg',
		water: 'sounds/water.ogg',
		groove: 'sounds/groove.ogg'
	},

	buffers: {},
	gains: {},
	sources: {},

	speed: 0.04,
	playing: false
};

// sample from scores random distribution
audioPlayer.sample = function(scores) {
	var sum = 0;
	for (var i = 0; i < scores.length; i++) {
		sum += scores[i];
	}
	var sampleScore = Math.random() * sum;
	var index = -1;
	while (sampleScore > 0.0) {
		index++;
		sampleScore -= scores[index];
	}
	return index;
}

// starts player
audioPlayer.start = function() {
	if (this.playing) {
		return;
	}
	
	for (var sample in this.samples) {
		var source = audioContext.createBufferSource();
		source.buffer = this.buffers[sample];
		source.loop = true;

		var gainNode = audioContext.createGain();
		source.connect(gainNode);
		gainNode.gain.value = 0;

		this.gains[sample] = gainNode;

		gainNode.connect(audioContext.destination);

		source.start(0);
		this.sources[sample] = source;
	}
	
	this.playing = true;
	this.mixInterval = window.setInterval("audioPlayer.mix()", 1000);
	
	$("#statusBar").text("started");
}

// stops player
audioPlayer.stop = function() {
	if (!this.playing) {
		return;
	}
	
	for (var sample in this.samples) {
		this.sources[sample].stop(0);
	}
	
	this.playing = false;
	window.clearInterval(this.mixInterval);
	
	$("#statusBar").text("stopped");
}

// changes sound gains to random target
audioPlayer.mix = function() {
	if (!this.playing) {
		return;
	}
	
	// get target from gains distribution
	var target = this.sample(this.gainProb)

	for (var i = 0; i < this.ids.length; i++) {
		var oldValue = this.gains[this.ids[i]].gain.value;
		var newValue = oldValue + this.speed * (2-Math.abs(i - target))/2;
		newValue = Math.max(0, newValue);
		newValue = Math.min(1, newValue);

		this.gains[this.ids[i]].gain.value = newValue;
	}

	// recalculate gainProbs
	var count = this.gainProb.length;
	for (var i = 0; i < count; i++) {
		var currentGain = this.gains[this.ids[i]].gain.value;
		this.gainProb[i] = (1 - currentGain)*(1 - currentGain);
	}

	// print gain results
	var stats = $("#stats");
	stats.html("");

	for (var i = 0; i < count; i++) {
		stats.append("<li><strong>" + this.ids[i] + "</strong>="
			+ this.gains[this.ids[i]].gain.value.toFixed(4) + " | p="
			+ this.gainProb[i].toFixed(4)
			+ "</li>");
	}
}

// Loads all sound samples into the buffers object.
audioPlayer.init = function() {
	var names = [];
	var paths = [];
	for (var name in this.samples) {
		var path = this.samples[name];
		names.push(name);
		paths.push(path);
	}

	var bufferLoader = new BufferLoader(audioContext, paths, function(bufferList) {
		for (var i = 0; i < bufferList.length; i++) {
		  var buffer = bufferList[i];
		  var name = names[i];
		  audioPlayer.buffers[name] = buffer;
		}
	});
	bufferLoader.load();
}
