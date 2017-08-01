var Shift = (wStart, wEnd) =>
{
    // console.log("shift function acceseed");
    // var start = Date.parse(wStart);
    // var end = Date.parse(wEnd);
    // var time = end-start;
    // var hrs = time/3600000;
    // console.log(hrs);
    // var shift;
    // if(hrs === 24)
    // {
    //     shift = "24_hours";
    // }
    // else{
        var start = new Date(wStart);
        var s= start.getUTCHours();
        console.log(s);
        var end = new Date(wEnd);
        var e = end.getUTCHours();
        console.log(e);
        if((8<=s) && (e < 21))
        {
            shift = "Day";
        }
        else if(s >= 21) 
        {
            shift = "Day"
        }
        else 
        {
            shift = "Night";
        }
    

    return shift;

}



var work_Start = "2017-07-22T12:00:21.000Z";
var work_End = "2017-07-23T00:00:21.000Z";

var d = Shift(work_Start , work_End);
console.log(d);

module.exports = {
    Shift
}