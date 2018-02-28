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


$(function () {
  var myChart = Highcharts.chart('pieFijo', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Dividendo vs Plazo'
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
