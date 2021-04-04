//Buttons to start and stop timer function
let startBut = document.querySelector('.main__button.start');
let stopBut = document.querySelector('.main__button.stop');

//Function to start timer function
const listener = event => {
  pomodoroTimer.startTimer(document.querySelector('.mode__item.active label').innerText);
  startBut.classList.remove('active');
  stopBut.classList.add('active');
}

//Function for correct editing of time input
function editTimeInput(input, action) {
  if(input.value > 60)
    input.value = 60;
  else if(input.value < 1)
    input.value = 1;
  else if(action === 'up' && input.value != 60)
    input.value++;
  else if(action === 'down' && input.value != 1)
    input.value--;
}

//Function to set handler for adding active class
function setActiveHandler(buttons) {
  for(let but of buttons) {
    but.addEventListener('click', event => {
      for(let item of buttons) {
        if(item.classList.contains('active'));
          item.classList.remove('active');
      }
      event.currentTarget.classList.add('active');
    });
  }
}

//Function to set handler for time input arrows
function setArrowsHandler(buttons, purpose) {
  for(let but of buttons) {
    if(purpose === 'up'){
      but.addEventListener('click', event => {
        const target = event.target;
        editTimeInput(target.parentNode.parentNode.querySelector('.form__time-input'), purpose);
      });
    }
    else if(purpose === 'down') {
      but.addEventListener('click', event => {
        const target = event.target;
        editTimeInput(target.parentNode.parentNode.querySelector('.form__time-input'), purpose);
      });
    }
  }
}

//Function to set handler for changing timer mode
function setModeChangeHandler(modeButtons, pomodoroTimer) {
  for(let b of modeButtons){
    b.addEventListener('click', event => {
      startBut.removeEventListener('click', listener);

      for(let item of modeButtons) {
        item.classList.remove('active');
      }
      event.currentTarget.classList.add('active');

      setStartTimerHandler(pomodoroTimer, document.querySelector('.mode__item.active label').innerText);
    });
  }
}

//Function to set handler for closing settings
function setSettingsCloseHandler(buttons) {
  for(let but of buttons) {
    but.addEventListener('click', event => {
      document.querySelector('.settings').classList.remove('active');
    });
  }
}

//Function to set handler for opening settings
function setSettingsOpenHandler(buttons) {
  for(let but of buttons) {
    but.addEventListener('click', event => {
      document.querySelector('.settings').classList.add('active');
    });
  }
}

//Function to set handler for starting timer
function setStartTimerHandler(pomodoroTimer, timerName) {
  pomodoroTimer.resetTimerAfterChange(timerName, false);
  document.querySelector('.main__button.start').addEventListener('click', listener);
}

//Function to set handler to stop timer
function setStopTimerHandler(interval) {
  let startBut = document.querySelector('.main__button.start');
  let stopBut = document.querySelector('.main__button.stop');

  stopBut.addEventListener('click', event => {
    clearInterval(interval);
    stopBut.classList.remove('active');
    startBut.classList.add('active');
  });
}

//Function to set handler for form submit
function setSubmitHandler(pomodoroTimer, form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const target = event.target;
    const timerName = document.querySelector('.mode__item.active label').innerText;
    const fontButtons = target.querySelectorAll('input.form__font-input');
    const colorButtons = target.querySelectorAll('input.form__color-input');
    let body = document.body;
    let timerTime = pomodoroTimer.getTimerByName(timerName).initialTime/60;
    let inputTime = target.querySelector('input[name="'+timerName+'"]').value;
    let font, color;

    if(timerTime != inputTime) {
      let currentTimer =   pomodoroTimer.getTimerByName(timerName);
      currentTimer.setTime(inputTime);
      resetTimer(currentTimer, true);
    }

    for(let but of fontButtons) {
      if(but.checked) {
        body.className = but.value;
        font = but.value;
      }
    }
    for(let but of colorButtons) {
      if(but.checked){
        body.className += ' ' + but.value;
        color = but.value;
      }
    }

    pomodoroTimer.setTimers(target[0].value, target[1].value, target[2].value);
    document.querySelector('.settings').classList.remove('active');

    addToLocalStorage(pomodoroTimer, font, color);
  });
}

//Function to set handler for editing timer input
function setTimeInputChangeHandler(inputs) {
  for(let inp of inputs) {
    inp.addEventListener('change', event => {
      editTimeInput(event.target, '');
    });
  }
}

//Function to set handler for window resizing
function setWindowResizeHandler(pomodoroTimer) {
  window.addEventListener('resize', event => {
    resize();
  });
}

//Function to describe operations, after window has been resized
function resize() {
  const width = window.innerWidth;
  const svgCircle = document.querySelector('svg circle');
  const timerName = document.querySelector('.mode__item.active label').innerText;
  let radius, cx, cy;

  if(width < 430){
    radius = 124;
    cx = 134;
    cy = 134;
  }
  else {
    radius = 170;
    cx = 183;
    cy = 183;
  }

  const offsetNumber = 2*Math.PI*radius;
  svgCircle.style.strokeDasharray = offsetNumber;
  svgCircle.style.strokeDashoffset = offsetNumber - (offsetNumber*pomodoroTimer.getTimerByName(timerName).currentProgress)/100;
  svgCircle.setAttribute('r', radius);
  svgCircle.setAttribute('cx', cx);
  svgCircle.setAttribute('cy', cy);

  for(let item in pomodoroTimer) {
    pomodoroTimer[item].setRadius(radius);
  }
}
