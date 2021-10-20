let data =[];
let species = [];
let commentsArr = [];
if((JSON.parse(window.localStorage.getItem('comments'))) === null){
window.localStorage.setItem('comments', JSON.stringify(commentsArr));}
//tacking the data from API-------------------------------------------------------------------------
fetch('https://cors-anywhere.herokuapp.com/https://elephant-api.herokuapp.com/elephants')
.then(function(response) {
  return response.json()})
  .then(function (json) {  
      //save the data in array
   data = json;

   // creating the specie page part------------------------------------------------------------------

   //save all the species and thier image in the file in species array
   species.push([data[0].species,data[0].image]);
   for (let i=0; i<47;i++){
    let x =0;
       for(let j=0; j<species.length;j++){
           if (data[i].species === species[j][0]){
               x=1;
               break;
           }
       }
       if(x===0){
         species.push([data[i].species,data[i].image]);
       }
   }

  //print all the species in the page first part
   const parentS = document.getElementById("specieDiv");
   const home= document.getElementById("home");
   for(let i=0; i<species.length;i++){
    const Div=document.createElement("div");
    Div.className= "card";
    const image = document.createElement("img");
    image.className= "card-img-top";
    const divBody=document.createElement("div");
    divBody.className ="card-body";
    const specie = document.createElement("p");
    const button = document.createElement("button");
    button.className = "AllButtons";
    button.addEventListener("click",function(){
      home.hidden = true;
      printElephants(species[i][0]);

    });
    image.src= species[i][1];
    Div.append(image);
    specie.innerHTML= `<b>${species[i][0]}</b>`
    divBody.append(specie);
    button.innerHTML= `more`;
    divBody.append(button);
    Div.append(divBody);
    parentS.append(Div);
   }
 
   //print each specie elephants
   
   function printElephants(specie){
    const main = document.getElementById("main");
    const parentBIG = document.createElement("div");
    parentBIG.className="parentBIG";
    const parent = document.createElement("div");
    parent.className="eleCards";
    parent.classList.add("row", "row-cols-1" ,"row-cols-md-3" ,"g-4");
    const aDiv = document.createElement("div");
    aDiv.className= "aDiv";
    const a = document.createElement("a");
    a.innerText= "Back to all species";
    a.className="a";
    a.addEventListener("click",function(){
      parentBIG.hidden = true;
      home.hidden = false;
    });
    aDiv.append(a);
    parentBIG.append(aDiv);
    for (let i=0; i<47;i++){

      if(specie == data[i].species){
        const div = document.createElement("div");
        div.className= "card";
        const image = document.createElement("img");
        image.className= "card-img-top";
        image.src= data[i].image;
        div.append(image);
        const divBody=document.createElement("div");
        divBody.className ="card-body";
        const name = document.createElement("p");
        name.innerHTML = `<b>${data[i].name}</b>`;
        divBody.append(name);
        const button = document.createElement("button");
        button.className = "AllButtons";
        button.innerText= "details";
        button.addEventListener("click",function(){
          elephantDetails(i);
        });
        divBody.append(button);
        div.append(divBody);
        parent.append(div);
      }
    }
    parentBIG.append(parent);
    main.append(parentBIG);
   }
// print elphant details in popup
   function elephantDetails(i){
     const main= document.getElementById("main");
     const modal = document.createElement("div");
     modal.id="myModal";
     modal.className="modal";
     const modalCon = document.createElement("div");
     modalCon.className="modal-content";
     const span= document.createElement("span");
     span.innerHTML= `&times;`;
     span.className="close";
     const details= document.createElement("div");
     details.className= "details";
     const imageNote= document.createElement("div");
     imageNote.className="imageNote";
     const body =document.createElement("div");
     body.className="detailsBody"
     const image = document.createElement("img");
     image.src= data[i].image;
     image.className="dImage"
     const note=document.createElement("p");
     note.innerHTML=`<b id="note">Note:</b> ${data[i].note}`
     const bodyPara=document.createElement("p");
     bodyPara.innerHTML=`<b>Name:</b> ${data[i].name}<br><b>Affiliation:</b> ${data[i].affiliation}<br><b>Date of birth:</b> ${data[i].dob}<br><b>Date of dith:</b> ${data[i].dod}<br>
     <b>Fictional: </b>${data[i].fictional}<br><b>Sex: </b>${data[i].sex}<br><b>Species:</b> ${data[i].species}<br><b>Wikilink:</b> <a href=${data[i].wikilink}>Wikipedia</a>`

     span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }}
      // comments part ---------------------
      const inputName = document.createElement("input");
      inputName.type= "text";
      inputName.id="name";
      inputName.placeholder="name";
      const inputcomment = document.createElement("input");
      inputcomment.type= "text";
      inputcomment.id="comment";
      inputcomment.placeholder="Comment";
      const addComment=document.createElement("button");
      addComment.innerText="add comment";
      addComment.className="addComment";
      addComment.addEventListener("click",function(){
        let commentsArr = JSON.parse(window.localStorage.getItem('comments'));
        let arrCom = [data[i]._id, inputName.value, inputcomment.value];
        commentsArr.push(arrCom);
        window.localStorage.setItem('comments', JSON.stringify(commentsArr));
      });

      // display comment---------------------
      
      commentsArr = JSON.parse(window.localStorage.getItem('comments'));
      const comments=document.createElement("div");
      comments.className="scrol";

      for(let j=0; j<commentsArr.length;j++){
        if(commentsArr[j][0] == data[i]._id){
         
         const com = document.createElement("div");
         com.className="containerforCom";
         const namepara = document.createElement("p");
         const s = document.createElement("span");
         s.innerText= commentsArr[j][1];
         namepara.append(s);
         const compara = document.createElement("p");
         compara.innerText= commentsArr[j][2];
         com.append(namepara);
         com.append(compara);
         comments.append(com);

        }
      }
     
     
                                
      // commments part ---------------------
    modalCon.append(span);
    imageNote.append(image);
    imageNote.append(note);
    details.append(imageNote);
    body.append(bodyPara);
    body.append(inputName);
    body.append(document.createElement("br"));
    body.append(inputcomment);
    body.append(addComment);
    body.append(comments);
    details.append(body);
    modalCon.append(details);
    modal.append(modalCon);
    main.append(modal);
    modal.style.display = "block";
   
  }
//taimline-------------
  const but1 = document.getElementById("century1");
  but1.addEventListener("click",function(){
    home.hidden = true;
    yearOfBirth(0,1599);
  });
  const but2 = document.getElementById("century2");
  but2.addEventListener("click",function(){
    home.hidden = true;
    yearOfBirth(1599,1699);
  });
  const but3 = document.getElementById("century3");
  but3.addEventListener("click",function(){
    home.hidden = true;
    yearOfBirth(1699,1799);
  });
  const but4 = document.getElementById("century4");
  but4.addEventListener("click",function(){
    home.hidden = true;
    yearOfBirth(1799,1899);
  });
  const but5 = document.getElementById("century5");
  but5.addEventListener("click",function(){
    home.hidden = true;
    yearOfBirth(1899,1999);
  });

  function yearOfBirth(year1,year2){
    const main = document.getElementById("main");
    const parentBIG = document.createElement("div");
    const parent = document.createElement("div");
    parent.className="eleCards";
    parent.classList.add("row", "row-cols-1" ,"row-cols-md-3" ,"g-4");
    const aDiv = document.createElement("div");
    aDiv.className= "aDiv";
    const a = document.createElement("a");
    a.innerText= "Back to all species";
    a.className="a";
    a.addEventListener("click",function(){
      parentBIG.hidden = true;
      home.hidden = false;
    });
    aDiv.append(a);
    parentBIG.append(aDiv);
    for (let i=0; i<47;i++){
      let dob =parseInt(data[i].dob);
      if (dob != NaN){

      if(dob>year1 && dob<= year2){
        const div = document.createElement("div");
        div.className= "card";
        const image = document.createElement("img");
        image.className= "card-img-top";
        image.src= data[i].image;
        div.append(image);
        const divBody=document.createElement("div");
        divBody.className ="card-body";
        const name = document.createElement("p");
        name.innerHTML = `<b>${data[i].name}</b>`;
        divBody.append(name);
        const button = document.createElement("button");
        button.className = "AllButtons";
        button.innerText= "details";
        button.addEventListener("click",function(){
          elephantDetails(i);
        });
        divBody.append(button);
        div.append(divBody);
        parent.append(div);
      }}
    }
    parentBIG.append(parent);
    main.append(parentBIG);
  }
    
  function comments(){

  }
    });

    