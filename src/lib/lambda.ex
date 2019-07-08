defmodule Lambda do
  # Braps
  def handle(_, _context) do    
    %{:elixir => System.version}
    |> Jason.encode!
    |> IO.puts
  end
end
