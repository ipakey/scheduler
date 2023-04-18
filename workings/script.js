// ! Create the calendar

// ? variables 

const calendar = document.querySelector('.calendar'),
  daysContainer = document.querySelector('.days'),
  date = document.querySelector('.date');
  
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
 
  todayBtn = document.querySelector('.today-btn'),
  gotoBtn = document.querySelector('.goto-btn'),
  dateInput = document.querySelector('.date-input'),

  eventDay = document.querySelector('.event-day'),
  eventDate = document.querySelector('.event-date'),
  eventsContainer = document.querySelector('.events'),
  addEventBtn = document.querySelector('.add-event'),
  addEventWrapper = document.querySelector('.add-event-wrapper'),
  addEventCloseBtn = document.querySelector('.close'),
  addEventTitle = document.querySelector('.event-name'),
  addEventFrom = document.querySelector('.event-time-from '),
  addEventTo = document.querySelector('.event-time-to'),
  addEventSubmit = document.querySelector('.add-event-btn ');

  // ? check source data 
  console.log(  'variables:  ' + calendar + ' ' + date  + ' ' + daysContainer + ' ' + prev  + ' ' + next  + ' ' +todayBtn  + ' ' + gotoBtn  + ' ' + dateInput);

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
console.log('hello  month:  ' + month + ' year: ' + year);

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];


// ?function to add days

function initCalendar(){
    // to get starting data for current month display
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const day = firstDay.getDay();
        const lastDate = lastDay.getDate();
        const nextDays = 7 - lastDay.getDay();
       
        console.log( 'first day: ' + firstDay + ' last day: ' + lastDay + ' prev last day: ' + prevLastDay + ' prev days: ' + prevDays + 'last date: ' + lastDate + ' day: ' + day + ' next days: ' + nextDays);

    // ? update date at top of calendar
    // console.log(date +' L58');
    date.innerHTML = months[month] + ' ' + year;
   

    let days = '';

    // ? prev months days  
    if(day == 0){
      let sunday = 6;
      for (let x = sunday; x > 0; x--) {
        days += `<div class='day prev-day'>${prevDays - x + 2}</div>`;
      }
    }else
    for (let x = day; x > 1; x--) {
      days += `<div class='day prev-day'>${prevDays - x + 2}</div>`;
    }
    // console.log( 'days L70: ' + days);

    // ? current month days
    for(let i=1;i<=lastDate; i++){
      //if day is today add class 'today'
      if( i == new Date().getDate() && 
          year == new Date().getFullYear() && 
          month == new Date().getMonth()){
            days += `<div class='day today'>${i}</div>`;
      }
      // ? add remaining days this month
      else{
        days += `<div class='day'>${i}</div>`;
      }
    }
          // ? add next month days
      if(nextDays < 7){
        for (let j=1; j < nextDays +1 ; j++){
          days += `<div class='day next-day'>${j}</div>`;
        }
      }
   // console.log( 'days L101: ' + days);
    daysContainer.innerHTML =  days;
}

initCalendar();


// ! button functionality

// ? last month
function prevMonth(){
  month--;
  if(month < 0){
    month = 11;
    year--;
  }
  initCalendar();
}

// ? next month

function nextMonth(){
  month++;
  if(month > 11){
    month = 0;
    year++;
  }
  initCalendar();
}

// ? add eventlistener on prev and next
prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);


// ? add goto date and goto today functionality

todayBtn.addEventListener('click', () => {
  console.log('today input event listener activated L137');
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

  dateInput.addEventListener("input", (e) => {
    //only allow numbers remove anything else
    console.log('date input event listener activated L145');
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length == 2){
        // add a slash if two numbers entered
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7){
      //don't allow more than 7 characters
      dateInput.value = dateInput.value.slice(0,7);
    }
    //if backspace is pressed
    if(e.inputType == "deleteContentBackward"){
      if (dateInput.value.length == 3){
        dateInput.value = dateInput.value.slice(0,2);
      }
    }
});

gotoBtn.addEventListener('click', gotoDate);
//   console.log('goto button event listener activated L166');

gotoBtn.addEventListener('click',  );
//   console.log('goto button event listener activated L166');


function gotoDate(){
  const dateArr = dateInput.value.split("/");
  console.log(dateArr);
  if(dateArr.length == 2){
    if(dateArr[0] >0 && dateArr[0] < 13 && dateArr[1].length == 4){
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("invalid date");
}

