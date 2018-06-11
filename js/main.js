"use strict";

let myObject;
let lastIdCounted = 0;
let beersServed = 0;
//const tapsTemplate = document.querySelector("#tapsTemplate").content;

window.addEventListener("DOMContentLoaded", loadScript);

//getting the data from the script
function loadScript(){
    let data = FooBar.getData();    
    myObject = JSON.parse(data);
    console.log(myObject);
    //console.log(myObject.queue);

    //1. getting a number of people waiting in queue
    document.querySelector(".waiting").textContent = `${myObject.queue.length}`;

    //2. getting a number of people served now
    //console.log(myObject.serving);
    document.querySelector(".servedNow").textContent = `${myObject.serving.length}`;

    //3.getting a number of beers served in total
    myObject.serving.forEach(customer=>{
        if(customer.id>lastIdCounted){
            beersServed += customer.order.length;
            lastIdCounted = customer.id;
        }
    
    })
    document.querySelector(".servedToday").textContent = `${beersServed}`;

  
    

//clean the container of capacity
document.querySelector(".beer_taps").innerHTML="";

showTaps();

};
//4. getting the taps
function showTaps(){
    console.log("taps",myObject.taps)

    let taps = myObject.taps;

    taps.forEach(tap =>{
        console.log("tap", tap.level)
    //define the template
    let tapsTemplate = document.querySelector(".tapsTemplate").content;
  
    //define the clone 
    let clone = tapsTemplate.cloneNode(true);
    
        //getting the value of level, which is equal to the height of the level
        clone.querySelector(".level").style.height = `${tap.level/10}px`;
        clone.querySelector(".capacity").style.transform = "rotate(-180deg)";
        //getting the name of the beer tap
        clone.querySelector(".beer_tap_name").textContent = tap.beer;
      
        
        //append clone in the div
        document.querySelector(".beer_taps").appendChild(clone);
  
        if (tap.level<=2450){
            ///alert ("change tap");
            document.querySelector(".level").style.backgroundColor = "blue";
        } 
        document.querySelector(".level").innerHTML="";
    }
)

}
   


// function showTaps(tap){
//     taps.forEach(tap=>{
  
//         let tapsTemplate = document.querySelector(".tapsTemplate").content;
//         let beerTaps = document.querySelector(".beer_taps");
//         console.log(beerTaps);
        
      
//         const clone = tapsTemplate.cloneNode(true);
      
//         clone.querySelector(".beer_taps_name").textContent = `${myObject.taps.beer}`;
//         beerTaps.appendchild(true);
//     }
//     )}





  //clone.querySelector("h1").textContent = data.header;
  // myObject.taps.forEach(beerLevel=>{
  //     document.querySelector(".level").style.height = `${myObject.taps.level}0px`;
  // })




//setting the interval so the date reloads in 10s !!!IMPORTANT to change the time to 10 s before handin
setInterval(function () {
    loadScript();
}, 3000);




