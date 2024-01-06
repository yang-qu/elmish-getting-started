module TextualInputs

open Elmish
open Elmish.React
open Feliz

type State = { TextInput: string }

type Msg =
    | SetTextInput of string
    
let init() = { TextInput = "Some initial text" }

let update msg state =
    match msg with
    | SetTextInput textInput ->
        { state with TextInput = textInput }

let render state dispatch =
    Html.div [
        Html.input [
            prop.valueOrDefault state.TextInput
            prop.onChange (SetTextInput >> dispatch)
        ]
        Html.span state.TextInput
    ]
   
Program.mkSimple init update render
|> Program.withReactSynchronous "elmish-app"
|> Program.run