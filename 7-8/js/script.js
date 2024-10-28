const employeeList = [];

function Sotrudnik(name, salary, effektivnost) {
    this.name = name;
    this.salary = salary;
    this.effektivnost = effektivnost;

    this.salaryEffectiv = function () {
        return this.salary / this.effektivnost;
    };

    this.showInfo = function () {
        console.log(`Имя: ${this.name}, Зарплата: ${this.salary}, Эффективность: ${this.effektivnost}`);
    };
}

document.getElementById('add-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const salary = parseFloat(document.getElementById('salary').value);
    const effektivnost = parseFloat(document.getElementById('efficiency').value);

    if (name && !isNaN(salary) && !isNaN(effektivnost)) {
        let sotrudnik = new Sotrudnik(name, salary, effektivnost);
        sotrudnik = Object.freeze(sotrudnik);
        employeeList.push(sotrudnik);
        updateEmployeeList();
        calculateEffect();
        document.getElementById('name').value = '';
        document.getElementById('salary').value = '';
        document.getElementById('efficiency').value = '';
    } else {
        alert("Заполните все поля корректно.");
    }
});

function updateEmployeeList() {
    const container = document.getElementById('employee-container');
    container.innerHTML = '';

    employeeList.forEach((sotrudnik, index) => {
        const card = document.createElement('div');
        card.className = 'employee-card';

        sotrudnik.showInfo();

        card.innerHTML = `
            <h3>${sotrudnik.name}</h3>
            <p class="salary">Зарплата: ${sotrudnik.salary}</p>
            <p class="efficiency">Эффективность: ${sotrudnik.effektivnost}</p>
            <span class="delete-icon" onclick="removeEmployee(${index})">
                <img src="https://img.icons8.com/ios-glyphs/30/ff6b6b/delete-sign.png" alt="Удалить" />
            </span>
        `;

        container.appendChild(card);
    });
}

function removeEmployee(index) {
    employeeList.splice(index, 1);
    updateEmployeeList();
    calculateEffect();
}

function calculateEffect() {
    if (employeeList.length === 0) {
        document.getElementById('min-efficiency').textContent = '';
        document.getElementById('max-efficiency').textContent = '';
        return;
    }

    let minSotrudnik = employeeList[0];
    let maxSotrudnik = employeeList[0];

    employeeList.forEach(sotrudnik => {
        const ratio = sotrudnik.salaryEffectiv();
        if (ratio < minSotrudnik.salaryEffectiv()) minSotrudnik = sotrudnik;
        if (ratio > maxSotrudnik.salaryEffectiv()) maxSotrudnik = sotrudnik;
    });

    document.getElementById('min-efficiency').textContent = `Минимальное соотношение Зарплата/Эффективность: ${minSotrudnik.name}`;
    document.getElementById('max-efficiency').textContent = `Максимальное соотношение Зарплата/Эффективность: ${maxSotrudnik.name}`;
}
