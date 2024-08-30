import { firebaseConfig } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, get, set, update, increment, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const gif = document.getElementById('gif');
document.getElementById('gif').style.width="300px"
const playButton = document.getElementById('playButton');
const dootSound = document.getElementById('dootSound');
const counterDisplay = document.getElementById('counter');
const generalmessage = document.getElementById('message');
let isPlaying = false;

const buttons = document.getElementsByTagName("button");

for (const button of buttons) {
    button.addEventListener("click", createRipple);
}

async function incrementCounter() {
    const counterRef = ref(db, 'global-counter/thank-count');
    await update(counterRef, {
        count: increment(1)
    });

    get(counterRef).then((snapshot) => {
        if (snapshot.exists()) {
            const thankCount = snapshot.val().count;
            counterDisplay.textContent = `globally mr skeletal has been thanked ${thankCount} times`;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error("Error updating counter: ", error);
    });
}

async function playGif() {
    gif.src = "skeleton-doot.gif"; 
    isPlaying = true;

    dootSound.play();

    setTimeout(() => {
        incrementCounter();
    }, 1000);

    setTimeout(() => {
        gif.src = "skeleton-doot-still.png";
        isPlaying = false;
    }, 2204);  
}

playButton.addEventListener('click', function() {
    if (!isPlaying) {
        playGif();
    }
});

window.onload = function() {
    gif.src = "skeleton-doot-still.png";
    
    const counterRef = ref(db, 'global-counter/thank-count');
    onValue(counterRef, (snapshot) => {
        if (snapshot.exists()) {
            const thankCount = snapshot.val().count;
            counterDisplay.textContent = `globally mr skeletal has been thanked ${thankCount} times`;
        } else {
            console.log("No Uhhh available");
        }
    });
};




function createRipple(event) {
    if (!isPlaying) {
        deleteRipple();
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
        circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
        circle.classList.add("ripple"); 
        const ripple = button.getElementsByClassName("ripple")[0];

        button.appendChild(circle);
    }


function deleteRipple(){

    setTimeout(() => {
        var ball = button.getElementsByClassName("ripple")[0];
        ball.classList.remove("ripple");
    }, 2100);  

}
}
