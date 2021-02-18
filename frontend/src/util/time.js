//functions for handling unixTS

import moment from "moment";

export const timeDifferenceSeconds = function(now, then){
    then = moment.unix(then);
    now == null ? (now = moment(new Date())) : (now = moment.unix(now));
    return now.diff(then, "seconds");
}

export const timeDifference = function(now, then){
    const days = timeDifferenceDays(now, then);
    const hourMin = timeDifferenceHM(now, then);
    if(days === 0){
        return hourMin;
    }
    return days + "T " + hourMin;
}


export const timeDifferenceHM = function(now, then){
    then = moment.unix(then);
    now == null ? (now = moment(new Date())) : (now = moment.unix(now));
    const duration = moment.duration(now.diff(then)).asMilliseconds();
    const difference = moment.utc(duration).format("HH:mm")
    return difference;
}

export const timeDifferenceDays = function(now, then){
    then = moment.unix(then);
    now == null ? (now = moment(new Date())) : (now = moment.unix(now));
    return now.diff(then, "days")
}

export const timeInHourMinutes = function(unixTS){
    return moment.unix(unixTS).format("hh:m");
}