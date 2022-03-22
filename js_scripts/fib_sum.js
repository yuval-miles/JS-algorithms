function sumFibs(num) {
    let i = 1;
    let fibsArr = [1,1]
    let oddFibSum = 2;
    while (fibsArr[i]<=num){
      fibsArr.push((fibsArr[i]+fibsArr[i-1]));
      i++;
      if(((fibsArr[i] % 2)!=0)&&(fibsArr[i]<=num)){
        oddFibSum += fibsArr[i];
      }
    }
    return oddFibSum
  }

  function fibUpdateUI(){
    let fibInputElem = document.getElementById("fib-input");
    let fibInput = parseFloat(document.getElementById("fib-input").value);
    let fibOutput =  document.getElementById("fib-output");
    if(inputValidatorFib(fibInput,fibInputElem)){
        fibOutput.innerHTML = sumFibs(fibInput);
    }
  }

  function inputValidatorFib(input,elem){
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
