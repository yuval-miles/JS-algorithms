function convertToRoman(num) {
    let conStr = "";
    let inputBox = document.getElementById("r-checker");
    let outputBox = document.getElementById("r-output");
    let inputValue = inputBox.value;
    let str = inputValue.toString();
    const letterArr = [["C","CD","D","CM"],["X","XL","L","XC"],["I","IV","V","IX"]];

    if(!inputValidator(parseFloat(inputValue),inputBox)){
      return;
    }

    if(str.length > 3){
      let strKPlus = str.slice(0,str.length-3)
      conStr = conStr.concat("M".repeat(strKPlus))
    }
  
    const converter = function (char,letterArr){
      if(str.charAt(char)<4){
      conStr = conStr.concat(letterArr[0].repeat(str.charAt(char)))
    }else if(str.charAt(char)==4){
      conStr = conStr.concat(letterArr[1]);
    }else if(str.charAt(char)==5){
      conStr = conStr.concat(letterArr[2]);
    }else if(str.charAt(char)>5&&str.charAt(char)<9){
      conStr = conStr.concat(letterArr[2]);
      conStr = conStr.concat(letterArr[0].repeat(str.charAt(char)-5));
    }else {
      conStr = conStr.concat(letterArr[3]);
    }
    }
  
    converter(str.length-3,letterArr[0]);
    converter(str.length-2,letterArr[1]);
    converter(str.length-1,letterArr[2]);

    outputBox.innerHTML = conStr;
  }

  function inputValidator(input,elem){
    if((input<=0)||(!Number.isInteger(input))){
      elem.classList.add("n-box-anim-red");
      elem.addEventListener("animationend", ()=>{
        elem.classList.remove("n-box-anim-red");
      },{once:true});
      return false;
    }else{
      return true;
    }
  }
