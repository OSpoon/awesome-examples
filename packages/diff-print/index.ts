import { Change, diffChars } from "diff";
import { log } from "console";

const _color = (input: string, style = 1, color = 92) => {
    return `\x1b[7;${color};${style};1m${input}\x1b[0m`;
};

const _print = (diff: Change[]) => {
    log(_color("PS：", 0, 100));
    log(_color(" Red for additions, Yellow for deletions", 0, 100));
    log(_color("------------start-------------", 0, 100));
    let parts = "";
    diff &&
        diff.forEach((part) => {
            parts += _color(
                part.value,
                part.removed ? 9 : 1,
                part.added ? 91 : part.removed ? 93 : 92
            );
        });
    log(parts);
    log(_color("-------------over-------------", 0, 100));
};

export default function (oldStr: string, newStr: string) {
    const diff = diffChars(oldStr, newStr);
    diff.length !== 1 && _print(diff);
    return diff.length === 1;
}

