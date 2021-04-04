//Class Timer, to describe a specific timer(time, circle radius, circle progress and step per second)
class Timer {
  currentProgress = 0;
  progressStep;

  constructor(time) {
    this.time = time*60;
    this.initialTime = time*60;
    this.radius = 170;
  }

  //Method to execute timer function
  doTimeCount() {
    if(this.progressStep == undefined){
      this.progressStep = 100/this.time;
    }

    this.interval = setInterval(()=>{
      timeOperations(this.time);
      if(this.time == 0){
        clearInterval(this.interval);

        setTimeout(()=>{
          resetTimer(this, false);
        }, 1000);
      }
      else {
        this.currentProgress+= this.progressStep;
        setCircleLength(this.currentProgress, this);
      }
      this.time--;
    }, 1000);

    setStopTimerHandler(this.interval);
  }

  //Radius setter
  setRadius(radius) {
    this.radius = radius;
  }

  //Time setter
  setTime(time) {
    this.time = time*60;
    this.initialTime = time*60;
  }
}

//Function to divide full time into seconds and minutes
function countTime(fullTime) {
  let minutes = Math.trunc(fullTime/60);
  let seconds = fullTime % 60;

  if(seconds < 0) {
    minutes--;
    seconds = 59;
  }

  return new Map([
    ['minutes', minutes],
    ['seconds', seconds]
  ]);
}

//Function to set circle progress
function setCircleLength(progress, timer) {
  let progressBlock = document.querySelector('.main__circle-inner circle');
  let offsetNumber = 2*Math.PI*timer.radius;
  progressBlock.style.strokeDashoffset = offsetNumber - (offsetNumber*progress)/100;
}

//Function to set minutes into DOM
function setMinutes(minutes) {
  let minutesBlock = document.querySelector('.minutes');

  if(minutes < 10)
    minutesBlock.innerText = '0' + minutes;
  else
    minutesBlock.innerText = minutes;
}

//Function to set secondes into DOM
function setSeconds(seconds) {
  let secondsBlock = document.querySelector('.seconds');

  if(seconds < 10)
    secondsBlock.innerText = '0' + seconds;
  else
    secondsBlock.innerText = seconds;
}

//Function to separate time operations from class
function timeOperations(time) {
  let t = countTime(time);

  setMinutes(t.get('minutes'));
  setSeconds(t.get('seconds'));
}
