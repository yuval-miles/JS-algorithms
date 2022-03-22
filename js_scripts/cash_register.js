
var billArr = [0.01,0.05,0.1,0.25,1,5,10,20,100];

function BillObj () {
  this.penny = 0;
  this.nickel = 0;
  this.dime = 0;
  this.quater = 0;
  this.one = 0;
  this.five = 0;
  this.ten = 0;
  this.twenty = 0;
  this.hundred = 0;
}

var cashRegisterObj = new BillObj();
var paymentObj = new BillObj();


function checkCashRegister(price, cash, cid) {
    let change = cash-price;
    const changeArr = [];
    const cidSum = Math.round(cid.reduce((sum,i)=>{return sum+=i[1]},0)*1000)/1000;
    const changeObj = {};
  
    if(change == cidSum){
      changeObj.status = "CLOSED";
      changeObj.change = cid;
      return changeObj;
    }
  
    if((change < 0)||(cidSum < change)){
      changeObj.status = "INSUFFICIENT_FUNDS";
      changeObj.change = [];
      return changeObj;
    }else{
        for(let i=0;i<cid.length;i++){
        change = Math.round(change*1000)/1000
        if(change>=billArr[(billArr.length-1)-i]){
          let billAmmount = Math.floor(change/billArr[(billArr.length-1)-i])
          let pushAmmount = 0;
          while((cid[(cid.length-1)-i][1]>0)&&(billAmmount>0)){
            billAmmount--;
            cid[(cid.length-1)-i][1] -= billArr[(billArr.length-1)-i];
            cid[(cid.length-1)-i][1] = Math.round(cid[(cid.length-1)-i][1]*1000)/1000;
            pushAmmount += billArr[(billArr.length-1)-i];
            change -= billArr[(billArr.length-1)-i];
          }
          pushAmmount = Math.round(pushAmmount*1000)/1000;
          if(pushAmmount > 0){
            changeArr.push([cid[(cid.length-1)-i][0],pushAmmount]);
          }
          
         
      }
      }
  
      if(change <= 0){
        changeObj.status = "OPEN";
        changeObj.change = changeArr;
      }else{
        changeObj.status = "INSUFFICIENT_FUNDS";
        changeObj.change = [];
      }
      
    }
  
    return changeObj;
  }

  function chargeObj(bill,operation,obj){
    let billInputElement;
    let billAmmountElement;
    let totalAmmountElement;
    let totalAmmountValue;

    if(obj == "cashRegisterObj"){
      billInputElement = document.getElementById(bill);
      billAmmountElement = document.getElementById(bill+"-ammount");
      totalAmmountElement = document.getElementById("total-c-reg");
    }else{
      billInputElement = document.getElementById("p-"+bill);
      billAmmountElement = document.getElementById("p-"+bill+"-ammount");
      totalAmmountElement = document.getElementById("total-c-given");
    }

    let billValue = billInputElement.value;
    if(!inputValidator(parseFloat(billValue),billInputElement)){
      return;
    }
    let totalValue = 0;
    totalAmmountValue = totalAmmountElement.innerHTML.match(/\d+[.]*\d*/g);

    switch (bill){
      case "penny": totalValue = billValue * 0.01;break;
      case "nickel": totalValue = billValue * 0.05;break;
      case "dime": totalValue = billValue * 0.1;break;
      case "quater": totalValue = billValue * 0.25;break;
      case "one": totalValue = billValue * 1;break;
      case "five": totalValue = billValue * 5;break;
      case "ten": totalValue = billValue * 10;break;
      case "twenty": totalValue = billValue * 20;break;
      case "hundred": totalValue = billValue * 100;break;
    }

    let updateAmmount = 0;
    
    if(operation == "add"){
      eval(obj)[bill] = Math.round((eval(obj)[bill] + totalValue)*1000)/1000;
      updateAmmount = parseFloat(billAmmountElement.innerHTML) + totalValue;
      billAmmountElement.innerHTML = Math.round(updateAmmount*1000)/1000;
      updateAmmount = parseFloat(totalAmmountValue[0]) + totalValue;
      totalAmmountElement.innerHTML = `Total Ammount:${Math.round(updateAmmount*1000)/1000}`;
    }else {
      if((Math.round((eval(obj)[bill] - totalValue)*1000)/1000)>=0){
        eval(obj)[bill] = Math.round((eval(obj)[bill] - totalValue)*1000)/1000;
        updateAmmount = parseFloat(billAmmountElement.innerHTML) - totalValue;
        billAmmountElement.innerHTML = Math.round(updateAmmount*1000)/1000;
        updateAmmount = parseFloat(totalAmmountValue[0]) - totalValue;
        totalAmmountElement.innerHTML = `Total Ammount:${Math.round(updateAmmount*1000)/1000}`;
      }else{
        eval(obj)[bill] = 0;
        billAmmountElement.innerHTML = 0;
      }
    }

    document.getElementById("status").innerHTML = "OPEN"
    
  }

  function inputValidator(input,elem){
    if((input<=0)||(!Number.isInteger(input))){
      elem.classList.add("n-box-anim-red");
      elem.addEventListener("animationend", ()=>{
        elem.classList.remove("n-box-anim-red");
      },{once:true});
      document.getElementById("status").innerHTML = "INVAILD INPUT"
      return false;
    }else{
      return true;
    }
  }

  function makePayment(){
    let priceElement = document.getElementById("price");
    let statusElement = document.getElementById("status")
    let changeElement = document.getElementById("change-container")
    let totalAmmountElement = document.getElementById("total-c-given");
    let priceValue = priceElement.value;
    let cashValue = totalAmmountElement.innerHTML.match(/\d+[.]*\d*/g);
    let totalCregAmmountValue = document.getElementById("total-c-reg").innerHTML.match(/\d+[.]*\d*/g);

    if(document.getElementById("change-row")!=null){
      let element = document.getElementById("change-row")
      element.remove();
    }
    
    let element = document.createElement("div");
    element.setAttribute("class","cr-row");
    element.setAttribute("id","change-row");
    changeElement.appendChild(element);
    
    let changeRow = document.getElementById("change-row");
    const cashRegisterArr = [];

    for (const prop in cashRegisterObj){
      cashRegisterArr.push([prop,cashRegisterObj[prop]]);
    }
    const retObj = checkCashRegister(priceValue,cashValue,cashRegisterArr)
    statusElement.innerHTML = retObj.status;
    
    for(let i=0;i<retObj.change.length;i++){
      let element = document.createElement("div");
      element.setAttribute("class","n-box");
      element.appendChild(document.createTextNode(` ${retObj.change[i][0]} : ${retObj.change[i][1] }`));
      changeRow.appendChild(element);

      cashRegisterObj[retObj.change[i][0]] = Math.round((cashRegisterObj[retObj.change[i][0]] - retObj.change[i][1])*1000)/1000;
      document.getElementById(retObj.change[i][0]+"-ammount").innerHTML = cashRegisterObj[retObj.change[i][0]];
      document.getElementById(retObj.change[i][0]+"-ammount").classList.add("n-box-anim-red");
      document.getElementById(retObj.change[i][0]+"-ammount").addEventListener("animationend", ()=>{
        document.getElementById(retObj.change[i][0]+"-ammount").classList.remove("n-box-anim-red");
      },{once:true});
    }

    if(retObj.status!="INSUFFICIENT_FUNDS"){
      for(const prop in paymentObj){
        if(paymentObj[prop]!=0){
          cashRegisterObj[prop] = Math.round((cashRegisterObj[prop]+paymentObj[prop])*1000)/1000;
          document.getElementById(prop+"-ammount").innerHTML = cashRegisterObj[prop];
          document.getElementById(prop+"-ammount").classList.add("n-box-anim-green");
          document.getElementById(prop+"-ammount").addEventListener("animationend",()=>{
            document.getElementById(prop+"-ammount").classList.remove("n-box-anim-green");
          },{once:true});
        }
      }
      let cregAmmountChange = Math.round((parseFloat(totalCregAmmountValue) + parseFloat(priceValue))*1000)/1000;
      document.getElementById("total-c-reg").innerHTML = `Total Ammount:${cregAmmountChange}`;
    }

  }
  
