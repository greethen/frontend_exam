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
//clean the container of bartenders
document.querySelector(".bartenders").innerHTML="";
//clean the container of beers
document.querySelector(".beer_types").innerHTML="";

//call functions
showTaps();
showStorage();
showBartenders();
showBeers();
};

//4. getting the taps
function showTaps(){
    //console.log("taps",myObject.taps)

    let taps = myObject.taps;

    taps.forEach(tap =>{
        //console.log("tap", tap.level)
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

        //notify when it is time to change keg 
        if (tap.level<=2450){
            ///alert ("change tap");
            document.querySelector(".level").style.backgroundColor = "blue";

           //----->how to clean so ithers would get invited as well???
        } 
        document.querySelector(".level").innerHTML="";
    }
)

}
//5. Showing when the storage is getting empty  ---> To finnish!!!
function showStorage(){
    //console.log("storage", myObject.storage)

    let storage = myObject.storage;
    if (myObject.storage < 5){
        alert ("need to buy more beer!")
    }
}


//6. Bartenders name, status and status detail
function showBartenders(){
    //console.log("bartenders", myObject.bartenders);

    let bartenders = myObject.bartenders;

    bartenders.forEach(bartender =>{
        //console.log("bartender", bartender.name);

    //define the bartenders template
    let bartendersTemplate = document.querySelector(".bartendersTemplate").content;
  
    //define the bartenders clone 
    let bartendersClone = bartendersTemplate.cloneNode(true);
    //getting the names of the bartenders
    bartendersClone.querySelector(".bartender_name").textContent = `Bartender\´s name: ${bartender.name}`;
    //bartender´s status of work
    if (bartender.status == "WORKING"){
        bartendersClone.querySelector(".bartender_status").textContent = "WORKS!!!!!!";
        bartendersClone.querySelector(".bartender_status").style.backgroundColor  = "green";
    }
    else{
        bartendersClone.querySelector(".bartender_status").textContent = "IS GETTING READY!!!!!!";
        bartendersClone.querySelector(".bartender_status").style.backgroundColor  = "orange";
    }

    //bartender´s precise activity
    if(bartender.statusDetail == "pourBeer"){
        bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: Pours Beer`;
    }
    else if (bartender.statusDetail == "startServing") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: Starts Serving`;
    }
    else if (bartender.statusDetail == "receivePayment") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: Receives Payment`;
    }
    else if (bartender.statusDetail == "releaseTap") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: Releases Tap`;
    }
    else if (bartender.statusDetail == "reserveTap") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: Reserves Tap`;
    }
    else{
        bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: Is waiting`;
    }
    
    //bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: ${bartender.statusDetail}`;
    //${bartender.statusDetail.split(0.5, " ")}`;

    //append clone in the div .bartenders
    document.querySelector(".bartenders").appendChild(bartendersClone);
    })
    
}

//7. Beers name, fetures and description
function showBeers(){
    console.log("beers", myObject.beertypes)

    let beers = myObject.beertypes;

    beers.forEach(beer =>{
        //define the beers template
        let beersTemplate = document.querySelector(".beersTemplate").content;

        //define the beers clone
        let beersClone = beersTemplate.cloneNode(true);

        //getting desired info about beers
        beersClone.querySelector(".beer_name").textContent = `Beer\´s name: ${beer.name}`;
        beersClone.querySelector(".beer_category").textContent = `Category: ${beer.category}`;
        beersClone.querySelector(".beer_popularity").textContent = `Popularity rating: ${beer.popularity}`;
        beersClone.querySelector(".beer_alc").textContent = `Alcohol: ${beer.alc}`;
        beersClone.querySelector(".beer_appearance").textContent = `Appearance: ${beer.description.appearance}`;
        beersClone.querySelector(".beer_flavor").textContent = `Flavor: ${beer.description.flavor}`;
        beersClone.querySelector(".beer_impression").textContent = `Impression: ${beer.description.overallImpression}`;

        //append clone in the div
        document.querySelector(".beer_types").appendChild(beersClone);
    })
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




