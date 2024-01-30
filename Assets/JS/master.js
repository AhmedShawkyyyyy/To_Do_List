let siInputs = document.querySelectorAll(".section-1 .form-control");
let siDate = document.querySelectorAll("#datetime-local ");
let btnAdd = document.querySelectorAll(".add");
let showTasks = document.querySelector("table tbody");
let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(siInputs);
console.log(siDate);
console.log(btnAdd);
console.log(showTasks);
console.log(tasksArr);
document.querySelectorAll("button");

// CRUD////////

// Create Function///

function AddTask() {
  let valid = true;
  for (let i = 0; i < siInputs.length; i++) {
    if (siInputs[i].value == "") {
      valid = false;
    }
  }
  for (let d = 0; d < siDate.length; d++) {
    if (siDate[d].value == "") {
      valid = false;
    }
  }
  if (valid) {
    let task = {
      task: siInputs[0].value,
      date: siDate[0].value,
    };
    tasksArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    printTask();
    ClearInputs();

    // updateCounters();
    // ==============updatecounter function=============//
    totalCounter.textContent = `${totalTasks}`;
    checkedCounter.textContent = ` ${checkedTasks}`;
    uncheckedCounter.textContent = ` ${uncheckedTasks}`;
    console.log(tasksArr);
  } else {
    //===============alert function ====================//
    const alertBox = document.querySelector(".warning");
    const body = document.body - alertBox;
    const overlay = document.getElementById("overlay");
    console.log(overlay);
    console.log(body);
    alertBox.style.display = "block";
    overlay.style.display = "block";
    alertBox.style.opacity = 1;

    const disabledElements = [siInputs, siDate];
    for (const element of disabledElements) {
      element.disabled = true;
    }
    overlay.style.opacity = 0.7;
    alertBox.addEventListener("click", () => {
      for (const element of disabledElements) {
        element.disabled = false;
      }
      overlay.style.display = "none";
      alertBox.style.display = "none";
    });
  }
}
// Read Function///
function printTask() {
  showTasks.innerHTML = "";
  tasksArr.forEach((element, index) => {
    showTasks.innerHTML += `
    <tbody id="tasks">
            <tr>
                <th scope="row">${index + 1}</th>
                <td class="unCompleted" id="data">${element.task}</td>
                <td class="unCompleted" id="date">${element.date}</td>
                <td><button onclick="editTask(${index})"class="btn btn-primary">Update</button></td>
                <td><input  class="form-check-input  mt-0" type="checkbox" value=""
                        aria-label="Checkbox for following text input"></td>
                <td><button onclick="deleteTask(${index})" type="button" class="btn btn-warning">Delete</button></td>
                   
                </tr>
      </tbody>
    `;
  });
  let checkbox = document.querySelectorAll(
    "table tbody tr  .form-check-input "
  );
  let taskData = document.querySelectorAll("#data");
  let taskDate = document.querySelectorAll("#date");
  let isChecked = checkbox.checked;
  console.log(checkbox);
  console.log(taskData);
  console.log(taskDate);

  checkbox.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let taskRow = checkbox.closest("tr");
      let taskIndex = taskRow.rowIndex - 1;

      let taskElement = taskData[taskIndex];
      let dateElement = taskDate[taskIndex];

      if (checkbox.checked) {
        taskElement.classList.replace("unCompleted", "completed");
        dateElement.classList.replace("unCompleted", "completed");
      } else {
        taskElement.classList.replace("completed", "unCompleted");
        dateElement.classList.replace("completed", "unCompleted");
      }
    });
  });
  function updateCounters() {
    let totalCounter = document.querySelector("#total");
    let checkedCounter = document.querySelector("#checked");
    let uncheckedCounter = document.querySelector("#unChecked");

    console.log(totalCounter);
    console.log(checkedCounter);
    console.log(uncheckedCounter);

    const totalTasks = document.querySelectorAll("table tbody tr").length;
    console.log(totalTasks);
    let checkedTasks = 0;
    let uncheckedTasks = 0;

    document
      .querySelectorAll("table tbody tr .form-check-input")
      .forEach((checkbox) => {
        if (checkbox.checked) {
          checkedTasks++;
        } else {
          uncheckedTasks++;
        }
      });
    console.log("Total tasks:", totalTasks);
    console.log("Checked tasks:", checkedTasks);
    console.log("Unchecked tasks:", uncheckedTasks);

    totalCounter.textContent = `${totalTasks}`;
    checkedCounter.textContent = ` ${checkedTasks}`;
    uncheckedCounter.textContent = ` ${uncheckedTasks}`;
  }

  // Call printTask to initially display tasks and update counters
  updateCounters();
  checkbox.forEach((checkbox) => {
    checkbox.addEventListener("change", updateCounters); // Update counters when checkbox state changes
  });
}

// Edit Function///
function editTask(index) {
  let task = tasksArr[index];
  siInputs[0].value = task.task;
  siDate[0].value = task.date;
  btnAdd[0].innerText = "update";
  btnAdd[0].classList.replace("add", "update");
  btnAdd[0].setAttribute("onclick", `updateTask(${index})`);
}

function updateTask(index) {
  let valid = true;
  for (let i = 0; i < siInputs.length; i++) {
    if (siInputs[i].value == "") {
      valid = false;
    }
  }
  for (let d = 0; d < siDate.length; d++) {
    if (siDate[d].value == "") {
      valid = false;
    }
  }
  if (valid) {
    let task = {
      task: siInputs[0].value,
      date: siDate[0].value,
    };
    tasksArr[index] = task;
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    btnAdd[0].innerHTML = "Add";
    btnAdd[0].classList.replace("update", "add");
    btnAdd[0].setAttribute("onclick", `addTask(${index})`);
    printTask();
    ClearInputs();
    updateCounters();
  } else {
    const alertBox = document.querySelector(".warning");
    const body = document.body - alertBox;
    const overlay = document.getElementById("overlay");
    console.log(overlay);
    console.log(body);
    alertBox.style.display = "block";
    overlay.style.display = "block";
    alertBox.style.opacity = 1;

    const disabledElements = [siInputs, siDate];
    for (const element of disabledElements) {
      element.disabled = true;
    }
    overlay.style.opacity = 0.7;
    alertBox.addEventListener("click", () => {
      for (const element of disabledElements) {
        element.disabled = false;
      }
      overlay.style.display = "none";
      alertBox.style.display = "none";
    });
  }
}

// Delete Function///

function deleteTask(index) {
  tasksArr.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  printTask();
}

// Auto Clear Function///
function ClearInputs() {
  for (let i = 0; i < siInputs.length; i++) {
    siInputs[i].value = "";
  }
  for (let d = 0; d < siDate.length; d++) {
    siDate[d].value = "";
  }
}
// updateCounters();
printTask();
