require 'bci'
require 'sinatra'

BCI = Bci::Client.new({ key: ENV['BCI_API_KEY'] })

@@propiedaduf = 0
@@pieuf = 0

def default_values(params)
  params["codProducto"] = 12
  params["comuna"] = "Santiago Centro"
  params["region"] = "13"
  params["codSeguro"] = 1
  params["nombreCliente"] = "José Antonio"
  params["rutCliente"] = "777777777"
  params["dvCliente"] = "7"
  params["emailCliente"] = "john.doe@example.com"
  params["fonoCliente"] = 2222222222
  params["renta"] = 2100000
  params["plazo"] = 20
end

get '/' do
  params["valorPropiedadUf"] ||= 4000
  params["valorPieUf"] ||= 400
  params["montoCreditoUf"] = params["valorPropiedadUf"].to_i - params["valorPieUf"].to_i
  default_values(params)
  valores_dividendo = []
  credito = BCI.hipotecario.simulate(params)
  credito.each do |datos|
    valores_dividendo.push(datos["dividendoTotal"].round(1))
  end
  ufprice = BCI.stats.indicators['kpis'][0]['price'].gsub(/\./,"").to_f
  valores_dividendo.map! { |value| value*ufprice }
  erb :chart, locals: {datos: valores_dividendo, ufprice: ufprice, propiedaduf: @@propiedaduf, pieuf: @@pieuf}
end

#para que al recargar la pagina no salga reenviar elementos
post '/sendVariables' do
  @@propiedaduf = params["valorPropiedadUf"].gsub(/\./,"").to_i
  @@pieuf = params["valorPieUf"].gsub(/\./,"").to_i
  redirect '/'
end
