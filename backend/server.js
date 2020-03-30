require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const staticRoot = '../frontend/public/'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api', routes);

app.use(function (req, res, next) {
    //if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }

    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.use(express.static(staticRoot, { dotfiles: 'allow' }));

//starting up the server
if (process.env.NODE_ENV == "production") {
    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/vpnswitcher.siemlasseel.be/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/vpnswitcher.siemlasseel.be/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/vpnswitcher.siemlasseel.be/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(process.env.PORT, err => {
        if (err) {
            return console.error(err);
        }
        console.log(`App listening on port ${httpsServer.address().port} SSL`);
    });

    // setting redirect for non http traffic
    http.createServer(function (req, res) {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
    }).listen(80);
}
else if (process.env.NODE_ENV == "development") {
    const httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT || 3000, err => {
        if (err) {
            return console.error(err);
        }
        console.log(`App listening on port ${httpServer.address().port} Non-SSL`);
    });
}
else {
    throw new Error("No NODE_ENV defined, perhaps run npm start of npm run dev?");
}