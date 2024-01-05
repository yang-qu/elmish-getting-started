module App

open Elmish
open Elmish.React
open Feliz

type State = { Count: int }

type Msg =
    | Increment
    | Decrement

let init () = { Count = 0 }

let update (msg: Msg) (state: State) : State =
    match msg with
    | Increment -> { state with Count = state.Count + 1 }

    | Decrement -> { state with Count = state.Count - 1 }

let render (state: State) (dispatch: Msg -> unit) =
    let oddOrEvenMessage =
        Html.h1
            [ prop.style
                  [ if state.Count < 0 then
                        style.display.none
                    else
                        style.display.block ]

              prop.text (
                  if state.Count % 2 = 0 then
                      "Count is even"
                  else
                      "Count is odd"
              ) ]

    Html.div
        [ Html.button [ prop.onClick (fun _ -> dispatch Increment); prop.text "+" ]
          Html.div state.Count
          Html.button [ prop.onClick (fun _ -> dispatch Decrement); prop.text "-" ]
          oddOrEvenMessage ]



Program.mkSimple init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run
