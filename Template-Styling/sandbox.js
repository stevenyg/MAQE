const input = "2020-05-08T17:01:15Z"
const moment = require('moment');
const date = moment(input).format(' dddd MMMM d, YYYY, h:mm ')

console.log(date);

