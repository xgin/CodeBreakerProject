let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    setHiddenFields();
    if (!validateInput(input.value)) {
        return false;
    }
    attempt.value++;
    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    if (answer.value !== '' || attempt.value !== '') return;

    answer.value = Math.floor(Math.random() * 9999).toString();
    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
    attempt.value = 0;
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(value) {
    if (value.length === 4) {
        return true;
    }
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

function getResults(input) {
    let result = true;
    document.getElementById('results').innerHTML +=
        '<div class="row">' +
            '<span class="col-md-6">' + input + '</span>' +
            '<div class="col-md-6">' +
                [0, 1, 2, 3].map(function (i) {
                    if (-1  === answer.value.indexOf(input[i])) {
                        result = false;
                        return '<span class="glyphicon glyphicon-remove"></span>';
                    } else if (input[i] === answer.value[i]) {
                        return '<span class="glyphicon glyphicon-ok"></span>';
                    } else {
                        result = false;
                        return '<span class="glyphicon glyphicon-transfer"></span>';
                    }
                }) +
            '</div>' +
        '</div>';
    return result;
}

function showAnswer(success) {
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    code.className += ' ' + (success ? 'success' : 'failure');
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}
