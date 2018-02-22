require 'bci'
require 'sinatra'

BCI = Bci::Client.new({ key: ENV['BCI_API_KEY'] })

get '/' do
  params["valorPropiedadUf"] = params["valorPropiedadUf"] || 4000.12
  begin
    params["montoCreditoUf"] = Integer(params["valorPropiedadUf"]) - Integer(params["valorPieUf"])
  rescue
    params["montoCreditoUf"] = Integer(params["valorPropiedadUf"])*0.9
  end
  params["comuna"] = "Santiago Centro"
  params["region"] = "13"
  params["indDfl2"] = true
  params["codSeguro"] = 1
  params["codeudor"] = false
  params["codeudorConSeguroDesgravamen"] = false
  params["nombreCliente"] = "José Antonio"
  params["apellidoCliente"] = "Pérez"
  params["rutCliente"] = "777777777"
  params["dvCliente"] = "7"
  params["emailCliente"] = "john.doe@example.com"
  params["fonoCliente"] = 2222222222
  params["renta"] = 2100000
  lista = []
  [10, 15, 20, 25].each do |plazo|
    params["plazo"] = plazo
    credito = BCI.hipotecario.simulate("23",params)
    lista.push(credito["dividendoTotal"].round(1))
  end
  ufprice = BCI.stats.indicators['kpis'][0]['price'].gsub(/\./,"").to_f
  erb :graphic, locals: {datos: lista, ufprice: ufprice}
end
