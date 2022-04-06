var timerId = null ;

function iniciaJogo(){
	var url=window.location.search;
	var nivelJogo = url.replace("?", "");
	var tempoSegundos = 0;
	switch (nivelJogo){
		case '1':
			tempoSegundos=120;
			break;
		case '2':
			tempoSegundos=60;
			break;
		case '3':
			tempoSegundos=30;
			break;	
		default:
			return false;
	}
	document.getElementById('cronometro').innerHTML = tempoSegundos;

	var qtdeBaloes = 20;

	criaBaloes(qtdeBaloes);

	document.getElementById('baloes-cheios').innerHTML=qtdeBaloes;
	document.getElementById('baloes-estourados').innerHTML=0;

	contagemTempo(tempoSegundos + 1);
}

function contagemTempo(tempoSegundos){

	tempoSegundos--;

	if(tempoSegundos==-1){
		clearTimeout(timerId);
		gameOver();
		return false;
	}

	document.getElementById('cronometro').innerHTML=tempoSegundos;
	timerId = setTimeout("contagemTempo("+tempoSegundos+")", 1000);
}

function criaBaloes(qtdeBaloes) {
	for (var i = 1; i <=qtdeBaloes; i++) {
		var balao = document.createElement("img");
		balao.src='imagens/balao_azul_pequeno.png';
		balao.style.margin='10px';
		balao.id= 'b'+i;
		document.getElementById('cenario').appendChild(balao);
		balao.onclick = function(){ estourar(this)};
	}
}

function gameOver(){
	removerEventoBaloes();
	alert('Fim de jogo, tente novamente');
	
}

function estourar(e){
	var idBalao = e.id;

	document.getElementById(idBalao).setAttribute("onclick", "");
	document.getElementById(idBalao).src= 'imagens/balao_azul_pequeno_estourado.png'

	pontuacao();
}

function pontuacao(){

	var baloesCheios = document.getElementById('baloes-cheios').innerHTML;
	var baloesEstourados = document.getElementById('baloes-estourados').innerHTML;

	baloesCheios = parseInt(baloesCheios);
	baloesEstourados = parseInt(baloesEstourados);

	baloesCheios--;
	baloesEstourados++;
	
	document.getElementById('baloes-cheios').innerHTML = baloesCheios;
	document.getElementById('baloes-estourados').innerHTML = baloesEstourados;

	statusJogo(baloesCheios);
}

function statusJogo(baloesCheios){
	if(baloesCheios==0){
		alert('Parabéns, você conseguiu estourar todos os balões a tempo');
		pararJogo();
	}
}

function pararJogo(){
	clearTimeout(timerId);
}

function removerEventoBaloes(){
	var i=1;

	while(document.getElementById('b'+i)){
		document.getElementById('b'+i).onclick= '';
		i++;
	}
}