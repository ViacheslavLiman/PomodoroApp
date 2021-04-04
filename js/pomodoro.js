/*Class Pomodoro, to describe pomodoro functional, by separating specific timers(pomodoro,
 short break and long break)*/
class Pomodoro {
  constructor(pomodoro, shortBreak, longBreak) {
    this.pomodoro = new Timer(pomodoro);
    this.shortBreak = new Timer(shortBreak);
    this.longBreak = new Timer(longBreak);
  }

  //Method to set timers
  setTimers(pomodoro, shortBreak, longBreak) {
    if(this.pomodoro.initialTime != pomodoro*60)
      this.pomodoro.setTime(pomodoro);
    if(this.shortBreak.initialTime != shortBreak*60)
      this.shortBreak.setTime(shortBreak);
    if(this.longBreak.initialTime != longBreak*60)
      this.longBreak.setTime(longBreak);
  }

  //Method to get timer by its name
  getTimerByName(timerName) {
    switch (timerName) {
      case 'pomodoro':
        return this.pomodoro;
      case 'short break':
        return this.shortBreak;
      default:
        return this.longBreak;
    }
  }

  //Method to reset the timer (by name) after mode has been changed
  resetTimerAfterChange(timerName) {
    switch (timerName) {
      case 'pomodoro':
        resetTimer(this.pomodoro, false);
        clearInterval(this.shortBreak?.interval);
        clearInterval(this.longBreak?.interval);
        break;
      case 'short break':
        resetTimer(this.shortBreak, false);
        clearInterval(this.pomodoro?.interval);
        clearInterval(this.longBreak?.interval);
        break;
      default:
        resetTimer(this.longBreak, false);
        clearInterval(this.pomodoro?.interval);
        clearInterval(this.shortBreak?.interval);
    }
  }

  //Method to start the timer function by its name
  startTimer(timerName){
    switch (timerName) {
      case 'pomodoro':
        this.pomodoro.doTimeCount();
        break;
      case 'short break':
        this.shortBreak.doTimeCount();
        break;
      default:
        this.longBreak.doTimeCount();
    }
  }
}

//Function to change buttons classes after changing
function changeButton(startBut, stopBut) {
  stopBut.classList.remove('active');
  startBut.classList.add('active');
}

//Function to reset circle timer
function resetTimer(timer, afterSettingsChange) {
  timer.time = timer.initialTime;
  timer.currentProgress = 0;
  timer.progressStep = 100/timer.time;

  timeOperations(timer.time);
  setCircleLength(0, timer);

  if(!afterSettingsChange)
    changeButton(document.querySelector('.main__button.start'), document.querySelector('.main__button.stop'));
}
