"use strict";

let myObject;
let lastIdCounted = 0;
let beersServed = 0;
//const tapsTemplate = document.querySelector("#tapsTemplate").content;


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
 //   console.log(myObject);
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
            
            //to find the most popular beer
            //add beers to total beersSold
            // let beersSold = {"Githop": 0,
            // "Elhete": 0, 
            // "Row26": 0,
            // "Sleighride": 0}
            // let order = myObject.serving;
            // console.log(myObject.beertypes);
            // order.forEach(beer => {
                
            //let sold = beersSold[myObject.beertypes];
                
            // sold++;
            // beersSold[myObject.beertypes]=sold;
            // })
        }
    })
    document.querySelector(".servedToday").textContent = `${beersServed}`;

//clean the container of capacity
//document.querySelector(".beer_taps").innerHTML="";

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

// document.addEventListener('DOMContentLoaded', function() {
//     showBeers();
// }, false);

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
        if (tap.level<=2450){
            ///alert ("change tap");
            clone.querySelector(".level").style.backgroundColor = "#FF1D25";
            clone.querySelector(".level").textContent = "Change keg!";
            //clone.querySelector(".capacity").style.border = "#FF1D25";
            clone.querySelector(".level").style.transform = "rotate(180deg)";

        } 
        
        //append clone in the div
        document.querySelector(".beer_taps").appendChild(clone);
        
        // document.querySelector(".level").innerHTML="";
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
                document.querySelectorAll(".storage")[tap.id].textContent = `Buy more!`;
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
    
    //bartendersClone.querySelector(".bartender_activity").textContent = `Currently bartender: ${bartender.statusDetail}`;
    //${bartender.statusDetail.split(0.5, " ")}`;

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

        // button.addEventListener("click", function(){
        //     console.log(button)
        //     //firstChild.innerHTML.classList.toggle(".hide");
        // });

        // button.addEventListener("click", function(){
        //     div.nextSibling.classList.toggle(".hide");
        // });
        //getting info about beers
        beersClone.querySelector(".beer_name").textContent = `${beer.name}`;
        beersClone.querySelector(".beer_category").textContent = `Category: ${beer.category}`;
        //beersClone.querySelector(".beer_popularity").textContent = `Popularity rating: ${beer.popularity}`;
        beersClone.querySelector(".beer_alc").textContent = `Alcohol: ${beer.alc} %`;
        beersClone.querySelector(".beer_image").src = `images/${beer.label}`;

        
        beersClone.querySelector(".modal_name").textContent = `${beer.name}`;
        beersClone.querySelector(".modal_appearance").textContent = `Appearance: ${beer.description.appearance}`;
        beersClone.querySelector(".modal_flavor").textContent = `Flavor: ${beer.description.flavor}`;
        beersClone.querySelector(".modal_impression").textContent = `Impression: ${beer.description.overallImpression}`;

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










