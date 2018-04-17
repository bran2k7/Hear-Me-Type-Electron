/**
* No longer in use.
*
*/

document.onkeydown = function(e) {
    switch (e.key) {
        case 'a':
            document.getElementById("A").play();
            break;
        default:
            console.log("Key is not found!");
    }
};
