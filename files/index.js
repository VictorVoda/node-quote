//opening the database. //First param is the name of the database. Second is the version of the database
//indexedDB.open return a response
//indexedDB.deleteDatabase("database");
function getQuote() {
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
            "The more you weight the harder you are to kidnap. Stay safe, eat cake.\n" +
            "The sign of intelligence is that you are constantly wondering. Idiots are always dead sure about every damn thing they are doing in their life.\n" +
            "The most beautiful moments in life are moments when you are expressing your joy, not when you are seeking it.\n" +
            "Too many people are hungry not because there is dearth of food. It is because there is dearth of love and care in human hearts.\n" +
            "If you resist change, you resist life.\n" +
            "When pain, misery, or anger happen, it is time to look within you, not around you.\n" +
            "If you resist change, you resist life.\n" +
            "When pain, misery, or anger happen, it is time to look within you, not around you.\n" +
            "The fear is simply because you are not living with life, You are living in your mind.\n" +
            "If you think you are big, you become small. If you know you are nothing, you become unlimited. That’s the beauty of being a human being.\n" +
            "Learning to listen is the essence of intelligent living.\n" +
            "If you think hundred percent logically, there is really no possibility of life.\n" +
            "To forgive does not mean to forget. To forgive means not to carry any bitterness in you, because that destroys your life.\n" +
            "Intellect is like a knife – the sharper, the better. When you try to handle every aspect of your life with your intellect, it is like trying to stitch your clothes with a knife\n" +
            "Adventure is not in a particular activity. It is a way to approach life. Every step can be an adventure.\n" +
            "Especially when we face hard times, it is all the more important that we remain balanced and focused on what matters to us.\n" +
            "It is in challenging times that human genius and ingenuity unfold.\n" +
            "If you do not do what you cannot do, that is what no problem. But if you do not do what you can do, you are a tragedy.\n" +
            "Guilt is a socially cultivated emotion, a poison directed towards yourself.\n" +
            "One who is constantly making U-turns obviously does not want to go anywhere.\n" +
            "Do everything like it is the last thing you do. There is nothing to hold back, nothing to save for later. \n" +
            "A life of excess is not a good life. Exces of anything leads to perversion and depresseion. \n" +
            "Just because you believe, does not mean that you know.\n" +
            "Do not be dead serious about your life, it is just a play."

        //save these qoutes in an array. Shuffle the array and take the first element

        text = text.split("\n");

        for (let i = 0; i < text.length; i++) {
           let key = i;
           let value = text[i];

            store.put(value, key);
        }

        //shuffling text
        //Trying to prevent that a random number is the same
        let random = Math.floor(Math.random() * ((text.length - 1) + 1));
        let quote = db.transaction("QuotesStore").objectStore("QuotesStore").get(random);

        quote.onsuccess = function (e) {
            //window.alert(quote.result);
            document.querySelector(".paragraph").textContent = quote.result;
        }

        transaction.oncomplete = function (e) {
            db.close();
        }
    }
}



