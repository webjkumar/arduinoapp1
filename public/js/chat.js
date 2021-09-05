const socket = io();
const btnOn = document.querySelector("#onBtn");
const btnOff = document.querySelector("#offBtn");

let count = 0;

function showStatus(count){
    if (count === 1) {
        btnOn.classList.add("active");
        btnOff.classList.remove("active");
    } else {
        btnOn.classList.remove("active");
        btnOff.classList.add("active");
    }
}

socket.on('status', (count) => {
    console.log('updated value ' + count);
    showStatus(count);    
});

btnOn.addEventListener('click', () => {
    console.log('On');
    socket.emit('switch_on');
    showStatus(count);
});

btnOff.addEventListener('click', () => {
    console.log('Off');
    socket.emit('switch_off');
    showStatus(count);
});