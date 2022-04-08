var $contEl= $('#planner-container');
var $headerEl= $('#header-date');
var time=
[
    {   time: 9,
        tasks: [],
    },
    {   time: 10,
        tasks: [],
    },
    {   time: 11,
        tasks: [],
    },
    {   time: 12,
        tasks: [],
    },
    {   time: 13,
        tasks: [],
    },
    {   time: 14,
        tasks: [],
    },
    {   time: 15,
        tasks: [],
    },
    {   time: 16,
        tasks: [],
    },
    {   time: 17,
        tasks: [],
    },
];
var $timeCards=[];
var $timeSubdivisions=[];
var $timeContainers=[];
var intervals;
var currentTime;

console.log(time);
function createCards(){
    currentTime= moment().format('HH')  //returns the current time just the hour value i.e. if it's 9:43 am returns '09'
    console.log(currentTime);
    for(let i=0; i<time.length;i++){
        $contEl.append( //creates dinamically the containers for the time, the tasks and the icons. Also, assigns id's to these containers (dynamically too) and displays the time with the format of 'HH' .
        `<div class="row card-group flex-row justify-content-between" id="group${i}">
            <div class="card col-sm-1 col-2">
                <div class="card-body d-flex align-items-center justify-content-center px-0">
                    <p class="card-text" id="time-${i}">${moment(time[i].time,'HH').format('HH')}</p>
                </div>
            </div>
            <div class="card col-8 col-sm-10">
                <div class="card-body d-flex flex-column justify-content-between mw-100 p-0" id="time-subdivision-${i}">
                    
                </div>
            </div>
            <div class="card col-2 col-sm-1 px-0">
                <div class="card-body d-flex flex-column justify-content-between px-0">
                    <button class="save-button" tittle='click to save'><i class="fa-solid fa-floppy-disk save-button icons-size" ></i></button>
                    <button class="delete-button"><i class="fa-solid fa-trash delete-button icons-size"></i></button>
                </div>
            </div>
        </div>`);
        $timeCards.push($(`#group${i}`)); //stores the groups containers in an array
        console.log($timeCards);
        $timeSubdivisions.push($(`#time-subdivision-${i}`)); //stores the subdivision containers in an array
        console.log($timeSubdivisions);
        $timeContainers.push($(`#time-${i}`)); //stores the p element that displays the time in an array
        console.log($timeContainers);
        for(let j=0; j<4; j++){ // creating the 4 subdivisions for 15 min intervals
            intervals= moment(j*15,'mm').format('mm'); //setting the format to showing only minutes.
            console.log(intervals);
            $timeSubdivisions[i].append(
                `<div class="d-flex align-items-center mw-100">
                    <p class="mx-3 mb-0 py-2px">:${intervals}</p><textarea class="card-text" placeholder="Set your event here" id='text-${$timeContainers[i].text()}-${j}'></textarea>
                </div>
                <hr>`
            );// generates the for text areas where the user will input their tasks, in 15 min intervarls for each time of the day.
        }
        if (moment(time[i].time,'HH').format('HH') < currentTime){ //sets the background color of the card to red if the current time is bigger than the time in the card. Remember that we are only comparing the HH vs HH, minutes have no influence in this condition.
            $timeCards[i].addClass('past-time');
        } else if(moment(time[i].time,'HH').format('HH') > currentTime){ //sets the background color of the card to green if the current time is smaller than the time in the card. Remember that we are only comparing the HH vs HH, minutes have no influence in this condition.
            $timeCards[i].addClass('future-time');
        } else{
            $timeCards[i].addClass('present-time'); //sets the background color of the card to yellow if the current time is equal to the time in the card. Remember that we are only comparing the HH vs HH, minutes have no influence in this condition.
        }
        
    }
}
function setEventListeners(){
    $contEl.on('click', saveDelete);
}

function saveDelete(evt){
        var target= $(evt.target);
        console.log(target);
        console.log(target.hasClass('save-button'));
        if (target.hasClass('save-button')){
            storeTasks();
        }else if (target.hasClass('delete-button')){
            var trans= (((target.parents("div[id^='group']")).children().eq(1)).children()).children('div');
            var textEl;
            for (let i=0;i<4;i++){
                textEl= ((trans.eq(i)).children('textarea'));
                textEl.val('');
            }
            storeTasks();
        }
}

function storeTasks(){ //stores the tasks contained in the <textarea>s in the time object.
    for (let i=0;i<time.length;i++){
        for (let j=0;j<4;j++){
            time[i].tasks[j]=($(`#text-${$timeContainers[i].text()}-${j}`)).val();
        }
    }
    localStorage.setItem('savedTasks',JSON.stringify(time)); //stores in local memory
}
function retrieveTasks(){ //brings back saved tasks 
   var tempTasks=JSON.parse(localStorage.getItem('savedTasks'));
   if (tempTasks !== null){ //if there are any stored tasks we populate the object property 'tasks' which is an array.
       time=tempTasks;
       for (let i=0;i<time.length;i++){
        for (let j=0;j<4;j++){
            ($(`#text-${$timeContainers[i].text()}-${j}`)).val(`${time[i].tasks[j]}`);
        }
    }
   }
    
}

function init(){
    setEventListeners();
    createCards();
    retrieveTasks();
    window.setInterval(function(){ //displays the current time updating every second.
        $headerEl.text(moment().format("dddd, MMMM Do YYYY, HH:mm:ss"));
    },1000)
}

init();
