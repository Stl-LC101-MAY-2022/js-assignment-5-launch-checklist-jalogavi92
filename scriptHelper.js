// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {    
   let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src= '${imageUrl}'>
                 `    
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return 'Empty'
    } else if ((!isNaN(Number(testInput)))) {
        return 'Is a Number'
    } else {
        return 'Not a Number'
    }

}



function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    //let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');


    if (validateInput(pilot) === 'Empty'|| validateInput(copilot) === 'Empty'|| 
    validateInput(fuelLevel) === 'Empty'||validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required');
    }


    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert('Please enter numerical values for Fuel Level and Cargo Mass');
    } else if (validateInput(pilot)==='Is a Number'||validateInput(copilot)==='Is a Number') {
        alert('Please do not enter numbers for name of pilot or co-pilot');
    } 
    else {
        console.log("!Hello");
    //let launchStatus = document.getElementById("launchStatus");
    pilotStatus.innerHTML = 'Pilot ${pilotStatus} is ready';
    //pilotStatus.innerHTML = 'Pilot'+  pilotStatus.testInput +'is ready';
    copilotStatus.innerHTML = 'Co-pilot'+ copilotStatus.value +'is ready';
    list.style.visibility = 'hidden';
    }


    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = 'NOT ENOUGH FUEL FOR JOURNEY';
        list.style.visibility = 'visible';
        launchStatus.innerHTML = 'SHUTTLE NOT READY FOR LAUNCH';
        launchStatus.style.color = 'red';
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = 'CARGO TOO HEAVY FOR TAKEOFF';
        list.style.visibility = 'visible';
        launchStatus.innerHTML = 'SHUTTLE NOT READY FOR LAUNCH';
        launchStatus.style.color = 'red';
    } else if (Number(cargoLevel) <= 10000 && Number(fuelLevel) >= 10000) {
       // list.style.visibility = `visible`;
        fuelStatus.innerHTML = 'ENOUGH FUEL FOR THE JOURNEY';
        cargoStatus.innerHTML = 'CARGO LIGHT ENOUGH FOR TAKEOFF';
        launchStatus.innerHTML = 'SHUTTLE READY FOR LANCH';
        launchStatus.style.color = 'green';
    }
    //console.log("GoodBye");
   // this the part that will call the data from the HTML.. 
   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
