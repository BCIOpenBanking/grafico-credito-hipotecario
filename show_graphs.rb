require 'bci'
require 'sinatra'

BCI = Bci::Client.new({ key: ENV['BCI_API_KEY'] })

get '/' do
  if params["valorPropiedadUf"] == nil or params["valorPieUf"] == nil
    if params["valorPropiedadUf"] == nil
      params["valorPropiedadUf"] = 4000.12
    end
    params["montoCreditoUf"] = Integer(params["valorPropiedadUf"])*0.9
  else
    params["montoCreditoUf"]=Integer(params["valorPropiedadUf"])-Integer(params["valorPieUf"])
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
  puts params
  lista = []
  j = 0
  for i in [5,10,20,25] do #peticiones a la api recursivamente
    params["plazo"]=i
    credito = BCI.hipotecario.simulate("23",params)
    lista[j]=credito["dividendoTotal"].round(1)
    j+=1
  end
  erb :graphic, locals: {datos: lista}
end
