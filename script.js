let startPauseButton = document.querySelector('#start_stop');
let resetButton = document.querySelector('#reset');
let increaseSessionButton = document.querySelector('#session-increment');
let decreaseSessionButton = document.querySelector('#session-decrement');
let increaseBreakButton = document.querySelector('#break-increment');
let decreaseBreakButton = document.querySelector('#break-decrement');
let holdSession = document.getElementById('session-length');
let breakSession = document.getElementById('break-length');
let timerLabel = document.getElementById('timer-label');

function sec2time(timeInSeconds) {
  var pad = function(num, size) {
      return ('000' + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return pad(minutes, 2) + ':' + pad(seconds, 2);
}

/* 
Break length increase and Decrease
*/
let a = true;
let breakLength = 5 * 60;

function subtractBreakLength() {
  if (breakLength > 300 && a) {
    breakLength -= 1 * 60;
    let breakTime = sec2time(breakLength);
    breakSession.textContent = breakTime;
  } else return;
}

function addBreakLength() {
  if (breakLength < 6000 && a) {
    breakLength += 1 * 60;
    let breakTime = sec2time(breakLength);
    breakSession.textContent = breakTime;
  } else return;
}

// Break Button Event Listeners
increaseBreakButton.addEventListener('click', function() {
  if (breakLength < 6000 && a) {
    addBreakLength();
  } else return;
});

decreaseBreakButton.addEventListener('click', function() {
  if (breakLength > 0 && a) {
    subtractBreakLength();
  } else return;
});

/* 
Session length increase and Decrease
*/
let session = 25 * 60;

function sessionSubtraction() {
  if (session > 1200 && a) {
    session -= 1 * 60;

    let newTime = sec2time(session);
    holdSession.textContent = newTime;
    //for countdown
    let holdSessionCount = document.getElementById('time-left');
    holdSessionCount.textContent = newTime;
  } else return;
}

function sessionAddition() {
  if (session < 100000 && a) {
    session += 1 * 60;

    let newTime = sec2time(session);
    holdSession.textContent = newTime;
    //for countdown
    let holdSessionCount = document.getElementById('time-left');

    holdSessionCount.textContent = newTime;
  } else return;
}

// Session Event Listeners
decreaseSessionButton.addEventListener('click', function() {
  if (session > 0 && a) {
    sessionSubtraction();
  } else return;
});

increaseSessionButton.addEventListener('click', function() {
  if (a) {
    sessionAddition();
  } else return;
  s;
});

let s;
let r;

//Breaktime clock

function runningBreakTime() {
  if (breakLength <= 0 && session <= 0) {
    return;
  } else if (breakLength > 0 && session <= 0) {
    breakLength--;
    let breakTime = sec2time(breakLength);

    let holdSessionCount = document.getElementById('time-left');
    holdSessionCount.textContent = breakTime;
    timerLabel.innerText = 'Break Time';
  }
}

function runBreakTime() {
  s = setInterval(runningBreakTime, 1000);
  a = false;
}
function stopBreakTime() {
  clearInterval(s);
  a = true;
}

// Running Clck
function runningClock() {
  if (session <= 0) {
    return;
  } else {
    timerLabel.innerText = 'Session Time';
    session--;
    let newTime = sec2time(session);
    let holdSessionCount = document.getElementById('time-left');
    holdSessionCount.textContent = newTime;
  }
}

function runClock() {
  r = setInterval(runningClock, 1000);
  a = false;
}

function stopRunClock() {
  clearInterval(r);
  a = true;
}

/** Start and Reset Buttons */

startPauseButton.addEventListener(
  'click',
  function() {
    if (a) {
      runClock();
      runBreakTime();
    } else {
      stopBreakTime();
      stopRunClock();
    }
  },
  false
);

resetButton.addEventListener('click', function() {
  stopBreakTime();
  stopRunClock();
  breakLength = 5 * 60;
  session = 25 * 60;
  let newTime = sec2time(session);
  holdSession.textContent = newTime;
  let holdSessionCount = document.getElementById('time-left');

  holdSessionCount.textContent = newTime;
});
