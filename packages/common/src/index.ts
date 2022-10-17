import handler from 'serve-handler';
import http from 'http';
import open from 'open';
import child_process from 'child_process';

export const startServer = () => {
    const server = http.createServer((request: any, response: any) => handler(request, response));

    server.listen(3000, () => {
        open("http://localhost:3000");
        console.log('Running at http://localhost:3000');
    });
}

export const openBrowser = (root: string) => {
    child_process.exec(root);
}