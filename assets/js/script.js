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

console.log(time);
function createCards(){
    for(let i=0; i<time.length;i++){
        $contEl.append(
        `<div class="card-group flex-row justify-content-between" id="group${i}">
            <div class="card col-sm-1 col-1">
                <div class="card-body d-flex align-items-center justify-content-center">
                    <p class="card-text" id="time-${i}">${time[i].time}</p>
                </div>
            </div>
            <div class="card col-10">
                <div class="card-body d-flex flex-column justify-content-between mw-100 p-0" id="time-subdivision-${i}">
                    
                </div>
            </div>
            <div class="card col-1 col-sm-1">
                <div class="card-body">
                    <p class="card-text"></p>
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
            // intervals= moment(moment.duration(j*15, 'minutes')).format('mm');
            intervals= moment.duration({minutes: j*15});
            intervals= intervals.format('mm', { trim: false })
            console.log(intervals);
            $timeSubdivisions[i].append(
                `<div class="d-flex align-items-center mw-100">
                    <p class="mx-3 mb-0 py-2px">:${intervals}</p><textarea class="card-text" placeholder="Set your event here"></textarea>
                </div>
                <hr>`
            );
        }
    }
}

createCards();
// moment().format('[j*15]')
// moment({minute:})

// moment(momento._data.minutes).format('mm');
// '00'

