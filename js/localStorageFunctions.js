//Function to add pomodoro timer, font and color to the local storage
function addToLocalStorage(pomodoroTimer, font, color) {
  for(const item in pomodoroTimer){
    localStorage.setItem(item, JSON.stringify(pomodoroTimer[item].initialTime/60));
  }

  localStorage.setItem('font', font);
  localStorage.setItem('color', color);
}

//Function to get pomodoro timer, font and color from the local storage
function getFromLocalStorage(pomodoroTimer) {
  let font = localStorage.getItem('font');
  let color = localStorage.getItem('color');

  if(font == null || color == null){
    addToLocalStorage(pomodoroTimer, 'khumb', 'red');
    font = localStorage.getItem('font');
    color = localStorage.getItem('color');
  }

  for(const item in pomodoroTimer) {
    pomodoroTimer[item].setTime(JSON.parse(localStorage.getItem(item)));
  }

  updateForm(pomodoroTimer, font, color);

  document.body.className = font + ' ' + color;
}

//Function to update settings form 
function updateForm(pomodoroTimer, font, color) {
  let formTimeInputs = document.querySelectorAll('.settings .form__time-input');
  let formFonts = document.querySelectorAll('.settings .form__font-input');
  let formColors = document.querySelectorAll('.settings .form__color-input');
  let i = 0;

  for(const item in pomodoroTimer) {
    formTimeInputs[i].value = pomodoroTimer[item].initialTime/60;
    i++;
  }
  for(const item of formFonts) {
    if(item.value == font){
      item.parentNode.classList.add('active');
      item.setAttribute('checked', 'checked');
    }
  }
  for(const item of formColors) {
    if(item.value == color){
      item.parentNode.classList.add('active');
      item.setAttribute('checked', 'checked');
    }
  }
}
