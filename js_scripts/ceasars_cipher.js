function rot13(type) {
    let textBox = document.getElementById("c-c-"+type);
    let str = textBox.value;
    let strNew = "";
    let changeValue = 0;
    let cap,floor = 0;

    if(type == "encode"){
        changeValue = 13;
    }else if(type == "decode"){
        changeValue = -13;
    }
    for(let i=0;i<str.length;i++){
      if(/[A-Z]|[a-z]/.test(str.charAt(i))){;
        let coder = str.charCodeAt(i) + changeValue;
        if(/[A-Z]/.test(str.charAt(i))){
            cap = 90;
            floor = 65;
        }else{
            cap = 122;
            floor = 97;
        }
        if(coder<floor){
          coder = cap - Math.abs((floor-1 - coder));
        }else if(coder>cap){
            coder = floor-1 + (coder - cap);
        }
        strNew = strNew.concat(String.fromCharCode(coder))
      }else{
        strNew = strNew.concat(str.charAt(i))
      }
    }

    textBox.value = strNew;
  }
  