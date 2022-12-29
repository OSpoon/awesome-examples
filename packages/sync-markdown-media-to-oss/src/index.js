import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import OSS from 'ali-oss';
import pc from "picocolors";

const root = process.cwd();

const queryMediaPath = (content) => {
    const set = new Set();
    const regex = /!\[.*\]\((.*)\)/gm;
    let m;

    while ((m = regex.exec(content)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) set.add(match);
        });
    }
    return set;
}

const downloadMedia = async (url) => {
    const temp = path.parse(`/.async-temp${new URL(url).pathname}`)
    const outpath = temp.dir;
    const filename = temp.base;
    fs.ensureDirSync(path.resolve(root, `.${outpath}`));
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(path.resolve(root, `.${outpath}/${filename}`), data);
    return { url, temp: `.${outpath}/${filename}` };
}

async function putToOSS(client, name, file) {
    const result = await client.put(name, path.normalize(file));
    return result.url;
}

const write = (filename, content) => {
    fs.ensureDirSync(path.resolve(root, './dist'));
    fs.writeFileSync(path.resolve(root, `./dist/${filename}`), content, { encoding: 'utf-8' });
    console.info(`INFO：${pc.green('媒体资源同步完成，请查看~')}`);
}

async function syncMedia(filename) {
    console.log(path.resolve(root, `./${filename}`));
    if (!fs.existsSync(path.resolve(root, `./${filename}`))) {
        console.error(`INFO：${pc.green('当前目录未能找到这篇文章~')}`);
        process.exit(1);
    }
    let content = fs.readFileSync(path.resolve(root, filename), { encoding: 'utf-8' });
    const client = new OSS({
        region: '',
        bucket: '',
        accessKeyId: '',
        accessKeySecret: '',
    });
    const urls = queryMediaPath(content).values();
    for (let url of urls) {
        const { url: _orgUrl, temp } = await downloadMedia(url);
        const result = await putToOSS(client, new URL(_orgUrl).pathname, temp);
        content = content.replace(_orgUrl, result);
    }
    write(filename, content);
}

export {
    syncMedia
}