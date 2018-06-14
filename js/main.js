"use strict";

let myObject;
let lastIdCounted = 0;
let beersServed = 0;

window.addEventListener("DOMContentLoaded", getAllData);


function getAllData(){
    getBeers();
    loadScript();
}

//getting the data from the script
function loadScript(){
    //gets all the data except the beertypes, which are static when getData(true)
    // getData() - fetch all the data, getData(true) - all the data EXCEPT the beers
    let data = FooBar.getData(true);    
    myObject = JSON.parse(data);
    //console.log(myObject);
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


//call functions
showTaps();
showStorage();
showBartenders();

};

function getBeers(){
    let data = FooBar.getData();    
    myObject = JSON.parse(data);
    showBeers(myObject.beertypes);
}

//loadScript();
//setting the interval so the date reloads in 10s !!!IMPORTANT to change the time to 10 s before handin
setInterval(function () {
    loadScript();
}, 10000);


//4. getting the taps
function showTaps(){
    //console.log("taps",myObject.taps)

    document.querySelector(".beer_taps").innerHTML = "";
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
         //notify when it is time to change keg 
        if (tap.level<=500){
            ///alert ("change tap");
            clone.querySelector(".level").style.backgroundColor = "#FF1D25";
            clone.querySelector(".capacity").style.border = "1px solid #FF1D25";
            clone.querySelector(".change_keg").textContent = "Change keg!";
            clone.querySelector(".level").style.transform = "rotate(180deg)";
          //clone.querySelector(".beer_tap_name").style.color = "#FF1D25";
        } 
        else if (tap.level>1500){
            clone.querySelector(".level").style.backgroundColor = "#00B818";
            clone.querySelector(".capacity").style.border = "1px solid #00B818";
        } else {
            clone.querySelector(".level").style.backgroundColor = "#FFDB08";
            clone.querySelector(".capacity").style.border = "1px solid #FFDB08";
        }
        
        //append clone in the div
        document.querySelector(".beer_taps").appendChild(clone);
    
    }
)

}

//5. Showing when the storage is getting empty  ---> To finnish!!!
function showStorage(){
    console.log("storage", myObject.storage)

    let storage = myObject.storage;
    storage.forEach(type => { 
        myObject.taps.forEach(tap=>{
            //need to make sure that tap.beer is equal and the same as type.name
            if (tap.beer === type.name){
            //only when it is the same, can put a new condition
            if (type.amount<=2){
                //alert ("need to buy beer!")
                // document.querySelectorAll(".storage")[tap.id].textContent = `${type.name} is finishing soon! Buy more!`;
                document.querySelectorAll(".storage")[tap.id].textContent = `Storage low!`;
            }
            }
        })
        //console.log(type.name, type.amount)
       
    }
)}


//6. Bartenders name, status and status detail
function showBartenders(){
    //console.log("bartenders", myObject.bartenders);

    //clean the container of bartenders
    document.querySelector(".bartenders").innerHTML="";

    let bartenders = myObject.bartenders;

    bartenders.forEach(bartender =>{
    //console.log("bartender", bartender.name);

    //define the bartenders template
    let bartendersTemplate = document.querySelector(".bartendersTemplate").content;
  
    //define the bartenders clone 
    let bartendersClone = bartendersTemplate.cloneNode(true);
    //getting the names of the bartenders
    bartendersClone.querySelector(".bartender_name").textContent = `${bartender.name}`;
    //bartender´s status of work
    if (bartender.status == "WORKING"){
        //bartendersClone.querySelector(".bartender_status").textContent = "WORKS";
        bartendersClone.querySelector(".bartender_status").style.backgroundColor  = "#00B818";
    }
    else{
        //bartendersClone.querySelector(".bartender_status").textContent = "READY";
        bartendersClone.querySelector(".bartender_status").style.backgroundColor  = "#FFAF06";
    }

    //bartender´s precise activity --> surely, there is a better way to do it
    if(bartender.statusDetail == "pourBeer"){
        bartendersClone.querySelector(".bartender_activity").textContent = `Pours Beer`;
    }
    else if (bartender.statusDetail == "startServing") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Starts Serving`;
    }
    else if (bartender.statusDetail == "receivePayment") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Receives Payment`;
    }
    else if (bartender.statusDetail == "releaseTap") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Releases Tap`;
    }
    else if (bartender.statusDetail == "reserveTap") {
        bartendersClone.querySelector(".bartender_activity").textContent = `Reserves Tap`;
    }
    else{
        bartendersClone.querySelector(".bartender_activity").textContent = `Is waiting`;
    }
   
    //append clone in the div .bartenders
    document.querySelector(".bartenders").appendChild(bartendersClone);
    })
    
}


//7. Beers name, fetures and description
function showBeers(beers){
   //console.log("beers", myObject.beertypes)

    //clean the container of beers
    document.querySelector(".beer_types").innerHTML="";

    beers.forEach(beer =>{
        //define the beers template
        let beersTemplate = document.querySelector(".beersTemplate").content;

        //define the beers clone
        let beersClone = beersTemplate.cloneNode(true);
        //define the button and the modal to show more data
        let button = beersClone.querySelector('.read_more');
        let modal = beersClone.querySelector(".modal");
        // console.log(modal)

        //add button to 
        button.addEventListener("click", function(){
            //console.log(`hello ${beer.name}`);
            modal.classList.toggle("hide");
            //console.log(beersClone);
            //console.log(modal); 
        })

        //getting info about beers
        beersClone.querySelector(".beer_name").textContent = `${beer.name}`;
        beersClone.querySelector(".beer_category").textContent = `${beer.category}`;
        beersClone.querySelector(".beer_alc").textContent = `Alcohol: ${beer.alc} %`;
        beersClone.querySelector(".beer_image").src = `images/${beer.label}`;

        //beer info in modal part
        beersClone.querySelector(".modal_appearance").textContent = `APPEARANCE: ${beer.description.appearance}`;
        beersClone.querySelector(".modal_flavor").textContent = `FLAVOR: ${beer.description.flavor}`;
        beersClone.querySelector(".modal_impression").textContent = `IMPRESSION: ${beer.description.overallImpression}`;

        //append clone in the div
        document.querySelector(".beer_types").appendChild(beersClone);
    })
   
}











