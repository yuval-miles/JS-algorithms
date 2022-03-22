function smallestCommons(arr) {
    arr.sort((a,b)=>a-b)
    function gcd(x, y) {
      if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
      x = Math.abs(x);
      y = Math.abs(y);
      while(y) {
        var t = y;
        y = x % y;
        x = t;
      }
      return x;
    }
    function lcm(x,y){
      return (x * y) / gcd(x,y)
    } 
    function lcmRange(x,y){
      if(x == y-1){
        return lcm(x,y); 
      }
      return lcm(x,(lcmRange(x+1,y)))
    }
    return lcmRange(arr[0],arr[1])
  }

  function lcmUpdateUI(){
    let lcmInputElemOne = document.getElementById("lcm-input-1");
    let lcmInputElemTwo = document.getElementById("lcm-input-2");
    let lcmInputOne = parseFloat(document.getElementById("lcm-input-1").value);
    let lcmInputTwo = parseFloat(document.getElementById("lcm-input-2").value);
    let lcmOutput =  document.getElementById("lcm-output");
    if((inputValidatorLcm(lcmInputOne,lcmInputElemOne))&&(inputValidator(lcmInputTwo,lcmInputElemTwo))){
        lcmOutput.innerHTML = smallestCommons([lcmInputOne,lcmInputTwo]);
    }
  }

  function inputValidatorLcm(input,elem){
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
