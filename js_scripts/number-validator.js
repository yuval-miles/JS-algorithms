function telephoneCheck() {

    let inputBox = document.getElementById("number-checker");
    let inputValue = inputBox.value;
    let outputBox = document.getElementById("number-valid");

    const regexpOneNoBrac = /^(1)(\s)([0-9]{3})([-,\s])*([0-9]{3})([-,\s])*([0-9]{4})$/;
    const regexpOneBrac = /^(1)(\s)*[(]([0-9]{3})[)]([-,\s])*([0-9]{3})([-,\s])*([0-9]{4})$/;
    const regexpNoBrac = /^([0-9]{3})([-,\s])*([0-9]{3})([-,\s])*([0-9]{4})$/;
    const regexpBrac = /^[(]([0-9]{3})[)]([-,\s])*([0-9]{3})([-,\s])*([0-9]{4})$/;
  
    if(regexpNoBrac.test(inputValue)||regexpBrac.test(inputValue)||regexpOneNoBrac.test(inputValue)||regexpOneBrac.test(inputValue)){
      outputBox.innerHTML = "Valid!";
      outputBox.style.backgroundColor = "#10e36b";
    }else{
        outputBox.innerHTML = "Invalid!";
        outputBox.style.backgroundColor = "#f25053";
    }
  }
  