(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//opening the database. //First param is the name of the database. Second is the version of the database
//indexedDB.open return a response
//indexedDB.deleteDatabase("database");

function db() {
    let request = indexedDB.open("database", 1);
    let transaction;
    let store;

    //we need to make the object store in here
    request.onupgradeneeded = function (e) {
        let db = request.result;

        //first param is the name of the store we are creating. Second one sets a specified key to a value
        //autoIncrement gives a key to a value
        //keyPath: "..." gives an already existing key to a value
        store = db.createObjectStore("QuotesStore", {autoIncrement: true});

        //after the onupgradeneeded event was fired, the onsuccess method will be fired.
    };

    //event we can receive from the database
    //if there is an error we print it
    request.onerror = function (e) {
        console.error("Error");
    };

    //if we can access the db we will modify it
    request.onsuccess = function (e) {
        let db = request.result;

        //transaction - stores the given data in the db
        //readwrite - i can read/write a transaction from/in the specified store
        transaction = db.transaction("QuotesStore", "readwrite")
        let store = transaction.objectStore("QuotesStore");

        db.onerror = function (e) {
            console.log("Error");
        }

        //In case data is not in the database // inserting data
        let text = "I used to think I was indecisive, but now I'm not too sure.\n" +
            "Doing nothing is hard, you never know when you're done.\n" +
            "If two wrongs don't make a right, try three.\n" +
            "I am not lazy, I am on energy saving mode.\n" +
            "Life is short, smile while you still have teeth.\n" +
            "A balanced diet means a cupcake in each hand.\n" +
            "Maybe you should eat some makeup so you can be pretty on the inside too.\n" +
            "I'm not shy, I'm holding back my awesomeness so I don't intimidate you.\n" +
            "Sorry for the mean, awful, accurate things I said.\n" +
            "I’m sorry, if you were right, I’d agree with you.\n" +
            "Your life can't fall apart if you never had it together!\n" +
            "People say nothing is impossible, but I do nothing every day.\n" +
            "A bank is a place that will lend you money if you can prove that you don't need it.\n" +
            "If you think nobody cares if you're alive, try missing a couple of payments.\n" +
            "Always remember that you're unique. Just like everyone else.\n" +
            "The answer you're looking for is inside of you, but it's wrong\n" +
            "One advantage of talking to yourself is that you know at least somebody's listening.\n" +
            "The elevator to success is out of order. You’ll have to use the stairs.\n" +
            "An apple a day keeps anyone away if you throw it hard enough.\n" +
            "The more you weight the harder you are to kidnap. Stay safe, eat cake.";

        text = text.split("\n");

        for (let i = 0; i < text.length; i++) {
            let key = i;
            let value = text[i];

            store.put(value, key);
        }

        //shuffling text
        //Trying to prevent that a random number is the same
        let random = Math.round(Math.random() * 10)
        let randomSecure = Math.round(Math.random() * 9);

        let quote = db.transaction("QuotesStore").objectStore("QuotesStore").get(random + randomSecure);

        quote.onsuccess = function (e) {
            window.alert(quote.result);
        }

        transaction.oncomplete = function (e) {
            db.close();
        }
    }
}




},{}]},{},[1]);
