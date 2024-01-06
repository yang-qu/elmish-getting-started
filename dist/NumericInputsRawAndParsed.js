import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, int32_type, record_type, option_type, string_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { some } from "./fable_modules/fable-library.4.9.0/Option.js";
import { parse } from "./fable_modules/fable-library.4.9.0/Int32.js";
import { createElement } from "react";
import { equals, createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { ofArray } from "./fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class Validated$1 extends Record {
    constructor(Raw, Parsed) {
        super();
        this.Raw = Raw;
        this.Parsed = Parsed;
    }
}

export function Validated$1_$reflection(gen0) {
    return record_type("NumericInputsRawAndParsed.Validated`1", [gen0], Validated$1, () => [["Raw", string_type], ["Parsed", option_type(gen0)]]);
}

export function Validated_createEmpty() {
    return new Validated$1("", void 0);
}

export function Validated_success(raw, value) {
    return new Validated$1(raw, some(value));
}

export function Validated_failure(raw) {
    return new Validated$1(raw, void 0);
}

export class State extends Record {
    constructor(NumberInput) {
        super();
        this.NumberInput = NumberInput;
    }
}

export function State_$reflection() {
    return record_type("NumericInputsRawAndParsed.State", [], State, () => [["NumberInput", Validated$1_$reflection(int32_type)]]);
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
    return union_type("NumericInputsRawAndParsed.Msg", [], Msg, () => [[["Item", Validated$1_$reflection(int32_type)]]]);
}

export function init() {
    return new State(Validated_createEmpty());
}

export function update(msg, state) {
    const numberInput = msg.fields[0];
    return new State(numberInput);
}

export function tryParseInt(input) {
    try {
        return Validated_success(input, parse(input, 511, false, 32));
    }
    catch (matchValue) {
        return Validated_failure(input);
    }
}

export function validatedTextColor(validated) {
    if (validated.Parsed == null) {
        return "#DC143C";
    }
    else {
        return "#008000";
    }
}

export function render(state, dispatch) {
    let elems, value_3;
    return createElement("div", createObj(ofArray([["style", {
        padding: 20,
    }], (elems = [createElement("input", createObj(ofArray([(value_3 = state.NumberInput.Raw, ["ref", (e) => {
        if (!(e == null) && !equals(e.value, value_3)) {
            e.value = value_3;
        }
    }]), ["onChange", (ev) => {
        dispatch(new Msg(tryParseInt(ev.target.value)));
    }]]))), createElement("h1", {
        style: {
            color: validatedTextColor(state.NumberInput),
        },
        children: state.NumberInput.Raw,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkSimple(init, update, render)));

//# sourceMappingURL=NumericInputsRawAndParsed.js.map
