import firebase from 'firebase';
        var config = {
            apiKey: "AIzaSyAtmtQQ-xLK_3BjKAg9daMwDN4yAul74lc",
            authDomain: "pacman-9be4c.firebaseapp.com",
            databaseURL: "https://pacman-9be4c.firebaseio.com",
            projectId: "pacman-9be4c",
            storageBucket: "pacman-9be4c.appspot.com",
            messagingSenderId: "986906923472"
        };
        firebase.initializeApp(config);
var firebaseAuth = firebase.auth;
export default firebaseAuth;