var cartas = [
  "cloudy.png",
  "half-moon.png",
  "heart.png",
  "rainbow.png",
  "storm.png",
  "star.png",
  "naughty.png",
  "pixel.png",
];

var figurasJogo = [];
var cartaVirada = "virada.png";
$(document).ready(function () {
  $("#inicia").click(function () {
    $("#jogo").empty();
    for (i = 0; i <= cartas.length * 2; i++) {
      for (var p = cartas.length; p; ) {
        var n = (Math.random() * p--) | 0;
        var tmp = cartas[n];
        cartas[n] = cartas[p];
        cartas[p] = tmp;
        var img = $(
          '<img id="img' +
            i +
            '" class="cartas" src=' +
            tmp +
            " onclick=\"trocaImagem(this, '" +
            figurasJogo.length +
            "')\">"
        );
        figurasJogo.push(tmp);
        img.fadeIn(2000).slideDown(2000);
        $("#jogo").append(img);
        img.slideUp(1000).fadeOut(1000, function () {
          $(".cartas").attr("src", cartaVirada);
          $(".cartas").fadeIn(2000).slideDown(3000);
        });
        i++;
      }
    }
  });
});
var selecionados = [],
  ids = [],
  compImg = [],
  contadorcartas = 0,
  inicio,
  erros = 0;

function trocaImagem(img, indArr) {
  if (selecionados.length > 2) {
    selecionados.pop();
  }
  if (selecionados.length <= 2) {
    $("#" + img.id).attr("src", figurasJogo[indArr]);
    setTimeout(function () {
      if (selecionados.length == 0) {
        selecionados.push(indArr);
        ids.push(img.id);
        compImg.push(figurasJogo[indArr]);
      } else if (selecionados.length == 1) {
        selecionados.push(indArr);
        ids.push(img.id);
        compImg.push(figurasJogo[indArr]);
        if (compImg[0] == compImg[1]) {
          contadorcartas += 2;
          selecionados = [];
          ids = [];
          compImg = [];
          console.log(contadorcartas);
          if (contadorcartas == figurasJogo.length) {
            Swal.fire({
              title: "Venceu!",
              text: "Quer jogar mais uma vez?",
              imageUrl: "trophy.png",
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: "Custom image",
            });
            $("#jogo").empty();
            erros = 0;
          }
        } else {
          $("#" + ids[0]).attr("src", cartaVirada);
          $("#" + ids[1]).attr("src", cartaVirada);
          erros++;
          selecionados = [];
          ids = [];
          compImg = [];
        }
      }
    }, 1000);
  }
}
