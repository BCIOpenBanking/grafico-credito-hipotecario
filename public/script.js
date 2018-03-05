function miles(numero){
  var num = numero.value.replace(/\./g,"");
  if(!isNaN(num)){
    num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
    num = num.split("").reverse().join("").replace(/^[\.]/,"");
    numero.value = num;
  }
  else{
    numero.value = numero.value.replace(/[^\d\.]*/g,"");
  }
}

function milesInJs(numero){
  numero = numero.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
  numero = numero.split("").reverse().join("").replace(/^[\.]/,"");
  return numero;
}

function validatemonto() {
  var valorPropiedadUf = document.getElementById("valorPropiedadUf").value.replace(/\./g,"");
  var valorPieUf = document.getElementById("valorPieUf");
  var montoCredito = valorPropiedadUf - valorPieUf.value.replace(/\./g,"");
  // Si Monto Credito es inferior a 550 UF
  if (montoCredito < 550) {
    valorPieUf.setCustomValidity("El monto del crédito debe ser mayor a 550 UF");
    return false;
  }
  if (montoCredito*100/valorPropiedadUf > 90){
    valorPieUf.setCustomValidity("El monto a solicitar debe ser menor al 90% de la propiedad");
    return false;
  }
  valorPieUf.setCustomValidity("");
  return true;
}

function deleteValidity(){
  var valorPieUf = document.getElementById("valorPieUf");
  valorPieUf.setCustomValidity("");
}

function activatePreloader(){
  if (validatemonto()){
    var preloader = document.getElementById("preloader");
    var chart = document.getElementById("pieFijo");
    chart.style = "display:none";
    preloader.style = "";
  }
  return validatemonto();
}


$(function () {
  var myChart = Highcharts.chart('pieFijo', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Dividendo vs Plazo'
    },
    legend: {
      enabled: false
    },
    xAxis: {
      title: {
        text: 'Años'
      },
      categories: ['15', '20', '25']
    },
    yAxis: {
      title: {
        text: 'Dividendo'
      }
    },
    series: [{
      name: 'Variación',
      data: datos
    }]
  });
});

window.onload = function () {
  document.getElementById("submit").onmouseover = validatemonto;
  document.getElementById("submit").onmouseout = deleteValidity;
  document.getElementById("valorPropiedadUf").onblur = validatemonto;
  document.getElementById("valorPropiedadUf").onfocus = deleteValidity;

  if (propiedaduf != 0){
    var inputpropiedaduf = document.getElementById("valorPropiedadUf");
    var inputpropiedadpesos = document.getElementById("valorPropiedadPesos");
    inputpropiedaduf.value = milesInJs(propiedaduf);
    inputpropiedadpesos.value = milesInJs(propiedaduf*uf);
  }

  if (pieuf != 0){
    var inputpieuf = document.getElementById("valorPieUf");
    var inputpiepesos = document.getElementById("valorPiePesos");
    inputpieuf.value = milesInJs(pieuf);
    inputpiepesos.value = milesInJs(pieuf*uf);
  }
  var preloader = document.getElementById("preloader");
  preloader.style = "display:none";
  var chart = document.getElementById("pieFijo");
  chart.style = "";
  $('select').material_select();
  $("#valorPropiedadUf").keyup(function () {
    var value = $(this).val().replace(/\./g,"");
    value = Math.round(value*uf);
    value = value.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
    value = value.split("").reverse().join("").replace(/^[\.]/,"");
    $("#valorPropiedadPesos").val(value);
  });
  $("#valorPropiedadPesos").keyup(function () {
    var value = $(this).val().replace(/\./g,"");
    value = Math.round(value/uf*100)/100;
    //value = value.replace(/\./,",");
    $("#valorPropiedadUf").val(value);
  });
  $("#valorPieUf").keyup(function () {
    var value = $(this).val().replace(/\./g,"");
    value = Math.round(value*uf);
    value = value.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
    value = value.split("").reverse().join("").replace(/^[\.]/,"");
    $("#valorPiePesos").val(value);
  });
  $("#valorPiePesos").keyup(function () {
    var value = $(this).val().replace(/\./g,"");
    value = Math.round(value/uf*100)/100;
    //value = value.replace(/\./,",");
    $("#valorPieUf").val(value);
  });
}
