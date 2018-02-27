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

$(document).ready(function() {
  $('select').material_select();
});

$(function () {
  var myChart = Highcharts.chart('pieFijo', {
    chart: { type: 'line' },
    title: { text: 'Gráfico' },
    xAxis: {
      title: { text: 'Años' },
      categories: ['15', '20', '25']},
    yAxis: {
      title: { text: 'Dividendo' }},
    series: [{ data: datos }]
  });
});

$(document).ready(function () {
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
});
