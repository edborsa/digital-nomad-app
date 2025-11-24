defmodule DigitalNomad.Repo do
  use Ecto.Repo,
    otp_app: :digital_nomad,
    adapter: Ecto.Adapters.Postgres
end
