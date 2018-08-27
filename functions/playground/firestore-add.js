const admin = require('firebase-admin');
const functions = require('firebase-functions');


var serviceAccount = require('../../todos-api-batman-firebase-adminsdk-rm14a-b6cd16d277.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

// var docRef = db.collection('users').doc('Authorised');
//
// docRef.set({
//     first: 'Author',
//     last: 'dubey',
//     born: 1992
// });
//
// var citiesRef = db.collection('cities');
//
// var setSf = citiesRef.doc('SF').set({
//     name: 'San Francisco', state: 'CA', country: 'USA',
//     capital: false, population: 860000 });
// var setLa = citiesRef.doc('LA').set({
//     name: 'Los Angeles', state: 'CA', country: 'USA',
//     capital: false, population: 3900000 });
// var setDc = citiesRef.doc('DC').set({
//     name: 'Washington, D.C.', state: null, country: 'USA',
//     capital: true, population: 680000 });
// var setTok = citiesRef.doc('TOK').set({
//     name: 'Tokyo', state: null, country: 'Japan',
//     capital: true, population: 9000000 });
// var setBj = citiesRef.doc('BJ').set({
//     name: 'Beijing', state: null, country: 'China',
//     capital: true, population: 21500000 });

// var citiesRef = db.collection('cities');
// citiesRef.where('state', '==', "CA").get()
//     .then(snapshot => {
        // var obj = {
        //   name,
        //   state,
        //   country
        // };

        /**
         * The for each method returns different
         */
        // snapshot.forEach(doc => {
        //     // obj.name = doc.data().name;
        // console.log(JSON.stringify(doc.data(), undefined, 2));
        //     // console.log(doc.id, '=>', doc.data());
        // });

        /**
         * map returns as an array
         */
            // get the data of all the documents into an array
    //     var data = snapshot.docs.map(function (documentSnapshot) {
    //             return(documentSnapshot.data());
    //         });
    //
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log('Error getting documents', err);
    // });

        db.collection('cities').doc('IN').get()
            .then(doc => {


                console.log(doc.data());
            })
            .catch(err => {
                console.log(err);
            });