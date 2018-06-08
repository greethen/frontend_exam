"use strict";

let myObject;
let lastIdCounted = 0;
let beersServed = 0;

window.addEventListener("DOMContentLoaded", loadScript);

//getting the data from the script
function loadScript(){
    let data = FooBar.getData();    
    myObject = JSON.parse(data);
    console.log(myObject);
    //console.log(myObject.queue);

    //getting a number of people waiting in queue
    document.querySelector(".waiting").textContent = `${myObject.queue.length}`;
    //getting a number of people served now
    console.log(myObject.serving);
    document.querySelector(".servedNow").textContent = `${myObject.serving.length}`;
    //getting a number of people served in total
    document.querySelector(".servedToday").textContent = `${myObject.serving.length}`;
};

getData




// function show(){

// }
//setting the interval so the date reloads in 10s !!!IMPORTANT to change the time to 10 s before handin
setInterval(function () {
    loadScript();
}, 3000);




