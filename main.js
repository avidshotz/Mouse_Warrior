
let venueName = '';
let venueLocation = '';
let records = [];



let nameField = document.getElementById('nameField');
let clearNameButton = document.getElementById('clearNameButton');
let copyNameButton = document.getElementById('copyNameButton');
let locationField = document.getElementById('locationField');
let clearLocationButton = document.getElementById('clearLocationButton');
let copyLocationButton = document.getElementById('copyLocationButton');
let noEmailButton = document.getElementById('noEmailButton');
let copyBothButton = document.getElementById('copyBothButton');
let facebookButton = document.getElementById('facebookButton');
let instagramButton = document.getElementById('instagramButton');
let googleButton = document.getElementById('googleButton');
let toggleDrawerButton = document.getElementById('toggleDrawerButton');
let emailPrompt = document.getElementById("emailPrompt"); // start here
let googlePrompt = document.getElementById("googlePrompt");
let capPrompt = document.getElementById("capacityPrompt");
let iArtistPrompt = document.getElementById("idealArtPrompt");

// Add event listeners
nameField.addEventListener('input', function(event) {
    changeVenueName(event.target.value);
    localStorage.setItem('venueName', event.target.value);
});

clearNameButton.addEventListener('click', clearName);
copyNameButton.addEventListener('click', function() {
    copyToClipboard(venueName);
});

locationField.addEventListener('input', function(event) {
    changeLocation(event.target.value);
    localStorage.setItem('venueLocation', event.target.value);
});

clearLocationButton.addEventListener('click', clearLocation);
copyLocationButton.addEventListener('click', function() {
    copyToClipboard(venueLocation);
});

copyBothButton.addEventListener('click', function() {
    copyToClipboard(venueName + ' in ' + venueLocation);
    recordButtonPress('COPY both');
});

noEmailButton.addEventListener('click', function(){
    copyToClipboard("No email found for " + venueName + " at or near " + venueLocation)
    recordButtonPress('EMAIL UNAVAILABLE');
})



facebookButton.addEventListener('click', function() {
    window.open(facebookLinkGen(), '_blank');
});

instagramButton.addEventListener('click', function() {
    window.open(igLinkGen(), '_blank');
});

googleButton.addEventListener('click', function() {
    window.open(GoogleLinkGen(), '_blank');
});
emailPrompt.addEventListener('click', function(event){
    copyToClipboard(emailPromptgen());
})
googlePrompt.addEventListener('click', function(event){
    copyToClipboard(googlePromptgen());
})
capPrompt.addEventListener('click', function(){
    copyToClipboard(capacityPromptgen());
})
iArtistPrompt.addEventListener('click', function(){
    copyToClipboard(idealArtPromptgen());
})


toggleDrawerButton.addEventListener('click', toggleDrawer);

// Rest of your JavaScript here


function changeVenueName(value) {
    venueName = value;
    //recordButtonPress('venueName');
}

function changeLocation(value) {
    venueLocation = value;
    //recordButtonPress('location');
}

function clearName() {
    venueName = '';
    let nameField = document.getElementById('nameField');
    nameField.type = 'text';
    nameField.value = '';
    recordButtonPress('clearName');
}

function clearLocation() {
    venueLocation = '';
    let locationField = document.getElementById('locationField');
    locationField.type = 'text';
    locationField.value = '';
    recordButtonPress('clearLoc')
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        // Clipboard API is available
        navigator.clipboard.writeText(text).then(function() {
            console.log('Copying to clipboard was successful!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    } else {
        // Clipboard API is not available, fall back to document.execCommand
        let tempElement = document.createElement('textarea');
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempElement);
    }
}




function recordButtonPress(buttonName) {
    let record = {buttonName: buttonName, timestamp: new Date(), venueName: venueName, venueLocation: venueLocation};
    records.unshift(record);
    if (records.length > 25) {
        records.pop();
    }
    updateDrawer();
}

function updateDrawer() {
    let drawerContent = document.getElementById('drawer-content');
    drawerContent.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        let recordElement = document.createElement('p');
        recordElement.textContent = JSON.stringify(records[i]);
        drawerContent.appendChild(recordElement);
    }
}

function toggleDrawer() {
        let drawer = document.getElementById('drawer');
        if (drawer.style.display === 'block') {
        drawer.style.display = 'none';
        
    } else {
        drawer.style.display = 'block';
        drawer.style.height = '300';
    }
}


function facebookLinkGen() {
    let returnThis = venueName + '%20' + venueLocation;
    returnThis = returnThis.replaceAll(' ', '%20');
    returnThis = 'https://www.facebook.com/search/top?q=' + returnThis;
    return returnThis;
}

function igLinkGen() {
    let returnThis = venueName + ' ' + venueLocation;
    returnThis = returnThis.replaceAll(' ', '%20');
    returnThis = 'https://www.instagram.com/explore/search/keyword/?q=' + returnThis;
    return returnThis;
}

function GoogleLinkGen() {
    let returnThis = venueName + ' ' + venueLocation;
    returnThis = returnThis.replaceAll(' ', '+');
    returnThis = returnThis.replaceAll('&', 'and');
    returnThis = 'https://www.google.com/search?q=' + returnThis + ' website facebook instagram';
    return returnThis;
}

function emailPromptgen(){
    return 'what is the email I can use to inquire about booking ' + venueName + ' in ' + venueLocation;
}

function googlePromptgen(){
    return venueName + " " + venueLocation + ' website, instagram, facebook, location';
}

function capacityPromptgen(){
    return 'what is the capacity of ' + venueName + ' in ' + venueLocation + '?';
}

function idealArtPromptgen(){
    let returnThis = 'what kinds of musicians does ' + venueName + ' in ' + venueLocation + ' normally book';
    return returnThis;
}

window.onload = function() {
    let storedVenueName = localStorage.getItem('venueName');
    let storedVenueLocation = localStorage.getItem('venueLocation');

    if (storedVenueName) {
        nameField.value = storedVenueName;
        venueName = storedVenueName;
    }

    if (storedVenueLocation) {
        locationField.value = storedVenueLocation;
        venueLocation = storedVenueLocation;
    }
}
