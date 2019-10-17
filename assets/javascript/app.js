var firebaseConfig = {
    apiKey: "AIzaSyDjC8K5PHrRVcL_GXYtFUFjMSWJT17uZxc",
    authDomain: "happy-hour-a46f7.firebaseapp.com",
    databaseURL: "https://happy-hour-a46f7.firebaseio.com",
    projectId: "happy-hour-a46f7",
    storageBucket: "",
    messagingSenderId: "1020075149720",
    appId: "1:1020075149720:web:c7ab7fde36b8ab6ae103ed"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainRate = $("#rate-input").val().trim();
    var newTrain = {
        name: trainName,
        dest: trainDest,
        start: trainStart,
        rate: trainRate
    };
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainRate);

    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
    var trainMonths = moment().diff(moment(trainStart, "X"), "months");
    console.log(trainMonths);
    var trainBilled = trainMonths * trainRate;
    console.log(trainBilled);
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainStartPretty),
        $("<td>").text(trainMonths),
        $("<td>").text(trainRate),
        $("<td>").text(trainBilled)
    );

    $("#train-table > tbody").append(newRow);
});