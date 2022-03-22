
var winWidth = document.documentElement.clientWidth;
var scroll;

window.addEventListener("scroll",scrollChecker);

window.addEventListener("resize",() => {
    winWidth = document.documentElement.clientWidth;
    navChecker();
});

function scrollChecker(){
    scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    navChecker();
}

function navChecker(){

    let navElem = document.getElementById("nav-bar");
    let topElem = document.getElementById("top-link");

    if((scroll >= 850)&&(winWidth>=650)){
        if(navElem.classList.contains("nav-bar-u")){
            updateDisplay(navElem,"add");
        }
    }else{
        if(navElem.classList.contains("nav-bar-s")){
            updateDisplay(navElem,"remove");
        }
    }
    if(winWidth<650){
        if(scroll>=850){
            if(topElem.classList.contains("top-link-u")){
                updateDisplay(topElem,"add");
            }
        }else{
            if(topElem.classList.contains("top-link-s")){
                updateDisplay(topElem,"remove");
            }
        }
    }else{
        if(topElem.classList.contains("top-link-s")){
            updateDisplay(topElem,"remove");
        }
    }
}

function updateDisplay(elem,addOrRemove){
    if(addOrRemove == "add"){
        elem.classList.remove(elem.id + "-u");
        elem.classList.add(elem.id + "-s");
    }else{
        elem.classList.remove(elem.id + "-s");
        elem.classList.add(elem.id + "-u");
    }
}