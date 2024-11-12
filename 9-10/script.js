class Student {
    constructor(fullName, birthDate, email, enrollmentYear, course, groupNumber, grades) {
        this.fullName = fullName;
        this.birthDate = new Date(birthDate);
        this.email = email;
        this.enrollmentYear = enrollmentYear;
        this.course = course;
        this.groupNumber = groupNumber;
        this.grades = grades;
    }

    isOtl() {
        return this.grades.every(session => session.every(grade => grade === 5));
    }
}

const students = [
    new Student("Гагарина Полина Сергеевна", "2001-03-27", "gagarina.ps@mail.ru", 2019, 3, "БСБО-02-22", [[4, 5, 3], [5, 4, 5]]),
    new Student("Шаман Ярослав Дронович", "2002-05-22", "shaman.yd@yandex.ru", 2020, 2, "БСБО-01-22", [[5, 5, 5], [5, 5, 5]]),
    new Student("Бузова Ольга Игоревна", "1999-01-20", "buzova.oi@bk.ru", 2017, 5, "БСБО-02-22", [[5, 5, 5], [5, 5, 5]]),
    new Student("Баста Василий Михайлович", "2000-08-20", "basta.vm@gmail.com", 2018, 4, "БСБО-01-22", [[4, 4, 4], [5, 5, 4]]),
    new Student("Зиверт Юлия Дмитриевна", "1998-11-28", "zivert.yd@bk.ru", 2016, 5, "БСБО-03-22", [[4, 5, 4], [5, 5, 5]]),
    new Student("Нагиев Дмитрий Владимирович", "1967-04-04", "nagiev.dv@gmail.com", 1985, 5, "БСБО-01-22", [[5, 5, 4], [5, 5, 5]]),
    new Student("Харламов Гарик Юрьевич", "1983-02-28", "kharlamov.gy@yandex.ru", 2002, 5, "БСБО-02-22", [[5, 5, 5], [5, 4, 5]]),
    new Student("Мясников Михаил Владимирович", "1980-07-30", "myasnikov.mv@gmail.com", 2000, 4, "БСБО-03-22", [[5, 4, 4], [4, 5, 5]]),
    new Student("Семенюк Владимир Петрович", "1994-01-22", "semenyuk.vp@yandex.ru", 2012, 5, "БСБО-01-22", [[5, 5, 4], [3, 4, 5]]),
    new Student("Бердникова Наталья Евгеньевна", "1999-04-02", "berdnikova.ne@mail.ru", 2017, 3, "", [[5, 5, 5], [5, 5, 5]])
];

function displayAllStudents(students) {
    const list = document.getElementById("student-list");
    list.innerHTML = '';
    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.textContent = `${student.fullName} - ${student.birthDate.toLocaleDateString()} - Сессия 1: ${student.grades[0]} - Сессия 2: ${student.grades[1]}`;
        list.appendChild(listItem);
    });
}

function displayStudents(students) {
    const container = document.getElementById("students-container");
    container.innerHTML = "";

    const excellentStudents = students.filter(student => student.isOtl());
    excellentStudents.sort((a, b) => a.birthDate - b.birthDate);

    excellentStudents.forEach(student => {
        const card = document.createElement("div");
        card.classList.add("student-card");

        let gradesHTML = student.grades.map((session, index) => `
            <div class="grades">
                <h4>Сессия ${index + 1}</h4>
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


let sessionCount = 0;

function addSession() {
    if (sessionCount<=1){
        sessionCount += 1;
        const sessionContainer = document.getElementById("session-container");

        const sessionDiv = document.createElement("div");
        sessionDiv.classList.add("session");
        sessionDiv.id = `session-${sessionCount}`;
        sessionDiv.innerHTML = `<h4>Сессия ${sessionCount}</h4>`;

        for (let i = 1; i <= 3; i++) {
            const gradeInput = document.createElement("input");
            gradeInput.type = "number";
            gradeInput.min = 1;
            gradeInput.max = 5;
            gradeInput.required = true;
            gradeInput.classList.add("grade-input");
            sessionDiv.appendChild(gradeInput);
        }
        sessionContainer.appendChild(sessionDiv);
    }
}

document.getElementById("add-student-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const birthDate = document.getElementById("birthDate").value;
    const email = document.getElementById("email").value;
    const enrollmentYear = parseInt(document.getElementById("enrollmentYear").value);
    const course = document.getElementById("course").value;
    const groupNumber = document.getElementById("groupNumber").value;

    const grades = [];
    for (let i = 1; i <= sessionCount; i++) {
        const sessionDiv = document.getElementById(`session-${i}`);
        const sessionGrades = Array.from(sessionDiv.getElementsByClassName("grade-input"))
            .map(input => parseInt(input.value));
        grades.push(sessionGrades);
    }

    const newStudent = new Student(fullName, birthDate, email, enrollmentYear, course, groupNumber, grades);
    students.push(newStudent);

    displayAllStudents(students);
    displayStudents(students.filter(student => student.isOtl()));

    document.getElementById("add-student-form").reset();
    sessionContainer.innerHTML = "";
    sessionCount = 0;
});

displayAllStudents(students);
displayStudents(students.filter(student => student.isOtl()));


