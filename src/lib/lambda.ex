defmodule Lambda do
  def handle() do
    %{:elixir => System.version}
    |> Jason.encode!
    |> IO.puts
  end
end
