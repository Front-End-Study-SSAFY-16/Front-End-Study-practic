document.addEventListener('DOMContentLoaded', function () {
    function makeCalendar() {
        var calendarContainer = document.getElementById("calendar");
        var currentDate = new Date();
    
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
    
        var calendar = `<h2>${year}년 ${month + 1}월</h2>`;
        calendar += `<table>`;
        calendar += `<tr>`;
        
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        for (let day of daysOfWeek) {
            calendar += `<th>${day}</th>`;
        }
    
        calendar += `</tr>`;
    
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
    
        let dayCount = 1;
    
        for (let i = 0; i < 6; i++) {
            calendar += `<tr>`;
    
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    calendar += `<td></td>`;
                } else if (dayCount > totalDaysInMonth) {
                    calendar += `<td></td>`;
                } else {
                    calendar += `<td class="calendar-day" data-date="${year}-${month + 1}-${dayCount}">${dayCount}</td>`;
                    dayCount++;
                }
            }
    
            calendar += `</tr>`;
    
            if (dayCount > totalDaysInMonth) {
                break;
            }
        }
    
        calendar += `</table>`;
    
        calendarContainer.innerHTML = calendar;

        var days = document.querySelectorAll(".calendar-day");
        days.forEach(function(day) {
            day.addEventListener("click", function() {
                days.forEach(d => d.classList.remove("selected"));

                this.classList.add("selected");

                const selectedDate = this.getAttribute('data-date');
                console.log("선택된 날짜: ", selectedDate);
                selectDate(selectedDate);
            });
        });
    }
    

    makeCalendar();

    const todoListContainer = document.getElementById('todo-list');
    const selectedDateHeading = document.getElementById('current-date');
    const addTodoButton = document.getElementById('add-todo-button');
    const todoInput = document.getElementById('todo-input');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    selectedDateHeading.textContent = formattedDate;
    let todos = JSON.parse(localStorage.getItem('todos')) || {};

    let selectedDate = formattedDate;

    function selectDate(date) {
        selectedDate = date;
        selectedDateHeading.textContent = `${date}`;
        loadTodoList(date);
    }

    function loadTodoList(date) {
        todoListContainer.innerHTML = '';

        if (todos[date]) {
            todos[date].forEach((todo, index) => {
                const li = document.createElement('li');
                li.textContent = todo;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.onclick = () => removeTodoItem(date, index);
                li.appendChild(deleteButton);

                todoListContainer.appendChild(li);
            });
        }
    }

    addTodoButton.addEventListener('click', function() {
        if (!selectedDate) {
            alert("날짜를 먼저 선택하세요.");
            return;
        }

        const todo = todoInput.value.trim();
        if (!todo) return;

        if (!todos[selectedDate]) {
            todos[selectedDate] = [];
        }

        todos[selectedDate].push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        loadTodoList(selectedDate);
    });

    function removeTodoItem(date, index) {
        todos[date].splice(index, 1);
        if (todos[date].length === 0) {
            delete todos[date];
        }
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodoList(date);
    }
});
