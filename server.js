const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`Получен запрос: ${req.method} ${req.url}`);

    // Обработка корневого URL
    let filePath = req.url === '/' ? './index.html' : '.' + req.url;

    // Получаем расширение файла
    const extname = path.extname(filePath);
    
    // Определяем MIME-тип
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Читаем файл
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.error(`Файл не найден: ${filePath}`);
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                console.error(`Ошибка при чтении файла ${filePath}:`, error);
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            console.log(`Отправка файла: ${filePath} (${contentType})`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 