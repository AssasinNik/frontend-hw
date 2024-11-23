const fs = require('fs');
const path = require('path');
const ejs = require('ejs');


const inputFilePath = path.join(__dirname, 'МИРЭА.txt');
const outputFilePath = path.join(__dirname, 'АнализМИРЭА.txt');

const outputFilePath1 = path.join(__dirname, 'ResultsMirea.html');

const templateFilePath = path.join(__dirname, 'template1.ejs');


fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    const yearRegex = /(?<![\w-])\b(1[5-9]\d{2}|20[0-4]\d|2050)\b(?!\+)/g;
    const sourceLinkRegex = /\[\d+(-\d+)?\]/g;
    const moneyRegex = /\b\d{1,3}(?:\s\d{3})*(?:\.\d{2})?\s?(?:руб(?:\.|ля|лей|лями)?)/gi;


    const getUniqueCounts = (matches) => {
        const counts = {};
        matches.forEach(match => {
            const key = match.trim();
            counts[key] = (counts[key] || 0) + 1;
        });
        return counts;
    };


    const years = data.match(yearRegex) || [];
    const sourceLinks = data.match(sourceLinkRegex) || [];
    const moneySums = data.match(moneyRegex) || [];


    const uniqueYears = getUniqueCounts(years);
    const uniqueSourceLinks = getUniqueCounts(sourceLinks);
    const uniqueMoneySums = getUniqueCounts(moneySums);


    let outputContent = `Года:
Общее количество: ${years.length}
Уникальные значения и количество:
`;

    for (const [year, count] of Object.entries(uniqueYears)) {
        outputContent += `${year} - ${count}\n`;
    }

    outputContent += `\nСсылки:
Общее количество: ${sourceLinks.length}
Уникальные значения и количество:
`;

    for (const [link, count] of Object.entries(uniqueSourceLinks)) {
        outputContent += `${link} - ${count}\n`;
    }

    outputContent += `\nДенежные суммы:
Общее количество: ${moneySums.length}
Уникальные значения и количество:
`;

    for (const [sum, count] of Object.entries(uniqueMoneySums)) {
        outputContent += `${sum} - ${count}\n`;
    }

    const templateData = {
        yearsCount: years.length,
        uniqueYears: Object.entries(uniqueYears).map(([year, count]) => ({ year, count })),
        sourceLinksCount: sourceLinks.length,
        uniqueSourceLinks: Object.entries(uniqueSourceLinks).map(([link, count]) => ({ link, count })),
        moneySumsCount: moneySums.length,
        uniqueMoneySums: Object.entries(uniqueMoneySums).map(([sum, count]) => ({ sum, count }))
    };



    fs.writeFile(outputFilePath, outputContent, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка при записи файла:', err);
            return;
        }
        console.log('Анализ завершен. Результаты записаны в файл "АнализМИРЭА.txt".');
    });


    fs.readFile(templateFilePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Ошибка при чтении шаблона:', err);
            return;
        }


        const html = ejs.render(template, templateData);


        fs.writeFile(outputFilePath1, html, 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи HTML файла:', err);
                return;
            }
            console.log('Результаты успешно записаны в', outputFilePath1);
        });
    });
});
