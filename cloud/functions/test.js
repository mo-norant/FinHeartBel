var math = require('mathjs');
var json = require('../../administratie/JsonDummy.json');

console.log(new Date());

var sum = json.measurement1.sensor1.reduce(add, 0);

function add(a, b) {
    return a + b;
}

console.log(sum);

