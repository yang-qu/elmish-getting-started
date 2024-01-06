import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, record_type, int32_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { parse } from "./fable_modules/fable-library.4.9.0/Int32.js";
import { createElement } from "react";
import { equals, createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { iterate } from "./fable_modules/fable-library.4.9.0/Seq.js";
import { toArray } from "./fable_modules/fable-library.4.9.0/Option.js";
import { ofArray } from "./fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class State extends Record {
    constructor(NumberInput) {
        super();
        this.NumberInput = (NumberInput | 0);
    }
}

export function State_$reflection() {
    return record_type("NumericInputs.State", [], State, () => [["NumberInput", int32_type]]);
}

export class Msg extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["SetNumberInput"];
    }
}

export function Msg_$reflection() {
    return union_type("NumericInputs.Msg", [], Msg, () => [[["Item", int32_type]]]);
}

export function init() {
    return new State(0);
}

export function update(msg, state) {
    const numberInput = msg.fields[0] | 0;
    return new State(numberInput);
}

export function tryParseInt(input) {
    try {
        return parse(input, 511, false, 32);
    }
    catch (matchValue) {
        return void 0;
    }
}

export function render(state, dispatch) {
    let value;
    const children = ofArray([createElement("input", createObj(ofArray([(value = (state.NumberInput | 0), ["ref", (e) => {
        if (!(e == null) && !equals(e.value, value)) {
            e.value = (value | 0);
        }
    }]), ["onChange", (ev) => {
        iterate((arg) => {
            dispatch(new Msg(arg));
        }, toArray(tryParseInt(ev.target.value)));
    }]]))), createElement("span", {
        children: [state.NumberInput],
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkSimple(init, update, render)));

//# sourceMappingURL=NumericInputs.js.map
