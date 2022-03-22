function sumPrimes(num) {
    function isPrime(num) {
      if (num <= 3) return num > 1;
      if ((num % 2 === 0) || (num % 3 === 0)) return false;
      let count = 5;
      while (Math.pow(count, 2) <= num) {
        if (num % count === 0 || num % (count + 2) === 0) return false;
      count += 6;
    }
    return true;
    }
    let sum = 0;
    for(let i=1;i<=num;i++){
      if (isPrime(i)){
        sum += i;
      }
    }
    return sum;
  }

  function primeUpdateUI(){
    let primeInputElem = document.getElementById("prime-input");
    let primeInput = parseFloat(document.getElementById("prime-input").value);
    let primeOutput =  document.getElementById("prime-output");
    if(inputValidatorPrime(primeInput,primeInputElem)){
        primeOutput.innerHTML = sumPrimes(primeInput);
    }
  }

  function inputValidatorPrime(input,elem){
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