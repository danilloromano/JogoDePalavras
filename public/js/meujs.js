var campo  = $(".campo-digitacao");
var tempoInicial = $("#tempo").text();
var contadorCaracteres = $("#contador-caracteres").text();
var contadorPalavras = $("#contador-palavras").text();
var frase = $("#paragrafo").text();


$(document).ready(function() {
  contaFrase();
  inicializaContadores();
  inicializaTempo();
  verificaTextos();
  $("#botao-reiniciar").click(reiniciaJogo());
  atualizaPlacar();
  $("#usuarios").selectize({
    create: true,
    sortField: 'text'
});
});

function comparaTextos(){

  var frase = $("#paragrafo").text();
  var digitado = campo.val();
  var comparavel = frase.substr(0 , digitado.length);

  if(digitado == comparavel){
    insereTabela();
  }else{
    $("#menErroDigitacao").removeClass("errodigitacao");
    $("#menErroDigitacao").addClass("mensagem-fim");
    setTimeout(function () {
      $("#menErroDigitacao").addClass("errodigitacao");
    },2000);
}
}

function contaFrase(){
  var texto = $("#paragrafo").text();
  var numPalavras = texto.split(" ").length;
  var qtdpalavras = $("#palavras");
  qtdpalavras.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo").text(tempo);
}

function inicializaContadores(){
  var textTextarea = $(".campo-digitacao").on("input",function(){
    var digitada = textTextarea.val();
    var qtddigitada = digitada.length;
    var contadorCaracteres = $("#contador-caracteres").text(qtddigitada);
    var quantPalavras = digitada.split(/\S+/).length - 1;
    var contadorPalavras = $("#contador-palavras").text(quantPalavras);
  });
}

function inicializaTempo(){
campo.one("focus",function(){
  var tempo = $("#tempo").text();
  var cronometroID = setInterval(function() {
        tempo--;
        $("#tempo").text(tempo);
      if(tempo < 1){
            clearInterval(cronometroID);
            finalizaJogo();
      }
    }, 1000);
})
}

function reiniciaJogo(){
  $("#botao-reiniciar").click(function(){
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  $("#tempo").text(tempoInicial);
  campo.toggleClass("campo-digitacao-cinza");
  inicializaTempo();
  campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde")
});
}


function finalizaJogo(){
campo.attr("disabled", true);
campo.toggleClass("campo-digitacao-cinza");
comparaTextos();
}

function verificaTextos(){
  campo.on("input", function() {
    var frase = $("#paragrafo").text();
  var digitado = campo.val();
  var comparavel = frase.substr(0 , digitado.length);
  if(digitado == comparavel){
    campo.addClass("borda-verde");
    campo.removeClass("borda-vermelha");
  }
  else{
    campo.addClass("borda-vermelha");
    campo.removeClass("borda-verde");
  }
})
};
