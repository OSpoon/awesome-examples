import 'colors';
import path from 'path';
import fs from 'fs';
import { diffChars } from "diff";

const leftCode = fs.readFileSync(path.resolve(__dirname, "./actual.ts")).toString();
const rightCode = fs.readFileSync(path.resolve(__dirname, "./expected.ts")).toString();

const diff = diffChars(leftCode, rightCode);

console.log('green for additions, red for deletions');
console.log('grey for common parts');
console.log();
diff.forEach((part) => {
    const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
    process.stderr.write(part.value[color]);
});
console.log();