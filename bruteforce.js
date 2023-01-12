const readline = require('readline');
const fs = require('fs');
const path = require('path');

console.clear();
console.log("\r\n _______  _______  _______  _______ \r\n(       )(  ___  )(  ____ )(  ____ \\\r\n| () () || (   ) || (    )|| (    \\\/\r\n| || || || (___) || (____)|| (_____ \r\n| |(_)| ||  ___  ||     __)(_____  )\r\n| |   | || (   ) || (\\ (         ) |\r\n| )   ( || )   ( || ) \\ \\__\/\\____) |\r\n|\/     \\||\/     \\||\/   \\__\/\\_______)")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is the target number? ', (target) => {
    target = Number(target);
    let startTime = Date.now();
    let count = 0;
    let numbers = [];
    let max = 999999;
    let randomNum = Math.floor(Math.random()*(max - 0 + 1)) + 0;
    while (randomNum != target) {
        if(numbers.includes(randomNum)) {
            randomNum = Math.floor(Math.random()*(max - 0 + 1)) + 0;
            continue;
        }
        count++;
        if(randomNum != target)console.log("\x1b[31m", randomNum);
        else console.log("\x1b[32m", randomNum);
        numbers.push(randomNum);
        randomNum = Math.floor(Math.random()*(max - 0 + 1)) + 0;
    }
    let endTime = Date.now();
    let elapsedTime = (endTime - startTime) / 1000;
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    console.log("\x1b[32m","The number was found in " + minutes + " minutes and " + seconds + " seconds, after trying " + count + " numbers.");

    rl.question('Do you want to save the numbers into a text file? (yes or no)', (answer) => {
        if (answer === 'yes' || answer === 'y') {
            const filename = Math.random().toString(36).substring(2, 15) + '.txt';
            const filepath = path.join(__dirname, filename);
            fs.writeFile(filepath, numbers.join('\n'), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`The numbers were saved to ${filepath}`);
                }
            });
        }
        rl.close();
    });
});
