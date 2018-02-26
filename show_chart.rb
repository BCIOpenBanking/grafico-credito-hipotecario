require 'bci'
require 'sinatra'

BCI = Bci::Client.new({ key: ENV['BCI_API_KEY'] })

def default_values(params)
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
end

get '/' do
  params["valorPropiedadUf"] ||= 4000.12
  params["valorPieUf"] ||= 400
  params["montoCreditoUf"] = params["valorPropiedadUf"].to_i - params["valorPieUf"].to_i
  default_values(params)
  lista = []
  [10, 15, 20, 25].each do |plazo|
    params["plazo"] = plazo
    credito = BCI.hipotecario.simulate("23",params)
    lista.push(credito["dividendoTotal"].round(1))
  end
  ufprice = BCI.stats.indicators['kpis'][0]['price'].gsub(/\./,"").to_f
  erb :chart, locals: {datos: lista, ufprice: ufprice}
end
