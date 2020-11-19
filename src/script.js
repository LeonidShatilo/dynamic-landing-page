/* DOM Elements */
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus'),
  format = document.getElementById('format');

/* Options */
let isShowAmPm = false;
let isHour24 = true;

/* Show Time */
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  /* Set AM or PM */
  let amPm = hour >= 12 ? '<span> PM</span>' : '<span> AM</span>';

  /* 12hr Format */
  if (format.innerText === '12hr' && isHour24) {
    hour = today.getHours();
    isShowAmPm = false;
  }
  else {
    hour = hour % 12 || 12;
    isShowAmPm = true;
  }

  /* Output Time */
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}${isShowAmPm ? amPm : ''}`;
  setTimeout(showTime, 1000);
}

function formatHours() {
  let today = new Date(),
    hour = today.getHours();
  if (format.innerText === '12hr' && isHour24) {
    format.innerText = '24hr';
    isShowAmPm = false;    
  }
  else {
    format.innerText = '12hr';
    isShowAmPm = true;
  }
  console.log('Touch');
}

/* Add Zeros */
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

/* Set Background and Greeting */
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('/dynamic-landing-page/assets/images/morning.png')";
    greeting.textContent = 'Good morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('/dynamic-landing-page/assets/images/afternoon.png')";
    greeting.textContent = 'Good afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = "url('/dynamic-landing-page/assets/images/evening.png')";
    greeting.textContent = 'Good evening, ';
  }
}

/* Get Name */
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

/* Set Name */
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

/* Get Focus */
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

/* Set Focus */
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
format.addEventListener('click', formatHours);

/* Run Functions */
showTime();
setBgGreet();
getName();
getFocus();