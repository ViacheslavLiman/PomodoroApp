//Global timer
let pomodoroTimer = new Pomodoro(25, 5, 15);

//Getting information from local storage
getFromLocalStorage(pomodoroTimer);

//Doing a resize operations if it is necessary
resize();

//Setting the necessary handlers
setActiveHandler(document.querySelectorAll('.form__color'));
setActiveHandler(document.querySelectorAll('.form__font'));
setArrowsHandler(document.querySelectorAll('.form__time-arrow-down'), 'down');
setArrowsHandler(document.querySelectorAll('.form__time-arrow-up'), 'up');
setModeChangeHandler(document.querySelectorAll('.mode__item'), pomodoroTimer);
setSettingsCloseHandler(document.querySelectorAll('.settings-close'));
setSettingsOpenHandler(document.querySelectorAll('.settings-open'));
setStartTimerHandler(pomodoroTimer, document.querySelector('.mode__item.active label').innerText);
setSubmitHandler(pomodoroTimer, document.querySelector('.settings__form'));
setTimeInputChangeHandler(document.querySelectorAll('.form__time-input'));
setWindowResizeHandler(pomodoroTimer);
