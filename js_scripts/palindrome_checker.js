function palindrome() {

    let textBox = document.getElementById("p-checker");
    let textStr = textBox.value;
    let vaildatorIcon = document.getElementById("fail-or-pass");
    let newStr = textStr.toLowerCase()
    let newStrArr = newStr.match(/[a-zA-Z0-9]/gi)
    
    let checker = function(strArr){
      for(let i=0;i<strArr.length;i++){
        if(strArr[i]!=strArr[strArr.length-i-1]){
            return false;
        }
      }
      return true;
    }
  
    if(newStrArr==null){
        vaildatorIcon.style.backgroundColor = "#10e36b";
        vaildatorIcon.innerHTML = "Passed!"
    }else{
      if(checker(newStrArr)){
        vaildatorIcon.style.backgroundColor = "#10e36b";
        vaildatorIcon.innerHTML = "Passed!"
      }else{
        vaildatorIcon.style.backgroundColor = "#f25053";
        vaildatorIcon.innerHTML = "Failed"
      }
    }
  }
  