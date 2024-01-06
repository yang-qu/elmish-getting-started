import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, record_type, string_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { createElement } from "react";
import { equals, createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { ofArray } from "./fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class State extends Record {
    constructor(TextInput) {
        super();
        this.TextInput = TextInput;
    }
}

export function State_$reflection() {
    return record_type("TextualInputs.State", [], State, () => [["TextInput", string_type]]);
}

export class Msg extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["SetTextInput"];
    }
}

export function Msg_$reflection() {
    return union_type("TextualInputs.Msg", [], Msg, () => [[["Item", string_type]]]);
}

export function init() {
    return new State("Some initial text");
}

export function update(msg, state) {
    const textInput = msg.fields[0];
    return new State(textInput);
}

export function render(state, dispatch) {
    let value;
    const children = ofArray([createElement("input", createObj(ofArray([(value = state.TextInput, ["ref", (e) => {
        if (!(e == null) && !equals(e.value, value)) {
            e.value = value;
        }
    }]), ["onChange", (ev) => {
        dispatch(new Msg(ev.target.value));
    }]]))), createElement("span", {
        children: [state.TextInput],
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkSimple(init, update, render)));

//# sourceMappingURL=TextualInputs.js.map
