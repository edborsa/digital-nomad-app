defmodule DigitalNomadWeb.PageController do
  use DigitalNomadWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
