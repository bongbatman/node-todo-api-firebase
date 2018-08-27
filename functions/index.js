//no need of any exports as its a relative file too generic
// require('./config/config');
//library imports
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
// const {ObjectID} = require('mongodb');
const _ = require('lodash');

//local imports - accessing mongoose like this simply connects to db as well
// let {mongoose} = require('./db/mongoose');
// let {db,functions} = require('./db/firestore');
// let {Todo} = require('./models/todo');
// let {User} = require('./models/user');
// const aTuringRef = db.collection('users').doc('aturing');

let app = express();

const port = process.env.PORT;
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();


const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);



//read data
// db.collection('users').get()
//     .then((snapshot) => {
//         snapshot.forEach((doc) => {
//             console.log(doc.id, '=>', doc.data());
//         });
//     })
//     .catch((err) => {
//         console.log('Error getting documents', err);
//     });




//middleware - to store body as json by bodyParser
app.use(bodyParser.json());


//to add a task, send back response is post is successful
app.post('/todos', (req, res) => {
    db.collection('cities').add({
        name: req.body.name,
        country: req.body.country
    }).then(ref => {
        res.send(ref.id);
    });
});

// app.post('/todos/aturing', (req, res) => {
//
//
//     aTuringRef.set({
//         first: req.body.first,
//         last: req.body.last,
//         born: req.body.born
//     });

// });

//all todos
// app.get('/todos', (req, res) => {
//     var citiesRef = db.collection('cities');
//     citiesRef.where('state', '==', "CA").get()
//         .then(snapshot => {
//             // var obj = {
//             //   name,
//             //   state,
//             //   country
//             // };
//
//             /**
//              * The for each method returns different
//              */
//             // snapshot.forEach(doc => {
//             //     // obj.name = doc.data().name;
//             // console.log(JSON.stringify(doc.data(), undefined, 2));
//             //     // console.log(doc.id, '=>', doc.data());
//             // });
//
//             /**
//              * map returns as an array
//              */
//             // get the data of all the documents into an array
//             var data = snapshot.docs.map(function (documentSnapshot) {
//                 return documentSnapshot.data();
//             });
//
//             res.send(data);
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

app.get('/todos', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.collection('cities').doc('IN').get()
        .then(doc => {


            res.send(doc.data());
        })
        .catch(err => {
            res.send(err);
        });
});
//
//
// //todo by id passing id as url parameter
// app.get('/todos/:id', (req, res) => {
//    //req.params is an object containing url parameters
//     let id = req.params.id;
//
//     if(!ObjectID.isValid(id)) {
//         return res.status(404).send("ID not valid");
//     }else{
//     // res.send(req.params.id);
//         Todo.findById(id).then((todo) => {
//             if (todo === null) {
//                 //return is important or else the code will continue
//                 return res.status(404).send()
//             }
//             res.send(todo);
//
//         }).catch((e) => {
//             res.status(404).send();
//         });
//
//
//     }
//
// });
//
// //delete todo by id passing id as url parameter
// app.delete('/todos/:id', (req, res) => {
//     //req.params is an object containing url parameters
//     let id = req.params.id;
//
//     if(!ObjectID.isValid(id)) {
//         return res.status(404).send("ID not valid");
//     }else{
//         // res.send(req.params.id);
//         Todo.findByIdAndRemove(id).then((todo) => {
//             if (todo === null) {
//                 //return is important or else the code will continue
//                 return res.status(404).send()
//             }
//             res.send(todo);
//
//         }).catch((e) => {
//             res.status(404).send();
//         });
//
//
//     }
//
// });
//
// //best practices for api development
// app.patch('/todos/:id', (req, res) => {
//     //req.params is an object containing url parameters
//     let id = req.params.id;
//
//     //use lodash here to specify the properties user will be able to update by creating a new subset
//     let body = _.pick(req.body, ['task', 'completed']);
//
//     if(!ObjectID.isValid(id)) {
//         return res.status(404).send("ID not valid");
//     }
//
//     if ((_.isBoolean(body.completed)) && body.completed) {
//         //set the property completedAt of body
//         body.completedAt = new Date().getTime();
//     } else {
//         body.completed = false;
//         body.completedAt = null;
//     }
//
//    Todo.findByIdAndUpdate(id, {
//        $set: body
//    }, {
//        //returns new updated object can also be used as returnOriginal: flase
//        new: true
//    }).then((doc) => {
//         if (!doc) {
//             return res.sendStatus(404);
//         }
//
//         res.send(doc);
//    }).catch((e) => {
//        res.status(404).send();
//    });
//
//
// });



// app.listen(port, () => {
//     console.log(`started on port ${port}`);
// });
//
// module.exports = {
//   app
// };
exports.app = functions.https.onRequest(app);