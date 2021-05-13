/* DOM Elements */
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  userName = document.getElementById('name'),
  focus = document.getElementById('focus'),
  format = document.getElementById('format');

/* Options */
let isShowAmPm = false;

/* Show Time */
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  /* Set AM or PM */
  const amPm = hour >= 12 ? '<span> PM</span>' : '<span> AM</span>';

  if (!isShowAmPm) {
    hour = today.getHours();
    isShowAmPm = false;
  } else {
    hour = hour % 12 || 12;
    isShowAmPm = true;
  }

  /* Output Time */
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}${isShowAmPm ? amPm : ''}`;
  setTimeout(showTime, 1000);
}

/* Switch Formats Hours*/
function formatHours() {
  if (!isShowAmPm) {
    format.innerText = '24hr';
    isShowAmPm = true;
  } else {
    format.innerText = '12hr';
    isShowAmPm = false;
  }
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
    document.body.style.backgroundImage = "url('./assets/images/morning.png')";
    greeting.textContent = 'Good morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('./assets/images/afternoon.png')";
    greeting.textContent = 'Good afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = "url('./assets/images/evening.png')";
    greeting.textContent = 'Good evening, ';
  }
}

/* Get Name */
function getName() {
  if (localStorage.getItem('name') === null) {
    userName.textContent = '[Enter Name]';
  } else {
    userName.textContent = localStorage.getItem('name');
  }
}

/* Set Name */
function setName(e) {
  const keyEnter = 13;
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == keyEnter || e.keyCode == keyEnter) {
      localStorage.setItem('name', e.target.innerText);
      userName.blur();
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
  const keyEnter = 13;
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == keyEnter || e.keyCode == keyEnter) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function selectElementText(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

userName.addEventListener('click', () => selectElementText(userName));
focus.addEventListener('click', () => selectElementText(focus));

userName.addEventListener('keypress', setName);
focus.addEventListener('keypress', setFocus);

userName.addEventListener('blur', setName);
focus.addEventListener('blur', setFocus);

format.addEventListener('click', formatHours);

/* Run Functions */
showTime();
setBgGreet();
getName();
getFocus();
