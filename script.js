const resistor=document.getElementById("resistor");
const capacitor=document.getElementById("capacitor");
const Rvalor=document.getElementById("Rvalor");
const Cvalor=document.getElementById("Cvalor");
const tauResultado=document.getElementById("tauResultado");

function atualizar(){

let R=parseFloat(resistor.value);
let Cmicro=parseFloat(capacitor.value);
let C=Cmicro*0.000001;
let tau=R*C;

Rvalor.innerHTML=R+" Ω";
Cvalor.innerHTML=Cmicro+" μF";
tauResultado.innerHTML="τ = "+tau.toFixed(4)+" s";

desenharGrafico(tau);
}

resistor.addEventListener("input",atualizar);
capacitor.addEventListener("input",atualizar);
atualizar();


function carregarCapacitor(){

let campo=document.getElementById("campo");
let carga=0;

let intervalo=setInterval(function(){

carga++;
campo.innerHTML="+".repeat(carga)+" | -".repeat(carga);

if(carga>=8){
clearInterval(intervalo);
}

},400);
}


function desenharGrafico(tau){

let canvas=document.getElementById("graficoRC");
let ctx=canvas.getContext("2d");

ctx.clearRect(0,0,700,400);

// eixos
ctx.beginPath();
ctx.moveTo(50,350);
ctx.lineTo(650,350);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50,350);
ctx.lineTo(50,50);
ctx.stroke();

let tempoMax=1;

ctx.beginPath();

for(let t=0;t<tempoMax;t+=0.005){

let x=t/tempoMax*600+50;
let y=350-(1-Math.exp(-t/tau))*250;

if(t===0){
ctx.moveTo(x,y);
}else{
ctx.lineTo(x,y);
}

}

ctx.stroke();
}


/* ================= NAVEGAÇÃO ================= */

function abrirSecao(id){

document.querySelector(".home").style.display="none";

document.querySelectorAll(".conteudo").forEach(sec=>{
sec.classList.remove("ativa");
});

document.getElementById(id).classList.add("ativa");

window.scrollTo(0,0);
}


function voltarHome(){

document.querySelector(".home").style.display="flex";

document.querySelectorAll(".conteudo").forEach(sec=>{
sec.classList.remove("ativa");
});

window.scrollTo(0,0);
}
