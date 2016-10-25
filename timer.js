var memory_array = ['Keegan', 'Keegan', 'Adam', 'Adam', 'James', 'James', 'Ricky', 'Ricky', 'Nicole', 'Nicole', 'Addey', 'Addey', 'JamesH', 'JamesH', 'Onna', 'Onna', 'Jacob', 'Jacob', 'Eddrick', 'Eddrick', 'Martin', 'Martin', 'Dustin', 'Dustin'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var start = Date.now();
Array.prototype.memory_tile_shuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard() {
    tiles_flipped = 0;
    // need to restart timer here
    start = Date.now();
    var output = '';

    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}

function memoryFlipTile(tile, val) {
    if (tile.innerHTML == "" && memory_values.length < 2) {
        tile.style.background = 'url(img/' + val + '.png) no-repeat';
        tile.style.backgroundSize = "102px 110px";
        tile.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;
                memory_values = [];
                memory_tile_ids = [];
                if (tiles_flipped == memory_array.length) {
                    swal({
                        title: "Oh My Goodness!! You Beat The Time!",
                        text: "Good memory there young padawan!",
                        type: "success",
                        confirmButtonText: "Generate New Game!"
                    }, function() {
                        document.getElementById('memory_board').innerHTML = "";
                        newBoard();
                    });

                }
            } else {
                function flip2Back() {
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile1 =
                        tile_1.style.background = 'url(img/mystery.png ) no-repeat';
                    tile_1.style.backgroundSize = "102px 110px";
                    tile_1.innerHTML = "";

                    tile_2.style.background = 'url(img/mystery.png) no-repeat';
                    tile_2.style.backgroundSize = "102px 110px";

                    tile_2.innerHTML = "";
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}

function startTimer(duration, display) {
    var diff,
        minutes,
        seconds;

    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
            end = timer() <= 0;
            newBoard();

        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

window.onload = function() {
    var minutes_s = 60 * 1.3,
        display = document.querySelector('#time');
    startTimer(minutes_s, display);
};
