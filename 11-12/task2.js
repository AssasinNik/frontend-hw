const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const inputFilePath = path.join(__dirname, 'Requests2.txt');
const outputFilePath1 = path.join(__dirname, 'АнализRequests.txt');
const templateFilePath = path.join(__dirname, 'template.ejs');
const outputFilePath = path.join(__dirname, 'ResultsRequests.html');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    const lines = data.split('\n').filter(line => line.trim() !== '');

    let notFoundCount = 0;
    const notFoundEntries = [];
    const notFoundLines = [];

    let postCount = 0;
    const postEntries = [];
    const postLines = [];

    const userAgentMap = new Map();


    const logRegex = /\[([^\]]+)\]\s"(\w+)\s([^"]+)"\s(\d{3})\s(\d+)\s"([^"]*)"\s"([^"]*)"/;

    lines.forEach((line, index) => {
        const match = line.match(logRegex);
        if (match) {
            const [
                ,
                datetime,
                method,
                url,
                statusCode,
                size,
                referrer,
                userAgent
            ] = match;


            if (statusCode === '404') {
                notFoundCount += 1;
                notFoundEntries.push({
                    datetime,
                    method,
                    url,
                    statusCode,
                    size,
                    referrer,
                    userAgent
                });
                notFoundLines.push(line);
            }


            if (method.toUpperCase() === 'POST') {
                postCount += 1;
                postEntries.push({
                    datetime,
                    method,
                    url,
                    statusCode,
                    size,
                    referrer,
                    userAgent
                });
                postLines.push(line);
            }

            if (userAgentMap.has(userAgent)) {
                userAgentMap.set(userAgent, userAgentMap.get(userAgent) + 1);
            } else {
                userAgentMap.set(userAgent, 1);
            }
        } else {
            console.warn(`Строка ${index + 1} не соответствует ожидаемому формату: ${line}`);
        }
    });


    const templateData = {
        notFoundCount,
        notFoundEntries,
        userAgents: Array.from(userAgentMap.entries()).map(([ua, count]) => ({ ua, count })),
        userAgentCount: userAgentMap.size,
        postCount,
        postEntries
    };


    let result = '';


    result += '404:\n';
    result += `${notFoundCount}\n`;
    notFoundLines.forEach(line => {
        result += `${line}\n`;
    });
    result += '\n';


    result += 'User-Agent:\n';
    result += `${userAgentMap.size}\n`;
    userAgentMap.forEach((count, ua) => {
        result += `${count} - ${ua}\n`;
    });
    result += '\n';


    result += 'POST:\n';
    result += `${postCount}\n`;
    postLines.forEach(line => {
        result += `${line}\n`;
    });
    result += '\n';



    fs.writeFile(outputFilePath1, result, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка при записи файла:', err);
            return;
        }
        console.log('Результаты успешно записаны в', outputFilePath1);
    });


    fs.readFile(templateFilePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Ошибка при чтении шаблона:', err);
            return;
        }


        const html = ejs.render(template, templateData);


        fs.writeFile(outputFilePath, html, 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи HTML файла:', err);
                return;
            }
            console.log('Результаты успешно записаны в', outputFilePath);
        });
    });
});
