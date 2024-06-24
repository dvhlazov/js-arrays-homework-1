document.addEventListener('DOMContentLoaded', () => {      // Об'єкт
    const form = document.getElementById('student_list');
    const inputError = document.getElementById('input_eror');
    const tableBody = document.querySelector('.sheetlist table tbody');
    const btnSort = document.querySelectorAll('.btn-sort');
    let sortBool = true; // Для сортування

    let formDataArray = [];      // Масив
                   

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
            
            updateTable(formDataArray);

           
        
        }
    });
    

    

    let updateTable = (formDataArray) => {
        // Очистка таблиці
        tableBody.innerHTML = '';
    
        // Створення заголовків таблиці з кнопками сортування
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>N# </th>
            <th>Ім'я <button class="btn-sort" data-sort-by="name"><i class="fa-solid fa-sort"></i></button></th>
            <th>Прізвище <button class="btn-sort" data-sort-by="surname"><i class="fa-solid fa-sort"></i></button></th>
            <th>Кількість балів <button class="btn-sort" data-sort-by="score"><i class="fa-solid fa-sort"></i></button></th>
        `;
        tableBody.appendChild(headerRow);
    
        // Створення рядків даних
        formDataArray.forEach((formData, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${formData.name}</td>
                <td>${formData.surname}</td>
                <td>${formData.score}</td>
            `;
            if (formData.score < 77) {
                newRow.classList.add('style_no');
            }
            tableBody.appendChild(newRow);
            
        });
    
        applyTableStyling();  // включення події сортування та застосування кнопок до останнього новоствореного рядка
    };
    
    let applyTableStyling = () => {
        // Оновлення обробників подій для кнопок сортування
        const btnSort = document.querySelectorAll('.btn-sort');
        btnSort.forEach(btn => {
            btn.addEventListener('click', () => {
                const sortBy = btn.getAttribute('data-sort-by');
    
                if (sortBool) {
                    if (sortBy === 'name') {
                        formDataArray.sort((a, b) => a.name.localeCompare(b.name));
                    } else if (sortBy === 'surname') {
                        formDataArray.sort((a, b) => a.surname.localeCompare(b.surname));
                    } else if (sortBy === 'score') {
                        formDataArray.sort((a, b) => a.score - b.score);
                    }
                } else {
                    if (sortBy === 'name') {
                        formDataArray.sort((a, b) => b.name.localeCompare(a.name));
                    } else if (sortBy === 'surname') {
                        formDataArray.sort((a, b) => b.surname.localeCompare(a.surname));
                    } else if (sortBy === 'score') {
                        formDataArray.sort((a, b) => b.score - a.score);
                    }
                }
    
                sortBool = !sortBool;
                updateTable(formDataArray);
            });
        });
    };
    
    
    updateTable(formDataArray);
});





