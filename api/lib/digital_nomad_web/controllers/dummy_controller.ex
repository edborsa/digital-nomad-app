defmodule DigitalNomadWeb.DummyController do
  use DigitalNomadWeb, :controller

  action_fallback DigitalNomadWeb.FallbackController

  def index(conn, _params) do
    render(conn, :index, dummy_value: "bar")
  end
end
