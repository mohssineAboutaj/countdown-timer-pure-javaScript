// get constant variables & main container
const container = document.getElementById('timer'),
      oneSec = 1000,
      timeSpanClass = "time",
      timeSeparatorClass = "separator";

// get values from main container
let dataHours 	= container.getAttribute('data-hours'),
    dataMinutes = container.getAttribute('data-minutes'),
    dataSeconds = container.getAttribute('data-seconds'),
		timerEnd 		= container.getAttribute('data-timer-end'),
		timerOnEndMsg = "data-timer-end";

// set a default value if the Hours attribute is NaN or null
if (dataHours == '' || dataHours == null || dataHours == NaN) {
  dataHours = "0";
}
// set a default value if the Minutes attribute is NaN or null
if (dataMinutes == '' || dataMinutes == null || dataMinutes == NaN) {
  dataMinutes = "0";
}
// set a default value if the Seconds attribute is NaN or null
if (dataSeconds == '' || dataSeconds == null || dataSeconds == NaN) {
  dataSeconds = "0";
}

// create childs element to set the countdown times & convert data-attr to numbers
let hoursSpan = document.createElement('span'),
    minutesSpan = document.createElement('span'),
    secondsSpan = document.createElement('span'),
    separator1 = document.createElement('span'),
    separator2 = document.createElement('span'),
    separatorValue = ":",
    max = 59,
    s = parseInt(dataSeconds) > max ? max : parseInt(dataSeconds),
    m = parseInt(dataMinutes) > max ? max : parseInt(dataMinutes),
    h = parseInt(dataHours);

// set classes and value into spans
secondsSpan.classList.add(timeSpanClass);
minutesSpan.classList.add(timeSpanClass);
hoursSpan.classList.add(timeSpanClass);
separator1.classList.add(timeSeparatorClass);
separator1.textContent = separatorValue;
separator2.classList.add(timeSeparatorClass);
separator2.textContent = separatorValue;

// check value and add 0 if it less than 10
checkValue = (value) => {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}

hoursSpan.textContent = checkValue(dataHours);
minutesSpan.textContent = checkValue(dataMinutes);
secondsSpan.textContent = checkValue(dataSeconds);

// change/update values every one second
timer = (sv,mv,hv) => {

  s = parseInt(sv);
  m = parseInt(mv);
  h = parseInt(hv);
  
  if (s > 0) {
    return s -= 1;
  } else {
    s = max;
    if (m > 0) {
      return m -= 1;
    } else {
      m = max;
      if (h > 0) {
        return h -= 1;
      }
    }
  }
}

// on countdown finished stop script counting
finished = () => {
  max = 0;
	let timerEnd = container.getAttribute(timerOnEndMsg);
	container.setAttribute(timerOnEndMsg, 'true');
	if (timerEnd == '' || timerEnd == null) {
		container.textContent = "timer-end";
	} else {
		container.textContent = timerEnd;
	}
}

// increament values in span.time
counter = setInterval(()=>{

  if (h == 0 && m == 0 && s == 0) {
    clearInterval(counter, finished());
  }

  if (s >= 0) {
    timer(s,m,h);
    hoursSpan.textContent   = checkValue(h);
    minutesSpan.textContent = checkValue(m);
    secondsSpan.textContent = checkValue(s);
  }
}, oneSec);

let children = [hoursSpan, separator1, minutesSpan, separator2, secondsSpan];

// add time & separators into main container
for (child of children) {
  container.appendChild(child);
}
