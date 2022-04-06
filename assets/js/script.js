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
var $saveButtons;
var intervals;
var currentTime;

console.log(time);
$headerEl.text(moment().format("dddd, MMMM Do YYYY, HH:mm:ss"));
function createCards(){
    currentTime= moment().format('HH')
    console.log(currentTime);
    for(let i=0; i<time.length;i++){
        $contEl.append(
        `<div class="card-group flex-row justify-content-between" id="group${i}">
            <div class="card col-sm-1 col-1">
                <div class="card-body d-flex align-items-center justify-content-center">
                    <p class="card-text" id="time-${i}">${moment(time[i].time,'HH').format('HH')}</p>
                </div>
            </div>
            <div class="card col-10">
                <div class="card-body d-flex flex-column justify-content-between mw-100 p-0" id="time-subdivision-${i}">
                    
                </div>
            </div>
            <div class="card col-1 col-sm-1">
                <div class="card-body d-flex flex-column justify-content-between">
                    <button class="save-button" tittle='click to save'><i class="fa-solid fa-floppy-disk save-button" style="font-size:30px" ></i></button>
                    <button class="delete-button"><i class="fa-solid fa-trash delete-button" style="font-size:30px"></i></button>
                </div>
            </div>
        </div>`);
        $timeCards.push($(`#group${i}`));
        console.log($timeCards);
        $timeSubdivisions.push($(`#time-subdivision-${i}`));
        console.log($timeSubdivisions);
        $timeContainers.push($(`#time-${i}`));
        console.log($timeContainers);
        for(let j=0; j<4; j++){
            intervals= moment(j*15,'mm').format('mm');
            console.log(intervals);
            $timeSubdivisions[i].append(
                `<div class="d-flex align-items-center mw-100">
                    <p class="mx-3 mb-0 py-2px">:${intervals}</p><textarea class="card-text" placeholder="Set your event here" id='text-${$timeContainers[i].text()}-${j}'></textarea>
                </div>
                <hr>`
            );
        }
        if (moment(time[i].time,'HH').format('HH') < currentTime){
            $timeCards[i].addClass('past-time');
        } else if(moment(time[i].time,'HH').format('HH') > currentTime){
            $timeCards[i].addClass('future-time');
        } else{
            $timeCards[i].addClass('present-time');
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

function storeTasks(){
    for (let i=0;i<time.length;i++){
        for (let j=0;j<4;j++){
            time[i].tasks[j]=($(`#text-${$timeContainers[i].text()}-${j}`)).val();
        }
    }
    localStorage.setItem('savedTasks',JSON.stringify(time));
}
function retrieveTasks(){
   var tempTasks=JSON.parse(localStorage.getItem('savedTasks'));
   if (tempTasks !== null){
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
}

init();
