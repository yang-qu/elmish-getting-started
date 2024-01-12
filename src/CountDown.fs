module CountDown

open Elmish
open Elmish.React
open Feliz

type State = { Count: int }

type Msg =
    | StartCountdown
    | Tick


let init () = { Count = 5 }, Cmd.ofMsg StartCountdown


let update (msg: Msg) (state: State) =
    match msg with
    | StartCountdown ->
        let step =
            async {
                do! Async.Sleep 1000
                return Tick
            }

        state, Cmd.fromAsync step

    | Tick when state.Count <= 0 -> state, Cmd.none

    | Tick ->
        let nextState = { state with Count = state.Count - 1 }

        let step =
            async {
                do! Async.Sleep 1000
                return Tick
            }

        nextState, Cmd.fromAsync step

let render (state: State) (dispatch: Msg -> unit) =
    Html.p (sprintf "Counting down: %d" state.Count)

Program.mkProgram init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run
