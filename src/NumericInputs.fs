module NumericInputs

open Elmish
open Elmish.React
open Feliz

type State = { NumberInput: int }

type Msg = SetNumberInput of int

let init () = { NumberInput = 0 }

let update msg state =
    match msg with
    | SetNumberInput numberInput -> { state with NumberInput = numberInput }

let tryParseInt (input: string) : Option<int> =
    try
        Some(int input)
    with _ ->
        None

let render state (dispatch: Msg -> unit) =
    Html.div
        [ Html.input
              [ prop.valueOrDefault state.NumberInput
                prop.onChange (tryParseInt >> Option.iter (SetNumberInput >> dispatch)) ]

          Html.span state.NumberInput ]

Program.mkSimple init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run
