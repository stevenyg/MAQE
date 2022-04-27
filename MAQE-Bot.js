const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please insert direction command : ', function bot(string) {

    let lastP = [0, 0]
    let facing = 'North'
    let move = []

    for (let i = 0; i < string.length; i++) {
        // console.log(facing);
        // console.log(string[i]);

        if (string[i] === 'R') {
            switch (facing) {
                case 'North':
                    facing = 'East'
                    break;
                case 'East':
                    facing = 'South'
                    break;
                case 'South':
                    facing = 'West'
                    break;
                case 'West':
                    facing = 'North'
                    break;
                default:
                    break;
            }
        } else if (string[i] === 'L') {
            switch (facing) {
                case 'North':
                    facing = 'West'
                    break;
                case 'East':
                    facing = 'North'
                    break;
                case 'South':
                    facing = 'East'
                    break;
                case 'West':
                    facing = 'South'
                    break;
                default:
                    break;
            }
        } else if (string[i] === 'W') {
            do {
                i++
                move.push(string[i])
            } while (string[i + 1] !== 'R' && string[i + 1] !== 'L' && string[i + 1] !== undefined);
            switch (facing) {
                case 'North':
                    lastP[1] = lastP[1] + +move.join('')
                    move = []
                    break;
                case 'East':
                    lastP[0] = lastP[0] + +move.join('')
                    move = []
                    break;
                case 'South':
                    lastP[1] = lastP[1] - +move.join('')
                    move = []
                    break;
                case 'West':
                    lastP[0] = lastP[0] - +move.join('')
                    move = []
                    break;
                default:
                    break;
            }
        }
    }
    console.log(`X: ${lastP[0]} Y: ${lastP[1]} Direction: ${facing}`)
    rl.close()
});


rl.on('close', function () {
    console.log('\nThank you !!!');
    process.exit(0);
});