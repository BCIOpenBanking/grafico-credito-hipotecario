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
      categories: ['5', '10', '20', '25']},
    yAxis: {
      title: { text: 'Dividendo' }},
    series: [{ data: datos }]
  });
});
