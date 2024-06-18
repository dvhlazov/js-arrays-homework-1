document.addEventListener('DOMContentLoaded', () => {      // Об'єкт
    const form = document.getElementById('student_list');
    const inputError = document.getElementById('input_eror');
    const tableBody = document.querySelector('.sheetlist table tbody');

    let formDataArray = [];      // Массив
                   

    form.addEventListener('submit', (event) => {    // отримання значеннь  з інпутів
        event.preventDefault(); 

        const inputName = document.getElementById('student_name').value;
        const inputSurname = document.getElementById('student_surname').value;
        const inputScore = parseInt(document.getElementById('student_score').value, 10);

        let ukrainianValidation = /^[А-ЩЬЮЯЄІЇҐ][а-щьюяєіїґ]*$/;  // Валідація спецсимволів та мови
        let valid = true;

                                                                    // Перевірка форми перед відправленням
        if (!ukrainianValidation.test(inputName) || !ukrainianValidation.test(inputSurname)) {
            valid = false;
            inputError.classList.add('style_no');
            inputError.textContent = "Ім'я та Прізвище мають бути написані тільки українською. З великої літери";
        } else if (isNaN(inputScore) || inputScore < 0 || inputScore > 100) {
            valid = false;
            inputError.classList.add('style_no');
            inputError.textContent = "Числове значення має бути від 0 до 100";
        } 

        if (!valid) {
            event.preventDefault();
        } else {
            inputError.classList.remove('style_no');
            inputError.textContent = "";

            document.getElementById('student_name').value = '';
            document.getElementById('student_surname').value = '';
            document.getElementById('student_score').value = '';


            const formData = {  // Обробка массиву
                name: inputName,
                surname: inputSurname,
                score: inputScore
            };          
            formDataArray.push(formData);
            formDataArray.sort((a, b) => b.score - a.score); //Сортування від найбільшого значення до найменшого
            updateTable(formDataArray);
        }
    });

    
   let updateTable = (formDataArray) => {  // Оновлення та зміна даних в массиві нових даних і додавання  їх в ХТМЛ
        
        tableBody.innerHTML = `
        <th>N#</th>
        <th>Ім'я</th>
        <th>Прізвище</th>
        <th>Кількість балів</th>
        `;

        formDataArray.forEach((formData, index) => { // Створення в масиві нового рядку;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${formData.name}</td>
                <td>${formData.surname}</td>
                <td>${formData.score}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }
});