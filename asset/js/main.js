class DrumKit {
  constructor() {
    this.sequencer = document.querySelector(".sequencer")
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach(bar => {
      if (bar.classList.contains("active")) {
        let curTrack = bar.parentNode.parentNode
        let curAudio = curTrack.querySelector(".audio")
        curAudio.currentTime = 0
        curAudio.play()
        bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //Check if it's playing

    if (this.isPlaying) {
      //Clear the interval
      clearInterval(this.isPlaying);
      console.log(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    //NULL

    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");

    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});

// ----------------------------------------------------------------------------
// add track dynamically 
// ----------------------------------------------------------------------------

window.onload = function defaultTrack() {
  var arr = []
  for (let i = 0; i < 5; i++) {
    addTrack()
  }
}

function addTrack() {
  sequencer = document.querySelector(".sequencer")
  newtrack = document.createElement("div")
  newtrack.className = "template-track"
  newtrack.id = newtrack.className + index
  newtrack.innerHTML = document.querySelector(".template-track").innerHTML
  pads = newtrack.querySelectorAll(".pad")
  pads.forEach(pad => {
    pad.style.background = colorArr[index % 5]
    pad.setAttribute("bgcolor", highLightColorArr[index % 5])
  })
  tempo = document.querySelector(".tempo");
  sequencer.insertBefore(newtrack, tempo);
  index++
}

function deleteTrack(ele) {
  sequencer = document.querySelector(".sequencer")
  curtrack = ele.parentNode
  sequencer.removeChild(curtrack)
}

function changeAudio(ele) {
  const selectionName = ele.name;
  const selectionValue = ele.value;
  audio = ele.parentNode.parentNode.querySelector(".audio")
  // audio.setAttribute("src", selectionValue)
  audio.src = selectionValue
}

function barClicked(ele) {
  ele.classList.toggle("active");
  currentColor = ele.getAttribute("bgcolor")
  nextColor = ele.style.background
  ele.style.background = currentColor
  ele.setAttribute("bgcolor", nextColor)
}

function barAnimationed(ele) {
  ele.style.animation = ""
}

function muteClicked(ele) {
  ele.classList.toggle("active");
  curTrack = ele.parentNode.parentNode
  curAudio = curTrack.querySelector(".audio")
  if (ele.classList.contains("active")) {
    curAudio.volume = 0
  } else {
    curAudio.volume = 1
  }
}

index = 0
colorArr = ["rgb(168, 168, 228)", "rgb(180, 214, 177)", "rgb(219, 84, 208)", "rgb(204, 153, 255)", "rgb(255, 255, 153)"];
highLightColorArr = ["rgb(120, 120, 165)", "rgb(0, 255, 0)", "rgb(148, 57, 140)", "rgb(255, 0, 0)", "rgb(255, 255, 0)"];
