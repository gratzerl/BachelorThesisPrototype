//functions for handling timestamps

import moment from 'moment';

export const getCurrentUnixTimeStamp = function(){
    return Date.parse(new Date())/1000;
}

export const convertToUnixTS = function (date){
    let unixTS = Date.parse(new Date(moment(date)))/1000;
    return unixTS;
}