class Student {
    constructor(fullName, birthDate, email, enrollmentYear, course, groupNumber, grades) {
        this.fullName = fullName;  // ФИО
        this.birthDate = new Date(birthDate);  // Дата рождения
        this.email = email;  // Email
        this.enrollmentYear = enrollmentYear;  // Год поступления
        this.course = course;  // Курс
        this.groupNumber = groupNumber;  // Номер группы
        this.grades = grades;  // Результаты аттестаций
    }

    // Метод для проверки, является ли студент отличником
    isExcellent() {
        return this.grades.every(session => session.every(grade => grade === 5));
    }
}

// Создаем массив студентов
const students = [
    new Student("Гагарина Полина Сергеевна", "2001-03-27", "gagarina.ps@mail.ru", 2019, 3, "БСБО-02-22", [[4, 5, 3], [5, 4, 5], [3, 4, 4]]),
    new Student("Шаман Ярослав Дронович", "2002-05-22", "shaman.yd@yandex.ru", 2020, 2, "БСБО-01-22", [[5, 5, 5], [5, 5, 5], [5, 5, 5]]),
    new Student("Бузова Ольга Игоревна", "1999-01-20", "buzova.oi@bk.ru", 2017, 5, "БСБО-02-22", [[5, 5, 5], [5, 5, 5], [5, 5, 5]]),
    new Student("Баста Василий Михайлович", "2000-08-20", "basta.vm@gmail.com", 2018, 4, "БСБО-01-22", [[4, 4, 4], [5, 5, 4], [4, 4, 5]]),
    new Student("Зиверт Юлия Дмитриевна", "1998-11-28", "zivert.yd@bk.ru", 2016, 5, "БСБО-03-22", [[4, 5, 4], [5, 5, 5], [4, 4, 5]]),
    new Student("Нагиев Дмитрий Владимирович", "1967-04-04", "nagiev.dv@gmail.com", 1985, 5, "БСБО-01-22", [[5, 5, 4], [5, 5, 5], [5, 4, 5]]),
    new Student("Харламов Гарик Юрьевич", "1983-02-28", "kharlamov.gy@yandex.ru", 2002, 5, "БСБО-02-22", [[5, 5, 5], [5, 4, 5], [5, 5, 4]]),
    new Student("Мясников Михаил Владимирович", "1980-07-30", "myasnikov.mv@gmail.com", 2000, 4, "БСБО-03-22", [[5, 4, 4], [4, 5, 5], [5, 4, 5]]),
    new Student("Семенюк Владимир Петрович", "1994-01-22", "semenyuk.vp@yandex.ru", 2012, 5, "БСБО-01-22", [[5, 5, 4], [3, 4, 5], [5, 5, 5]]),
    new Student("Бердникова Наталья Евгеньевна", "1999-04-02", "berdnikova.ne@mail.ru", 2017, 3, "", [[5, 5, 5], [5, 5, 5], [5, 5, 5]])
];

// Отображаем всех студентов в виде списка
function displayAllStudents(students) {
    const list = document.getElementById("student-list");
    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.textContent = `${student.fullName} - ${student.birthDate.toLocaleDateString()} - Session 1: ${student.grades[0]} - Session 2: ${student.grades[1]} - Session 2: ${student.grades[2]}`;
        list.appendChild(listItem);
    });
}

// Фильтруем отличников и сортируем по дате рождения
const excellentStudents = students
    .filter(student => student.isExcellent())
    .sort((a, b) => a.birthDate - b.birthDate);

// Функция для добавления карточек студентов на страницу
function displayStudents(students) {
    const container = document.getElementById("students-container");
    container.innerHTML = ""; // Очищаем контейнер

    students.forEach(student => {
        const card = document.createElement("div");
        card.classList.add("student-card");

        let gradesHTML = student.grades.map((session, index) => `
            <div class="grades">
                <h4>Session ${index + 1}</h4>
                <ul>
                    ${session.map(grade => `<li>${grade}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        card.innerHTML = `
            <h3 class="student-name">${student.fullName}</h3>
            <p class="student-info">Дата рождения: ${student.birthDate.toLocaleDateString()}</p>
            <p class="student-info">Email: ${student.email}</p>
            <p class="student-info">Год поступления: ${student.enrollmentYear}</p>
            <p class="student-info">Курс: ${student.course}</p>
            <p class="student-info">Номер группы: ${student.groupNumber}</p>
            ${gradesHTML}
        `;
        container.appendChild(card);
    });
}

// Выводим список всех студентов и отличников
displayAllStudents(students);
displayStudents(excellentStudents);
