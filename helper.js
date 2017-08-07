var Shift = (wStart, wEnd) => {
    

    var hrs = (Date.parse(wEnd) - Date.parse(wStart)) / 3600000;
    var s = new Date(wStart).getUTCHours();
    var e = new Date(wEnd).getUTCHours();
    if (hrs < 0) {
        var statement = "wrong time durations entered"
        return statement;
    }
    if ((s >= 8) && (e <= 21) && (hrs <= 12) && (e !== 0)) {
        shift = "Day";
    }
    else if ((s >= 21) && (e <= 8) && (hrs <= 12)) {
        shift = "Night";
    }
    else {
        shift = "24_hrs";
    }
    return shift;

}

//test

// var work_Start = "2017-07-22T12:00:21.000Z";
// var work_End = "2017-07-22T01:00:21.000Z";

// var d = Shift(work_Start, work_End);
// console.log(d);

module.exports = {
    Shift
}