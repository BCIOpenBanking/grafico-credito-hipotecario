require 'bci'
require 'sinatra'

BCI = Bci::Client.new({ key: ENV['BCI_API_KEY'] })

get '/' do
  erb :graphic
end
