module App.FromAsync

open Elmish
open Elmish.React
open Feliz

module Cmd =
    let fromAsync (operation: Async<'msg>) : Cmd<'msg> =
        let delayedCmd (dispatch: 'msg -> unit) : unit =
            let delayedDispatch =
                async {
                    let! msg = operation
                    dispatch msg
                }

            Async.StartImmediate delayedDispatch

        Cmd.ofEffect delayedCmd

type State = { Count: int; Loading: bool }

let init () =
    { Count = 0; Loading = false }, Cmd.none

type Msg =
    | Increment
    | Decrement
    | IncrementDelayed

let update (msg: Msg) (state: State) =
    match msg with
    | Increment ->
        { state with
            Count = state.Count + 1
            Loading = false },
        Cmd.none
    | Decrement ->
        { state with
            Count = state.Count - 1
            Loading = false },
        Cmd.none
    | IncrementDelayed when state.Loading -> state, Cmd.none
    | IncrementDelayed ->
        let delayedIncrement =
            async {
                do! Async.Sleep 1000
                return Increment
            }

        { state with Loading = true }, Cmd.fromAsync delayedIncrement

let render (state: State) (dispatch: Msg -> unit) =
    let content =
        if state.Loading then
            Html.h1 "Loading..."
        else
            Html.h1 state.Count

    Html.div
        [ content

          Html.button [ prop.onClick (fun _ -> dispatch Increment); prop.text "Increment" ]

          Html.button [ prop.onClick (fun _ -> dispatch Decrement); prop.text "Decrement" ]

          Html.button
              [ prop.disabled state.Loading
                prop.onClick (fun _ -> dispatch IncrementDelayed)
                prop.text "Increment Delayed" ] ]

Program.mkProgram init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run
