$("#botao-frases").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

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

function fraseAleatoria(){
  $("#spinner").show();
  $.get("http://localhost:3000/frases", trocaFrases).fail(function(){
    $("#erro").removeClass("erroServidor");
    $("#erro").addClass("erro500");
    setTimeout(function(){
      $("#erro").addClass("erroServidor");
    },2000);
  })
  .always(function(){
    $("#spinner").hide();
  });
}

function trocaFrases(data){
  var frase = $("#paragrafo");
  var numeroAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numeroAleatorio].texto);
  contaFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
  $("#spinner").toggle();
  var fraseId = $("#frase-id").val();
   var dados = {id : fraseId};

  $.get("http://localhost:3000/frases",dados,alteraFrases).fail(function(){
    $("#erro").removeClass("erroServidor");
    $("#erro").addClass("erro500");
    setTimeout(function(){
      $("#erro").addClass("erroServidor");
    },2000);
  })
  .always(function(){
    $("#spinner").hide();
  });
}

function alteraFrases(data){
  var frase = $("#paragrafo");
  frase.text(data.texto);
  contaFrase();
  atualizaTempoInicial(data.tempo);
}
