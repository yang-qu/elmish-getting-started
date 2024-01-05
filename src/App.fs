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
    let headerText =
        if state.Count % 2 = 0 then
            "Count is even"
        else
            "Count is odd"

    let oddOrEvenMessage = Html.h1 headerText

    Html.div
        [ yield Html.button [ prop.onClick (fun _ -> dispatch Increment); prop.text "+" ]
          yield Html.div state.Count
          yield Html.button [ prop.onClick (fun _ -> dispatch Decrement); prop.text "-" ]
          if state.Count >= 0 then
              yield oddOrEvenMessage ]

Program.mkSimple init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run
