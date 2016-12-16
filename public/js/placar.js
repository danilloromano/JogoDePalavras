$("#botao-sync").click(sincronizaPlacar);

$("#botao-placar").click(function(){
  var placar = $(".placar");
  placar.stop().slideToggle(600);
});

function insereTabela(){
  var usuario = $("#usuarios").val();
  var placar = $(".placar");
  var corpoTabela = placar.find("tbody");
  var numPalavras =  $("#contador-palavras").text();
  var linha = novaLinha(usuario, numPalavras);
  linha.find(".linkDelete").click(deletaPlacar);

  corpoTabela.append(linha);
  placar.slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, numPalavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var clunaDeletar = $("<td>");

    var link = $("<a>").attr("href","#").addClass("linkDelete");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    clunaDeletar.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(clunaDeletar);

   return linha;
}

function deletaPlacar(event){
  event.preventDefault();
    var linha = $(this).parent().parent().fadeOut(1000);
    setTimeout(function () {
      linha.remove();
    }, 1000);
  }


function sincronizaPlacar(){
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function(){
      var usuario = $(this).find("td:nth-child(1)").text();
      var palavras = $(this).find("td:nth-child(2)").text();

      var score = {
          usuario: usuario,
          pontos: palavras
      };

      placar.push(score);

  });

  var dados = {
      placar: placar
  };

  $.post("http://localhost:3000/placar", dados, function(){
  
    $("#spinner").show();

    setTimeout(function(){
      $("#spinner").hide();
    },2000);

  }).fail(function(){
    $("#erro").removeClass("erroServidor");
    $("#erro").addClass("erro500");
    setTimeout(function(){
      $("#erro").addClass("erroServidor");
    },2000);
  })

}


  function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
      $(data).each(function(){
        var linha = novaLinha(this.usuario,this.pontos);
        linha.find(".linkDelete").click(deletaPlacar);
        $("tbody").append(linha);
      });
    });
}
