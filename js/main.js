/* Main js script for advanced website task - Fit 2022
Seweryn Sapinski, City&Guilds number GPW 9558
Script corrected 06/12/2022     */

// Hidden form to set user preferable colors and font size
// Main navigation - right corner icon - #setting-icon
// Toggle setting panel visibility - #pref-panel
// Hide setting icon toolkit - #nav-right .tool-tip'
const settingIcon = document.querySelector('#setting-icon');
const prefPanel = document.querySelector('#pref-panel');
const toolTip = document.querySelector('#nav-right .tool-tip');

// Button to reset user name inside <#main-container><#welcome>
const buttonResetUsername = document.querySelector('#user-reset');
buttonResetUsername.addEventListener('click', setUserName);


settingIcon.addEventListener('click', function(){
    if(prefPanel.style.display == 'none'){   // is user settings panel hidden?
        prefPanel.style.display = 'block';  // show user settings panel
        toolTip.style.display = 'none';     // hide tool-tip forever
    }
    else{
        prefPanel.style.display = 'none';   // hide user settings panel
    }
});

// On window load propmpt user for name if name is not already stored.
// Add new name to Local Storage. If name stored, use it instead.
// If [Clear user data] button pressed, reset stored name and data.

// ////////////// Set new user name if provided by user //////////////////
function setUserName(){
    let userName = prompt('Plese enter your name\nor go anonymous: ');

    if(userName){
        localStorage.setItem('userName', userName);
        document.querySelector('#welcome-user').innerText = "Welcome " + userName;
    }
    else{
        localStorage.setItem('userName', 'Anonymous');
        document.querySelector('#welcome-user').innerText = "Welcome Anonymous";
    }
}


// Function to check onLoad if name is stored and use it - or request new
// Also to check if custom CSS settings are saved and use it

// //////////////// ONLOAD FUNCTION //////////////////
window.onload = function(){
    if(localStorage.getItem('userName')){
        document.querySelector('#welcome-user').innerText = 
        "Welcome " + localStorage.getItem('userName');
    }
    else{
        setUserName();  //if there is no seved userName, prompt for it
    }

    ///////////// CHANGES TO SITE COLORS AND SIZES ///////////
    cssCustomValues = cssRootValues;

    // check if custom CSS settings are saved and use it
    if(localStorage.getItem('cssValues')){
        // Update of editable CSS-set according to data from localStorage
        cssCustomValues = JSON.parse(localStorage.getItem('cssValues'));

        // CSS updates to website <body>
        setCustomBackground(cssCustomValues.cssMainColor1);
        setCustomFontColor(cssCustomValues.cssFontColor1);
        setCustomFontSize(cssCustomValues.cssSizeFont);
    }
        
    // CSS update to customisation form - for both default or custom CSS
    document.querySelector('#prefs-bg-color').value = cssCustomValues.cssMainColor1;
    document.querySelector('#prefs-ft-color').value = cssCustomValues.cssFontColor1;
    document.querySelector('#prefs-ft-size').value = cssCustomValues.cssSizeFont;
    document.querySelector('#prefs-ft-size').nextElementSibling.value = cssCustomValues.cssSizeFont;
}




// ////////////////////////////////////////////////////////////////////
// ////////////// CUSTOM COLORS AND FONT SIZE - READ //////////////////
// :root {
//     --mainColor1: #aa0;
//     --mainColor2: #a0a;
//     --mainColor3: #808;
//     --fontColor1: #00a;
//     --fontColor2: #eee;
//     --titleFont: Arial, Helvetica, sans-serif;
//     --mainFont: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
const cssRoot = getComputedStyle(document.documentElement);
const cssRootValues = {};

cssRootValues.cssMainColor1 = cssRoot.getPropertyValue('--mainColor1');
cssRootValues.cssMainColor2 = cssRoot.getPropertyValue('--mainColor2');
cssRootValues.cssMainColor3 = cssRoot.getPropertyValue('--mainColor3');
cssRootValues.cssFontColor1 = cssRoot.getPropertyValue('--fontColor1');
cssRootValues.cssFontColor2 = cssRoot.getPropertyValue('--fontColor2');
cssRootValues.cssTitleFont = cssRoot.getPropertyValue('--titleFont');
cssRootValues.cssMainFont = cssRoot.getPropertyValue('--mainFont');
cssRootValues.cssSizeFont = 16;

let cssCustomValues = cssRootValues;  // copy of Root CSS values to be saved


// ////////  CUSTOM COLORS AND FONT SIZE - CHANGE IN REAL TIME ///////////////
// ONLY BODY ELEMENT, SO THIS FUNCTIONS CAN BE EXTENDED IF NEED TARGET MORE //

function setCustomBackground(value){
    document.querySelector('body').style.backgroundColor = value;
    
}
function setCustomFontColor(value){
    document.querySelector('body').style.color = value;
    
}
function setCustomFontSize(value){
    document.querySelector('body').style.fontSize = value + "px";
    
}


// ///////// EVENTS for hidden customisation form ////////////////
// ///////// EVENTS utilise functions from above ////////////////

// Reads value from first picker and pass it to background changing function
document.querySelector('#prefs-bg-color').addEventListener('change', 
    function(event){
        setCustomBackground(event.target.value);
        cssCustomValues.cssMainColor1 = event.target.value; // cssCustomValues CAN BE SAVED
    } 
);

// Reads value from second picker and pass it to font color changing function
document.querySelector('#prefs-ft-color').addEventListener('change', 
    function(event){
        setCustomFontColor(event.target.value);
        cssCustomValues.cssFontColor1 = event.target.value; // cssCustomValues CAN BE SAVED
    } 
);

// Reads value from thirs picker and pass it to font size changing function
document.querySelector('#prefs-ft-size').addEventListener('change', 
    function(event){
        setCustomFontSize(event.target.value);
        cssCustomValues.cssSizeFont = event.target.value; // cssCustomValues CAN BE SAVED
    } 
);



// /////// EVENTS for hidden customisation form - BUTTONS /////////////
// /////// [ SAVE ] button /////////////
document.querySelector('#prefs-save').addEventListener('click', 
    function(){localStorage.setItem('cssValues', JSON.stringify(cssCustomValues));}
); // ---------- ADD HIDE CUSTOMISATINO FORM -------------


// /////// [ Cancel ] button /////////////
document.querySelector('#prefs-cancel').addEventListener('click', 
    function(){
        window.location.reload();
    }
); // ---------- ADD HIDE CUSTOMISATINO FORM -------------


// /////// [ DEFAULT ] button /////////////
document.querySelector('#prefs-default').addEventListener('click', 
    function(){
        localStorage.setItem('cssValues', JSON.stringify(cssRootValues));
        window.location.reload();
    }
); // ---------- ADD HIDE CUSTOMISATINO FORM -------------


// ////////////////////////////////////////////////
// ////////////////  IMAGE GALLERY ////////////////

// grab all images and tots from gallery:
let z = 0
let galleryDots = document.querySelectorAll('.gallery-dots');
let galleryImages = document.querySelectorAll('#gallery-contrainer img');
// add events to all dots
galleryDots.forEach((element) => {
    //element.addEventListener('mouseover', ()=>{element.style.backgroundColor = '#444'});
    //element.addEventListener('mouseleave', ()=>{element.style.backgroundColor = '#ccc'});
    element.addEventListener('click', galleryDotsEvent);
});


// first time initial start
let currentImage = 0;
galleryShow(currentImage);


// triggering functions
function galleryDotsEvent(e) {galleryShow(parseInt(e.target.id[11]))}
function galleryRight() {galleryShow(currentImage + 1)}
function galleryLeft() {galleryShow(currentImage - 1)}


// ////// main gallery function //////
function galleryShow(image){
    // is selected number matching images numer? 
    if(image >= (galleryImages.length)) image = 0;
    if(image < 0) image = galleryImages.length - 1;
    currentImage = image;

    // reset all dots to default color
    galleryDots.forEach(element => {element.style.backgroundColor = '#ccc';});
    // change selected one to grey
    galleryDots[currentImage].style.backgroundColor = '#444';

    // reset all photos opacity to 0
    galleryImages.forEach(element => {element.style.opacity = 0;});
    // change selected photo opacity to 1
    galleryImages[currentImage].style.opacity = 1;
}



// ////////////////////////////////////////////////
// ////////////////  GEO LOCATION  ////////////////

document.querySelector('#find-me').addEventListener('click', geoFinder);

function geoFinder() {
    const status = document.querySelector('#status');
    const coOrds = document.querySelector('#co-ords');

    // clean text variables
    status.content = '';
    coOrds.textContent = '';

    function geoSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        coOrds.textContent = `Latitude: ${latitude}° ,Longitude: ${longitude}°`;
        
        let gMapSrc = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19077.27170460005!2d' 
            + longitude + '!3d' + latitude
            + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sie!4v1670487361166!5m2!1sen!2sie';
        document.querySelector('#gMap').src = gMapSrc;
    }

    function error(){
        status.textContent = 'Unable to find location.';
    }

    if(!navigator.geolocation){
        status.textContent = 'Geolocation is not supported.';
    }
    else{
        status.textContent = 'locating...';
        navigator.geolocation.getCurrentPosition(geoSuccess, error);
    }
}


// ////////////////////////////////////////////////
// ////////////////  JS ANIMATION  ////////////////
window.addEventListener('resize', function() {
    // reset animation settings on window resizing to prevent glith
    let animPsArray = document.querySelectorAll('#animation-section p');
    animPsArray.forEach(function(element){element.remove()});
    pleft = animSpace.clientWidth /4;
    ppleft = 1.5;
    ptop = 90;
    pptop = 2;

    if(animRun){
        clearInterval(animInterval);
        animRun = false;
        var audio = new Audio('./media/chimes.wav');
        audio.play();
    }
}, true);

let animSpeed = 3;
let animRun = false;
document.querySelector('#animSpeedButton span').innerText = animSpeed;
document.querySelector('#animSpeed').value = animSpeed;

document.querySelector('#animStart').addEventListener('click', function(){
    if(!animRun){
        animInterval = setInterval(randomDots, 500 / animSpeed);
        animRun = true;
    }
});

document.querySelector('#animStop').addEventListener('click', function(){
    if(animRun){
        clearInterval(animInterval);
        animRun = false;
        var audio = new Audio('./media/chimes.wav');
        audio.play();
    }
});

document.querySelector('#animSpeed').addEventListener('change', function(event){
        animSpeed = event.target.value;  // setting new animation value
        document.querySelector('#animSpeedButton span').innerText = animSpeed;
        if(animRun){
            clearInterval(animInterval);
            animInterval = setInterval(randomDots, 500 / animSpeed);
        }
    });

const animSpace = document.querySelector('#animation-section')
let pleft = animSpace.clientWidth /4;
let ppleft = 1.5;
let ptop = 90;
let pptop = 2;
function randomDots() {
  var p = document.createElement("p");
  animSpace.append(p);
  p.style.left = (pleft += ppleft) + "px";
  p.style.top = (ptop += pptop) + "px";
  ppleft += (Math.random() - ((pleft-(animSpace.clientWidth/3))/200));
  pptop += (Math.random() - ((ptop-140)/140));
}
randomDots();


// //////////////////////////////////////////////
// //////////  SECOND JS Animation 2 /////////////
window.addEventListener('resize', function() {
    x = 2; // reset animation settings on window resizing to prevent glith
    y = 2;
    dx = 1;
    dy = 1;
}, true);

let anim2Speed = 1;

const ball = document.querySelector("#ball");
const ballF = document.querySelector("#ballField");
document.querySelector('#anim2SpeedButton span').innerText = anim2Speed;
document.querySelector('#anim2Speed').value = anim2Speed;
let x = 200;
let y = 200;
let dx = 1;
let dy = 1;

// SECOND animation controlls
document.querySelector('#anim2Start').addEventListener('click', function(){
    if(anim2Speed == 0){
        anim2Speed = document.querySelector('#anim2Speed').value;
    }
});

document.querySelector('#anim2Stop').addEventListener('click', function(){
    anim2Speed = 0;
    var audio = new Audio('./media/chimes.wav');
    audio.play();
});

document.querySelector('#anim2Speed').addEventListener('change', function(event){
    if(anim2Speed > 0) {anim2Speed = event.target.value;}
    // update speed selector number next to range selector
    document.querySelector('#anim2SpeedButton span').innerText = event.target.value;
});  

function ballAnimation() {

    // method tells browser to perform an animation
    animFrame = requestAnimationFrame(ballAnimation);

    // check if the ball has reached the edge of the screen
    // and reverse the direction if necessary
    if (x + dx > (ballF.clientWidth - ball.clientWidth) || x + dx < 0) {dx = -dx;}
    if (y + dy > (ballF.clientHeight - ball.clientHeight) || y + dy < 0) {dy = -dy;}
    x += dx * anim2Speed;
    y += dy * anim2Speed;

    ball.style.top = y + "px";
    ball.style.left = x + "px";
}

ballAnimation();

// /////////////////////////////////////////////////
// //////////  onmouseover Animation 2 /////////////

document.querySelector('#ball').addEventListener('mouseover', function(){
    this.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
});
document.querySelector('#ballField').addEventListener('mousedown', function(){
    this.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
}); 
document.querySelector('#ballField').addEventListener('mouseout', function(){
    this.style.backgroundColor = '#008000';
}); 

// /////////////////////////////////////////////////
// //////////////  more info  //////////////////////
document.querySelector('#info-me').addEventListener('click', function(){
    let userInfo = document.querySelector('#info-div p');
    userInfo.innerHTML += 'retrieving...<br>';
    fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.ipify.org/')).then(req => req.text()).then(function(res){
        if(res) userInfo.innerHTML += `Your IP address: ${res}`;
    });

    if(navigator.platform.includes('Win')){userInfo.innerHTML += 'Your Operating System: Windows<br>';}
    if(navigator.platform.includes('Mac')){userInfo.innerHTML += 'Your Operating System: Apple<br>';}
    if(navigator.platform.includes('Lin')){userInfo.innerHTML += 'Your Operating System: Linux<br>';}
    
    if(navigator.userAgentData.brands[2].brand){
        userInfo.innerHTML += `Your Browser: ${ navigator.userAgentData.brands[2].brand }<br>`;

    }


});






