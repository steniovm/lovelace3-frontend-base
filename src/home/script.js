const url = 'https://rickandmortyapi.com/api';
//variaveis globais
let reqbtn = document.getElementById("reqbtn");
let output1 = document.getElementById("output1");
let output2 = document.getElementById("output2");
let output3 = document.getElementById("output3");
let idcaracter = document.getElementById("idcaracter");
let charactersarray = [];

//requicição pelo nome
async function requicitname(name){
  console.log(url+'/character/?name='+name);
  return new Promise(resolve => {
  fetch(url+'/character/?name='+name).then(
    function(response) {
      if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
      response.json().then(function(data) {
        console.log(data);
        console.log('dados recebidos');
        output3.innerHTML = JSON.stringify(data, false,' ');
        resolve(data.info.count);
      });
      }
  ).catch(function(err) {
    console.log('Fetch Error :-S', err);
    resolve(false);
  });
  });
}

//requicição pelo id
async function requicitid(idc){
  console.log(url+'/character/'+idc);
  return new Promise(resolve => {
  fetch(url+'/character/'+idc).then(
    function(response) {
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }
    response.json().then(function(data) {
      console.log(data);
      console.log('dados recebidos');
      output1.innerHTML = JSON.stringify(data, false,' ');
      charactersarray.push(data.name);
      output2.innerHTML = charactersarray;
      console.log('personagem adcionado');
      resolve (charactersarray[charactersarray.length-1]);//.split(' ')[0]);
    });
    }
    ).catch(function(err) {
        console.log('Fetch Error :-S', err);
        resolve(false);
    });
  });
}

//inicio
async function requicit(){
  let idc = idcaracter.value;
  console.log('id: '+idc);
  let carcname = await requicitid(idc);
  console.log('name: '+carcname);
  let number = await requicitname(carcname);
  console.log('ocorrencias: '+number);
}

//eventos
reqbtn.addEventListener('click',requicit);
