defmodule DigitalNomad.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      DigitalNomadWeb.Telemetry,
      DigitalNomad.Repo,
      {DNSCluster, query: Application.get_env(:digital_nomad, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: DigitalNomad.PubSub},
      # Start a worker by calling: DigitalNomad.Worker.start_link(arg)
      # {DigitalNomad.Worker, arg},
      # Start to serve requests, typically the last entry
      DigitalNomadWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: DigitalNomad.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    DigitalNomadWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
