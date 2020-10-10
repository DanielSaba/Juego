let contador=10;
let contadorPregunta = 0 ;
let puntuacion=0;
let perdido=0;
let tiempo;


function sigPregunta(){
	const isQuestionOver=(Preguntas.length-1)===contadorPregunta;
	if(isQuestionOver){
		console.log('juego terminado');
		MostrarResultado()
	}else{
		contadorPregunta++;
		cargarPregunta();
	}
}
	

function timeUp(){
	clearInterval(tiempo);
	perdido++;
	preloadImage('lost');
	setTimeout(sigPregunta,3*1000);

	//sigPregunta();
}

function countDown(){

	contador--;

	$('#time').html('Tiempo: '+contador);

	if(contador===0){
		timeUp();
	}
}


function cargarPregunta(){

	contador=10;
	tiempo=setInterval(countDown, 1000);

	const Pregunta = Preguntas[contadorPregunta].Pregunta;
	const respuestas = Preguntas[contadorPregunta].respuestas;

	$('#time').html('Tiempo: '+contador);

	$('#game').html(`
		<h4>${Pregunta}</h4>
		${OpcionesCarga(respuestas)}
		`); 
}

function OpcionesCarga(respuestas){

let resultado = '';
for (let i = 0; i<respuestas.length; i++) {
	resultado += `<p class= "choice" data-answer="${respuestas[i]}">${respuestas[i]}</p>` ;
	}

	return resultado;
}

$(document).on('click','.choice',function(){

	clearInterval(tiempo);
	const selectedAnswer=$(this).attr('data-answer');
	const rescorrecta=Preguntas[contadorPregunta].rescorrecta;

	if(rescorrecta===selectedAnswer){

		puntuacion++;
		preloadImage('win');
		setTimeout(sigPregunta,3*1500);
		//sigPregunta();
		


	}else{
		perdido++;
		preloadImage('lost');
		setTimeout(sigPregunta,3*1500);
		//sigPregunta();
		//console.log("mala");
	}


});

function MostrarResultado(){

	const resultado = `

	<p>Tu puntuacion es:</p>
	<p> ${puntuacion} Preguntas(s) acertada(s)</p>
	<p> ${perdido} Preguntas(s) no acertada(s)</p>
	<button class = "btn btn-primary" id="reset">Empezar otra vez</button>
	`;
	$('#game').html(resultado);
}

$(document).on('click','#reset',function(){

contador=10;
contadorPregunta = 0 ;
puntuacion=0;
perdido=0;
tiempo=null;
cargarPregunta();
});

$('#start').click(function(){
	$('#start').remove();
	$('#time').html(contador);
	cargarPregunta();
});

function mostrarimages(images){

	//const rescorrecta=Preguntas[contadorPregunta].rescorrecta;
	const ima=images[contadorPregunta];

	return ima;

}

function preloadImage(status){

	const rescorrecta=Preguntas[contadorPregunta].rescorrecta;
	if(status==='win'){
		
		$('#game').html(`
			<p class="preload-image">Respuesta CORRECTA:  <b>${rescorrecta}</b></p>
		
		`); 
			
			
	}else{
		
		$('#game').html(`

			<p class="preload-image">Respuesta Incorrecta</p>
			<p class="preload-image">LA RESPUESTA CORRECTA ES: <b>${rescorrecta}</b></p>
			<img src="${mostrarimages(images)}"/>

			`);

		
	}


}
