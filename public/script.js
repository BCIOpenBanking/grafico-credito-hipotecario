function miles(numero){
  var num = numero.value.replace(/[^\d\.,]/g,"");
  num = num.replace(/\./g,"");
  num = num.replace(/(\d*)(,\d*)?/g,decimalValue);
  numero.value = num;
}

function decimalValue(str,p1,p2){
  if (p2) return milesInJs(p1)+p2;
  return milesInJs(p1);
}

function milesInJs(numero){
  numero = numero.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
  numero = numero.split("").reverse().join("").replace(/^[\.]/,"");
  return numero;
}

function validateMonto() {
  var valorPropiedadUf = document.getElementById("valorPropiedadUf").value.replace(/\./g,"").replace(/,(\d*)/g,".$1");
  var valorPieUf = document.getElementById("valorPieUf");
  var montoCredito = valorPropiedadUf - valorPieUf.value.replace(/\./g,"").replace(/,(\d*)/g,".$1");
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
  if (validateMonto()){
    var preloader = document.getElementById("preloader");
    var chart = document.getElementById("pieFijo");
    chart.style = "display:none";
    preloader.style = "";
  }
  return validateMonto();
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
  document.getElementById("submit").onmouseover = validateMonto;
  document.getElementById("submit").onmouseout = deleteValidity;
  document.getElementById("valorPropiedadUf").onblur = validateMonto;
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
    var value = $(this).val().replace(/\./g,"").replace(/,/g,"\.");
    value = Math.round(value*uf);
    value = value.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
    value = value.split("").reverse().join("").replace(/^[\.]/,"");
    $("#valorPropiedadPesos").val(value);
  });
  $("#valorPropiedadPesos").keyup(function () {
    var value = $(this).val().replace(/\./g,"");
    value = String(Math.round(value/uf*100)/100).replace(/\./g,",");
    value = value.replace(/(\d*)(,\d*)?/g,decimalValue);
    $("#valorPropiedadUf").val(value);
  });
  $("#valorPieUf").keyup(function () {
    var value = $(this).val().replace(/\./g,"").replace(/,/g,"\.");
    value = Math.round(value*uf);
    value = value.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1.");
    value = value.split("").reverse().join("").replace(/^[\.]/,"");
    $("#valorPiePesos").val(value);
  });
  $("#valorPiePesos").keyup(function () {
    var value = $(this).val().replace(/\./g,"");
    value = String(Math.round(value/uf*100)/100).replace(/\./g,",");
    value = value.replace(/(\d*)(,\d*)?/g,decimalValue);
    $("#valorPieUf").val(value);
  });
  var select = document.getElementById("div_select").childNodes[1].childNodes[1];
  select.style = "border-bottom:0px";
}
