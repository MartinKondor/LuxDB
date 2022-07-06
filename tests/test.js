const LuxDB = require('../index');
const luxdb = new LuxDB('cache/testdb.json');

const runTest = (func, params, outputs, names) => {
    if (params.length != outputs.length) {
        return '❌ Not the same ammount of params and outputs';
    }

    for (let i = 0; i < params.length; i++) {
        if (func(...params[i]) === outputs[i]) {
            console.log('🟢 [passed] ' + names[i]);
        }
        else {
            console.log('🔴 [failed] ' + names[i]);
        }
    }
}

runTest(a => a+1, [['1'], [1]], [2, 2], ['First', 'Second'])
