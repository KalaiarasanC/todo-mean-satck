const express = require('express')
const app = express()
const cors = require('cors');
const oktaAuth = require('okta-auth')
const expressOktaSaml = require('express-okta-saml')
const mongoose = require('mongoose');
mongoose.connect('mongodb://user_1:user_1@ds117422.mlab.com:17422/app_db', {
    useNewUrlParser: true
})

const morgan = require('morgan')
const bodyParser = require('body-parser');

const todoRoutes = require('./api/routes/todo')
const userRoutes = require('./api/routes/user')

// const expressOktaSamlConfig = require('./oktaConfig.js');
app.use(morgan('dev'))

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     console.log('methid', req.method);
//     // if (req.method == 'OPTIONS') {
//     //     console.log('option')
//     //     res.header('Access-Control-Allow-Methods',
//     //         'PUT, POST, PATCH, DELETE, GET')
//     //     res.status(200)
//     // } 
//     next()
//         // else {
//         //     next();
//         // }
// });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Orgin', '*')
//     res.header('Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     )
//     if (req.method == 'OPTIONS') {
//         console.log('options bandhig=he')
//         res.header('Access-Control-Allow-Methods',
//                 'PUT, POST, PATCH, DELETE, GET')
//             // next()
//             // res.json({ 'kalai': 'fuck you' })
//         return res.status(200).json({ "kalai": "fuck you" })
//     }
//     next()
// })

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404
//     next(err)
// })

// app.use((err, req, res, next) => {
//     res.status(err.status || 500)
//     res.json({
//         error: {
//             message: err.message
//         }
//     })
//     next();
// })

const expressOktaSamlConfig = require('./okta/oktaConfig.js'); // check bellow for config exmaple and tips
const okta = expressOktaSaml(app, expressOktaSamlConfig); // setups okta routes + passport

// app.use('/', okta.secured, (req, res, next) => {
//     console.log('secured auth', req);
// });

// app.get('/authenticated', (req, res, next) => {
//     // console.log(req.body)
//     // console.log('responded', req);
//     // res.send('Authenticated, req' + req.body);
//     // res.status(200).redirect('/dashboard');
// })

app.get('/authenticatedFaild', (req, res, next) => {
    console.log('respomndFailed')
    res.send('sommething failed')
})
const atob = require('atob');

app.post('/saml/auth/login', (req, res, next) => {
    console.log('saml request', atob(req.body.SAMLResponse));
    // res.status(200);
});

app.use('/todo', todoRoutes)
app.use('/user', userRoutes)


module.exports = app