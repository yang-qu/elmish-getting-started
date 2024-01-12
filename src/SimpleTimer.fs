module SimpleTimer

open Elmish
open Elmish.React
open Feliz
open System

type State = {
    CurrentTime: DateTime
}

type Msg =
    | Tick
    
let update (msg: Msg) (state: State) =
    match msg with
    | Tick ->
        let nextState = { state with CurrentTime = DateTime.Now }
        let step: Async<Msg> = async {
          do! Async.Sleep 1000
          return Tick
        }

        nextState, Cmd.fromAsync step
        
let init() = { CurrentTime = DateTime.Now }, Cmd.ofMsg Tick

let formatTime (time: DateTime) =
    sprintf "%02d:%02d:%02d" time.Hour time.Minute time.Second

let render (state: State) (dispatch: Msg -> unit) =
    Html.div [
        prop.style [ style.padding 20 ]
        prop.children [
            Html.h1 (formatTime state.CurrentTime)
        ]
    ]

Program.mkProgram init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run
