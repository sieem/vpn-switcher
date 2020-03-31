const readline = require('readline');
const Writable = require('stream').Writable;
const bcrypt = require('bcrypt')
const saltRounds = 10

const mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        if (!this.muted)
            process.stdout.write(chunk, encoding);
        callback();
    }
});

mutableStdout.muted = false;

const rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
});
rl.question('Type a password? ', (answer) => {
    bcrypt.hash(answer, saltRounds, (err, hash) => {
        if (err) {
            console.error(err)
        }
        console.log(hash)
    })
    
    rl.close();
});


mutableStdout.muted = true;
