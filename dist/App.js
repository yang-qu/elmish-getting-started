import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, record_type, int32_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { createElement } from "react";
import { ofArray } from "./fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class State extends Record {
    constructor(Count) {
        super();
        this.Count = (Count | 0);
    }
}

export function State_$reflection() {
    return record_type("App.State", [], State, () => [["Count", int32_type]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Increment", "Decrement"];
    }
}

export function Msg_$reflection() {
    return union_type("App.Msg", [], Msg, () => [[], []]);
}

export function init() {
    return new State(0);
}

export function update(msg, state) {
    if (msg.tag === 1) {
        return new State(state.Count - 1);
    }
    else {
        return new State(state.Count + 1);
    }
}

export function render(state, dispatch) {
    const headerText = ((state.Count % 2) === 0) ? "Count is even" : "Count is odd";
    const oddOrEvenMessage = createElement("h1", {
        children: [headerText],
    });
    if (state.Count < 0) {
        const children = ofArray([createElement("button", {
            onClick: (_arg) => {
                dispatch(new Msg(0, []));
            },
            children: "+",
        }), createElement("div", {
            children: [state.Count],
        }), createElement("button", {
            onClick: (_arg_1) => {
                dispatch(new Msg(1, []));
            },
            children: "-",
        })]);
        return createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }
    else {
        const children_2 = ofArray([createElement("button", {
            onClick: (_arg_2) => {
                dispatch(new Msg(0, []));
            },
            children: "+",
        }), createElement("div", {
            children: [state.Count],
        }), createElement("button", {
            onClick: (_arg_3) => {
                dispatch(new Msg(1, []));
            },
            children: "-",
        }), oddOrEvenMessage]);
        return createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        });
    }
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkSimple(init, update, render)));

//# sourceMappingURL=App.js.map
