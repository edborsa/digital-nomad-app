defmodule DigitalNomadWeb.DummyJSON do
  @doc """
  Renders a list of bars.
  """
  def index(%{dummy_value: bars}) do
    %{data: %{dummy_value: bars}}
  end
end
