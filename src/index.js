import './style.css'

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.todoList = new TodoList();
    }
    getTodoList() {
        return this.todoList
    }

}
class TodoItem {
    #title
    #description
    #dueDate
    #priority;
    #notes;
    #isCompleted;
    #expectedTime;
    parentName
    constructor(title = "//", description = "//", dueDate = "//", priority = "3", notes = "none", isCompleted = false, expectedTime = "none") {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#notes = notes;
        this.#isCompleted = isCompleted;
        this.#expectedTime = expectedTime;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    //setters

    setTitle(title) {
        this.#title = title;
    }
    setDescription(description) {
        this.#description = description;
    }
    setDueDate(dueDate) {
        this.#dueDate = dueDate;
    }
    setPriority(priority) {
        this.#priority = priority;
    }
    setNotes(notes) {
        this.#notes = notes
    }
    setIsComplete(isCompleted) {
        this.#isCompleted = isCompleted;
    }
    setExpectedTime(expectedTime) {
        this.#expectedTime = expectedTime;
    }

    //getters

    getTitle() {
        return this.#title;
    }
    getDescription() {
        return this.#description
    }
    getDueDate() {
        return this.#dueDate
    }
    getPriority() {
        return this.#priority
    }
    getNotes() {
        return this.#notes
    }
    getIsComplete() {
        return this.#isCompleted
    }
    getExpectedTime() {
        return this.#expectedTime
    }
}

class TodoProject {
    #todoItems;
    #progress;
    #name;
    constructor(name) {
        this.#todoItems = [];
        this.#name = name;
        this.updateProgress();
    }
    addItem(todoItem) {
        this.#todoItems.push(todoItem);
        this.updateProgress();
        todoItem.parentName = this.getName();
    }
    removeItem(index) {
        this.#todoItems.splice(index, 1);
        this.updateProgress();

    }
    getIncompleteItems() {
        return this.#todoItems.filter((e) => {
            if (e.getIsComplete() == false) {
                return true;
            }
        })
    }
    getCompleteItems() {
        return this.#todoItems.filter((e) => {
            if (e.getIsComplete() == true) {
                return true;
            }
        })
    }
    updateProgress() {
        if (this.getTodoItems().length > 0) {
            this.#progress = (this.getCompleteItems().length / this.#todoItems.length) * 100
        } else {
            this.#progress = 0;
        }
    }

    //setters

    setProgress(progress) {
        this.#progress = progress;
    }
    setName(name) {
        this.#name = name;
    }
    setTodoItems(todoItems) {
        this.#todoItems = todoItems
    }


    //getters
    getTodoItems() {
        return this.#todoItems
    }
    getProgress() {
        return this.#progress
    }
    getName() {
        return this.#name
    }

}
class TodoList {
    #projects
    #progress
    constructor() {
        this.#projects = [];
        this.updateProgress()
    }
    addProject(project) {
        this.#projects.push(project)
        this.updateProgress()
    }
    removeProject(index) {
        this.#projects.splice(index, 1)
        this.updateProgress()
    }
    updateProgress() {
        if (this.getAllItems().length > 0) {
            const numberOfCompleteItems = this.getAllItems().filter(e => {
                if (e.getIsComplete() == true) {
                    return true
                }
            }).length;
            this.#progress = (numberOfCompleteItems / this.getAllItems().length) * 100
        } else {
            this.#progress = 0;
        }
    }
    getAllItems() {
        const allItems = [];
        this.#projects.forEach(e => {
            e.getTodoItems().forEach(b => {
                allItems.push(b)
            })
        })
        return allItems
    }
    getProjectItems(project) {
        return project.getTodoItems();
    }
    getProjectByTitle(title) {
        this.getProjects().forEach(e => {
            if (e.title == title) {
                return e;
            } else {
                return;
            }
        })
    }

    searchForItem() {
        const searchInput = document.querySelector(".search-input")
        let title = searchInput.value;
        searchInput.value = "";
        const all = this.getAllItems();
        console.log(all)
        let p = new UserGraphicInterface();

        const arr = []
        all.forEach(e => {
            if (e.getTitle() === title) {
                arr.push(e);
            }
        })
            
            for (let i = 0; i < arr.length; i++) {
                p.printItemInContainer(arr[i]);
            }

        // else {
        //     p.main.innerHTML=""
        //     p.printSearch();
        //     const warningMessage = document.createElement("h4")
        //     warningMessage.classList.add("warm");
        //     warningMessage.textContent = "No equivalent result"
        //     p.main.appendChild(warningMessage);
        // }
    }

    setProjects(projects) {
        this.#projects = projects;
    }

    //getters
    getProjects() {
        return this.#projects;
    }
    getProgress() {
        return this.#progress;
    }
}


class UserGraphicInterface {
    constructor(user = new User("User", "user@gmail.com")) {
        this.sideBar = document.querySelector(".side-bar");
        this.userButton = document.querySelector(".user-name")
        this.addTaskButton = document.querySelector(".add-task")
        this.searchButton = document.querySelector(".search")
        this.filterButton = document.querySelector(".filter")
        this.displayButton = document.querySelector(".display");
        this.myProjectsButton = document.querySelector(".my-projects")
        this.myProjectsPlusButton = document.querySelector(".my-projects .fa-circle-plus")
        this.myProjectsDisplayButton = document.querySelector(".my-projects .fa-caret-down")
        this.projectList = document.querySelector(".project-list");
        this.main = document.querySelector(".main");
        this.projectDeleteButton = document.querySelector("li i")
        this.setEventListener()
        this.apply = document.querySelector(".apply-button");
        this.user = user;
        this.value = "";
        this.container = document.querySelector(".container")

    }
    setEventListener() {
        let mainCounter = 0;
        let sideCounter = 0;
        this.userButton.addEventListener("click", () => {
            mainCounter++;
            this.main.innerHTML = ""
            this.printUserInfo(user);

        })
        this.displayButton.addEventListener("click", () => {
            mainCounter++;
            this.main.innerHTML = ""
            this.printTodoListItems(user.getTodoList())

        })
        this.myProjectsDisplayButton.addEventListener("click", () => {
            mainCounter++
            this.projectList.innerHTML = "";
            if (mainCounter % 2 == 0) {

            }
            else {
                this.printProjectsDownMenu(user.getTodoList());

            }
        })
        this.myProjectsButton.addEventListener("click", () => {
            sideCounter++
            this.projectList.innerHTML = "";
            if (sideCounter % 2 == 0) {

            }
            else {
                this.printProjectsDownMenu(user.getTodoList());

            }

        })
        // this.searchButton.addEventListener("click", () => {
        //     this.main.innerHTML = " "
        //     this.printSearch();
        //     this.container.setAttribute("id", "5")

        // })
        this.filterButton.addEventListener("click", () => {
            this.main.innerHTML = "";
            this.printFilter();


        })
        this.addTaskButton.addEventListener("click", () => {
            this.main.innerHTML = "";
            this.printPlus()
        })
        this.myProjectsPlusButton.addEventListener("click", () => {
            this.main.innerHTML = ""
            this.printProjectPlus()
        })

    }
    printUserInfo(user) {
        const name = document.createElement("h2");
        const email = document.createElement("h2");
        const projects = document.createElement("h2");
        projects.classList.add("projects")
        const items = document.createElement("h2")
        items.classList.add("items");
        const progress = document.createElement("h2")
        progress.classList.add("progress")
        const userDiv = document.createElement("div")
        userDiv.classList.add("user-div")
        name.textContent = `Hello! \t` + user.name;
        email.textContent = user.email;
        projects.textContent = "You Have " + user.getTodoList().getProjects().length + " project";
        items.textContent = "You Have " + user.getTodoList().getAllItems().length + " item"
        user.getTodoList().updateProgress();
        progress.textContent = "You Have " + parseFloat(Math.ceil((user.getTodoList().getProgress())).toPrecision(2)) + " % of progress";
        this.main.appendChild(userDiv)
        userDiv.appendChild(name)
        userDiv.appendChild(email)
        this.main.appendChild(projects)
        this.main.appendChild(items)
        this.main.appendChild(progress)
    }
    printProjectsDownMenu(todoList) {
        const projects = todoList.getProjects();
        projects.forEach(e => {
            const project = document.createElement("li");
            project.addEventListener("click", () => {
                this.main.innerHTML = ""
                this.printEachProject(e);
                this.container.setAttribute("id", "1")
            })
            project.textContent = "# " + e.getName();
            this.projectList.appendChild(project)
            const deleteButton = document.createElement("i");
            deleteButton.classList.add("fa-solid")
            deleteButton.classList.add("fa-trash-can")
            deleteButton.classList.add("delete")
            project.appendChild(deleteButton)
            deleteButton.addEventListener("click", () => {
                const projectIndex = this.user.getTodoList().getProjects().indexOf(e);
                if (projectIndex !== -1) {
                    this.user.getTodoList().removeProject(projectIndex);
                    project.remove(); // Optionally remove the project from the UI
                }
            });
        })
        const project = document.createElement("li");
        project.style.color = "#4F4FFF"
        project.addEventListener("click", () => {
            if (this.user.getTodoList().getProjects().length == 0) {
                this.main.innerHTML = ""
                const h4 = document.createElement("h4")
                h4.classList.add("no")
                h4.textContent = "There is no projects"
                this.main.appendChild(h4)

            } else {
                this.main.innerHTML = ""
                this.container.setAttribute("id", "2")
                this.printTodoListProjects(this.user.getTodoList());
            }

        })
        project.textContent = "# " + "ALL"
        this.projectList.appendChild(project)

    }
    printTodoListItems(todoList) {
        this.container.setAttribute("id", "3")
        const message = document.createElement("div");
        message.classList.add("message");
        this.main.appendChild(message)

        if (this.value == "alphabetically") {
            this.value = "alphabetically";
            const newArray = user.getTodoList().getAllItems().sort((a, b) => {
                return a.getTitle().localeCompare(b.getTitle()); // Sort alphabetically
            });
            this.list = newArray;
            this.user.getTodoList().getProjects().forEach(e => {
                e.setTodoItems(e.getTodoItems().sort((a, b) => {
                    return a.getTitle().localeCompare(b.getTitle()); // Sort alphabetically
                }));
            })

            message.innerHTML = ""
            newArray.forEach(e => {
                this.printItemInContainer(e)
            });
        } else if (this.value == "priority") {
            this.value = "priority";

            const newArray2 = user.getTodoList().getAllItems().sort((a, b) => {
                return a.getPriority().localeCompare(b.getPriority()); // Sort by priority
            });
            this.user.getTodoList().getProjects().forEach(e => {
                e.setTodoItems(e.getTodoItems().sort((a, b) => {
                    return a.getPriority().localeCompare(b.getPriority()); // Sort by priority
                }));
            })
            this.list = newArray2;

            message.innerHTML = ""
            newArray2.forEach(e => {
                this.printItemInContainer(e)
            });
        } else {
            message.innerHTML = ""
            this.user.getTodoList().getAllItems().forEach(e => {
                this.printItemInContainer(e)
            });
        }
        if (this.user.getTodoList().getAllItems().length == 0) {
            this.main.innerHTML = ""
            const h4 = document.createElement("h4")
            h4.classList.add("no")
            h4.textContent = "There is no todo items"
            this.main.appendChild(h4)
        }

    }
    printTodoItems(list) {
        this.container.setAttribute("id", "3")
        list.forEach(e => {
            this.printItemInContainer(e);
        })
    }
    // printSearch() {
    //     const h4 = document.createElement("h4")
    //     h4.textContent = "Enter the name of item you search for";
    //     const container = document.createElement("div");
    //     container.classList.add("cont")
    //     h4.classList.add("search-paragraph");
    //     const input = document.createElement("input");
    //     input.classList.add("search-input")
    //     const button = document.createElement("div");
    //     button.classList.add("search-button")
    //     button.textContent = "Search";
    //     const message = document.createElement("div");
    //     message.classList.add("message")
    //     this.main.appendChild(h4)
    //     this.main.appendChild(container)
    //     container.appendChild(input)
    //     container.appendChild(button);
    //     this.main.appendChild(message)

    //     button.addEventListener("click", () => {
    //         this.user.getTodoList().searchForItem();
    //     })
    //     input.addEventListener("keypress", function (event) {

    //         if (event.key === "Enter") {
    //             button.click()
    //         }
    //     });

    // }
    printFilter() {
        this.container.setAttribute("id", "4")
        const message = document.createElement("div");
        message.classList.add("message")
        const h4 = document.createElement("h4")
        h4.textContent = "Choose which filter you want to filter by";
        h4.classList.add("filter-paragraph");
        const select = document.createElement("select");
        const option1 = document.createElement("option");
        option1.setAttribute("value", "priority")
        option1.textContent = "Priority";
        option1.classList.add("option1")
        const option2 = document.createElement("option");
        option2.setAttribute("value", "alphabetically")
        option2.textContent = "Alphabetically";
        option2.classList.add("option2")
        const button = document.createElement("button");
        button.classList.add("apply-button")
        button.textContent = "Apply";
        this.main.appendChild(h4)
        this.main.appendChild(select)
        select.appendChild(option1)
        select.appendChild(option2)
        this.main.appendChild(button)
        this.main.appendChild(message)
        
        button.addEventListener("click", () => {

            if (select.value == "alphabetically") {
                this.value = "alphabetically";
                const newArray = user.getTodoList().getAllItems().sort((a, b) => {
                    return a.getTitle().localeCompare(b.getTitle()); // Sort alphabetically
                });
                this.list = newArray;
                this.user.getTodoList().getProjects().forEach(e => {
                    e.setTodoItems(e.getTodoItems().sort((a, b) => {
                        return a.getTitle().localeCompare(b.getTitle()); // Sort alphabetically
                    }));
                })

                this.main.innerHTML = ""
                this.printFilter()
                newArray.forEach(e => {
                    this.printItemInContainer(e)
                });
            } else if (select.value == "priority") {
                this.value = "priority";

                const newArray2 = user.getTodoList().getAllItems().sort((a, b) => {
                    return a.getPriority().localeCompare(b.getPriority()); // Sort by priority
                });
                this.user.getTodoList().getProjects().forEach(e => {
                    e.setTodoItems(e.getTodoItems().sort((a, b) => {
                        return a.getPriority().localeCompare(b.getPriority()); // Sort by priority
                    }));
                })
                this.list = newArray2;

                this.main.innerHTML = ""
                this.printFilter()
                newArray2.forEach(e => {
                    this.printItemInContainer(e)
                });
            } else {
                this.main.innerHTML = ""
                this.printFilter()
                this.user.getTodoList().getAllItems().forEach(e => {
                    this.printItemInContainer(e)
                });
            }
        });
    }
    printPlus() {
        const select = document.createElement("select");
        select.classList.add("plus-select")
        this.user.getTodoList().getProjects().forEach(e => {
            const option1 = document.createElement("option");
            option1.setAttribute("value", e.getName())
            option1.textContent = e.getName();
            select.appendChild(option1);
        })
        this.main.appendChild(select)
        const h4 = document.createElement("h4")
        h4.classList.add("plus-paragraph");
        const form = document.createElement("form")
        form.classList.add("plus-form")
        const titleParagraph = document.createElement("h4")
        const titleInput = document.createElement("input");
        titleParagraph.textContent = "Title: "
        // this.user.getTodoList().getAllItems().forEach(e=>{
        //     if(e.getTitle()==titleInput.value){
        //         titleInput.value="Choose Another value"
        //     }
        // })
        const descriptionParagraph = document.createElement("h4")
        const descriptionInput = document.createElement("input");
        descriptionParagraph.textContent = "Description: "
        const dueDateParagraph = document.createElement("h4")
        const dueDateInput = document.createElement("input");
        dueDateParagraph.textContent = "DueDate: "
        dueDateInput.setAttribute("type", "date")
        const currentTime = new Date()
        const convertToDateTimeLocalString = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${day}/${month}/${year}`;
        }
        dueDateInput.setAttribute("value", currentTime.toISOString().slice(0, 10))
        // dueDateInput.setAttribute("type", "datetime-local")
        // dueDateInput.setAttribute("value","2018-06-12T19:30")
        const priorityParagraph = document.createElement("h4")
        const priorityInput = document.createElement("select");
        priorityInput.classList.add("priority-select")
        priorityInput.setAttribute("value", "1")
        const pOption1 = document.createElement("option")
        pOption1.setAttribute("value", "1")
        pOption1.textContent = pOption1.value
        const pOption2 = document.createElement("option")
        pOption2.setAttribute("value", "2")
        pOption2.textContent = pOption2.value
        const pOption3 = document.createElement("option")
        pOption3.setAttribute("value", "3")
        pOption3.textContent = pOption3.value

        priorityParagraph.textContent = "Priority: "
        const notesParagraph = document.createElement("h4")
        const notesInput = document.createElement("input");
        notesParagraph.textContent = "Notes: "
        const isCompletedParagraph = document.createElement("h4")

        const expectedTimeParagraph = document.createElement("h4")
        const expectedTimeInput = document.createElement("input");
        expectedTimeInput.setAttribute("type", "time");
        expectedTimeInput.setAttribute("value", "08:00");
        const isCompletedInput = document.createElement("select");
        isCompletedParagraph.textContent = "Is completed?: "
        const option1 = document.createElement("option")
        option1.setAttribute("value", "false")
        option1.textContent = option1.value
        const option2 = document.createElement("option")
        option2.setAttribute("value", "true")
        option2.textContent = option2.value
        expectedTimeParagraph.textContent = "Expected hour: "
        h4.textContent = "Enter the information for a new todo item"
        const div = document.createElement("div");
        div.classList.add("form-button")
        div.textContent = "submit"
        this.main.appendChild(h4)
        this.main.appendChild(form)
        form.appendChild(select)
        form.appendChild(titleParagraph)
        form.appendChild(titleInput)
        form.appendChild(descriptionParagraph)
        form.appendChild(descriptionInput)
        form.appendChild(expectedTimeParagraph)
        form.appendChild(expectedTimeInput)
        form.appendChild(dueDateParagraph)
        form.appendChild(dueDateInput)
        form.appendChild(priorityParagraph)
        priorityInput.appendChild(pOption1)
        priorityInput.appendChild(pOption2)
        priorityInput.appendChild(pOption3)

        form.appendChild(priorityInput)
        form.appendChild(notesParagraph)
        form.appendChild(notesInput)
        form.appendChild(isCompletedParagraph)
        form.appendChild(isCompletedInput)
        isCompletedInput.appendChild(option1)
        isCompletedInput.appendChild(option2)
        isCompletedInput.classList.add("is-completed-select")

        const container = document.createElement("div")
        form.appendChild(div)
        this.main.appendChild(container)
        div.addEventListener("click", () => {
            const selection = select.value
            const title = titleInput.value;
            const description = descriptionInput.value;
            const dueDate = dueDateInput.value;

            const priority = priorityInput.value;
            if (priority > 3) {
                priorityInput.value = 3;
            }
            const notes = notesInput.value;
            const isCompleted = isCompletedInput.value;
            const expectedTime = expectedTimeInput.value;

            titleInput.value = "";
            descriptionInput.value = "";
            dueDateInput.value = currentTime.toISOString().slice(0, 10);
            priorityInput.value = "";
            notesInput.value = "";
            isCompletedInput.value = "";
            expectedTimeInput.value = "08:00";

            user.getTodoList().getProjects().forEach(e => {
                if (e.getName() == select.value) {
                    e.addItem(new TodoItem(title, description, dueDate, priority, notes, isCompleted, expectedTime))
                    return;
                }
            })
            container.innerHTML = "";
            const h4 = document.createElement("h4")
            h4.classList.add("confirm-message")
            h4.textContent = "You make todo Item called " + title + " successfully!"
            container.appendChild(h4);
        })
    }
    printEdit() {
        this.main.innerHTML = ""
        const select = document.createElement("select");
        select.classList.add("edit-select")
        this.user.getTodoList().getProjects().forEach(e => {
            const option1 = document.createElement("option");
            option1.setAttribute("value", e.getName())
            option1.textContent = e.getName();
            select.appendChild(option1);
        })
        this.main.appendChild(select)
        const form = document.createElement("form")
        form.classList.add("edit-form")
        const titleParagraph = document.createElement("label")
        const titleInput = document.createElement("input");
        titleParagraph.textContent = "Title: "
        const descriptionParagraph = document.createElement("label")
        const descriptionInput = document.createElement("input");
        descriptionParagraph.textContent = "Description: "
        const dueDateParagraph = document.createElement("label")
        const dueDateInput = document.createElement("input");
        dueDateParagraph.textContent = "DueDate: "
        dueDateInput.setAttribute("type", "date")
        const currentTime = new Date()
        const convertToDateTimeLocalString = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${day}/${month}/${year}`;
        }
        dueDateInput.setAttribute("value", currentTime.toISOString().slice(0, 10))
        const priorityParagraph = document.createElement("label")
        const priorityInput = document.createElement("select");
        priorityInput.classList.add("edit-select")
        priorityInput.setAttribute("value", "1")
        const pOption1 = document.createElement("option")
        pOption1.setAttribute("value", "1")
        pOption1.textContent = pOption1.value
        const pOption2 = document.createElement("option")
        pOption2.setAttribute("value", "2")
        pOption2.textContent = pOption2.value
        const pOption3 = document.createElement("option")
        pOption3.setAttribute("value", "3")
        pOption3.textContent = pOption3.value

        priorityParagraph.textContent = "Priority: "
        const notesParagraph = document.createElement("label")
        const notesInput = document.createElement("input");
        notesParagraph.textContent = "Notes: "
        const isCompletedParagraph = document.createElement("label")

        const expectedTimeParagraph = document.createElement("label")
        const expectedTimeInput = document.createElement("input");
        expectedTimeInput.setAttribute("type", "time");
        expectedTimeInput.setAttribute("value", "08:00");
        const isCompletedInput = document.createElement("select");
        isCompletedParagraph.textContent = "completed?: "
        const option1 = document.createElement("option")
        option1.setAttribute("value", "false")
        option1.textContent = option1.value
        const option2 = document.createElement("option")
        option2.setAttribute("value", "true")
        option2.textContent = option2.value
        expectedTimeParagraph.textContent = "Time: "
        const div = document.createElement("div");
        div.classList.add("form-button")
        div.textContent = "submit"
        this.main.appendChild(form)
        form.appendChild(select)
        form.appendChild(titleParagraph)
        form.appendChild(titleInput)
        form.appendChild(descriptionParagraph)
        form.appendChild(descriptionInput)
        form.appendChild(expectedTimeParagraph)
        form.appendChild(expectedTimeInput)
        form.appendChild(dueDateParagraph)
        form.appendChild(dueDateInput)
        form.appendChild(priorityParagraph)
        priorityInput.appendChild(pOption1)
        priorityInput.appendChild(pOption2)
        priorityInput.appendChild(pOption3)

        form.appendChild(priorityInput)
        form.appendChild(notesParagraph)
        form.appendChild(notesInput)
        form.appendChild(isCompletedParagraph)
        form.appendChild(isCompletedInput)
        isCompletedInput.appendChild(option1)
        isCompletedInput.appendChild(option2)
        isCompletedInput.classList.add("is-completed-select")

        const container = document.createElement("div")
        form.appendChild(div)
        this.main.appendChild(container)
        div.addEventListener("click", () => {
            const selection = select.value
            const title = titleInput.value;
            const description = descriptionInput.value;
            const dueDate = dueDateInput.value;

            const priority = priorityInput.value;
            if (priority > 3) {
                priorityInput.value = 3;
            }
            const notes = notesInput.value;
            const isCompleted = isCompletedInput.value;
            const expectedTime = expectedTimeInput.value;

            titleInput.value = "";
            descriptionInput.value = "";
            dueDateInput.value = currentTime.toISOString().slice(0, 10);
            priorityInput.value = "";
            notesInput.value = "";
            isCompletedInput.value = "";
            expectedTimeInput.value = "08:00";

            user.getTodoList().getProjects().forEach(e => {
                if (e.getName() == select.value) {
                    e.addItem(new TodoItem(title, description, dueDate, priority, notes, isCompleted, expectedTime))
                    return;
                }
            })
            container.innerHTML = "";
            const h4 = document.createElement("label")
            h4.classList.add("confirm-message")
            h4.textContent = "You make todo Item called " + title + " successfully!"
            container.appendChild(h4);
        })
    }
    printProjectPlus() {
        const h4 = document.createElement("h4")
        h4.classList.add("plus-paragraph");
        const form = document.createElement("form")
        form.classList.add("plus-form")
        const nameParagraph = document.createElement("h4")
        const nameInput = document.createElement("input");
        h4.textContent = "Enter the information for a new project"
        const div = document.createElement("div");
        div.classList.add("form-button")
        div.textContent = "Make"
        nameParagraph.textContent = "Name: "
        this.main.appendChild(h4)
        this.main.appendChild(form)
        form.appendChild(nameParagraph)
        form.appendChild(nameInput)
        const container = document.createElement("div")
        form.appendChild(div)
        this.main.appendChild(container)
        div.addEventListener("click", () => {
            const name = nameInput.value
            nameInput.value = "";
            this.user.getTodoList().addProject(new TodoProject(name))
            container.innerHTML = "";
            const h42 = document.createElement("h4")
            h42.classList.add("confirm-message")
            this.projectList.innerHTML = ""
            h42.textContent = "You make project called " + name + " successfully!"
            this.printProjectsDownMenu(this.user.getTodoList())
            container.appendChild(h42);
        })
    }
    printItemInContainer(todoItem) {
        const container = document.createElement("div");
        container.classList.add("item");
        const name = document.createElement("span");
        const dueDate = document.createElement("span");
        const div = document.createElement("div");
        name.textContent = "Name: " + todoItem.getTitle();
        dueDate.textContent = " Due date: " + todoItem.getDueDate();
        dueDate.classList.add("due");
        const span = document.createElement("span")
        span.textContent = " P" + todoItem.getPriority();
        span.classList.add("s")
        const deleteButton = document.createElement("i");
        const isCompletedButton = document.createElement("i");
        const editedButton = document.createElement("i");
        deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
        isCompletedButton.classList.add("fa-regular", "fa-square-check", "check");
        editedButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        if (todoItem.getPriority() == 1) {
            container.setAttribute("style", "background-color: rgba(255, 33, 33, 0.253);")
        } else if (todoItem.getPriority() == 2) {
            container.setAttribute("style", "background:rgba(255, 222, 33, 0.253);")

        } else {

        }
        if (todoItem.getIsComplete() == true) {
            isCompletedButton.setAttribute("style", "background-color:#4F4FFF")
        } else if (todoItem.getIsComplete() == false) {
            isCompletedButton.setAttribute("style", "background-color:white")

        }
        this.main.appendChild(container);
        container.appendChild(isCompletedButton);
        container.appendChild(name);
        container.appendChild(dueDate);
        container.appendChild(span)
        container.appendChild(div);
        // div.appendChild(isCompletedButton);
        div.appendChild(deleteButton);
        div.appendChild(editedButton);
        

        deleteButton.addEventListener("click", () => {
            for (let i = 0; i < user.getTodoList().getProjects().length; i++) {
                for (let j = 0; j < user.getTodoList().getProjects()[i].getTodoItems().length; j++) {
                    if (user.getTodoList().getProjects()[i].getTodoItems()[j] === todoItem && user.getTodoList().getProjects()[i].getName() === todoItem.parentName) {
                        user.getTodoList().getProjects()[i].removeItem(j);
                        container.remove();
                    }
                }
            }
        });
        isCompletedButton.addEventListener("click", () => {
            for (let i = 0; i < user.getTodoList().getProjects().length; i++) {
                for (let j = 0; j < user.getTodoList().getProjects()[i].getTodoItems().length; j++) {
                    if (user.getTodoList().getProjects()[i].getTodoItems()[j] === todoItem && user.getTodoList().getProjects()[i].getName() === todoItem.parentName) {
                        if (todoItem.getIsComplete() == true) {
                            user.getTodoList().getProjects()[i].getTodoItems()[j].setIsComplete(false);

                        } else if (todoItem.getIsComplete() == false) {
                            user.getTodoList().getProjects()[i].getTodoItems()[j].setIsComplete(true);
                        }
                        user.getTodoList().getProjects()[i].updateProgress()
                        if (this.container.getAttribute("id") == 1) {
                            this.main.innerHTML = ""
                            this.printEachProject(user.getTodoList().getProjects()[i]);
                        } else if (this.container.getAttribute("id") == 2) {
                            this.main.innerHTML = ""
                            this.printTodoListProjects(this.user.getTodoList());
                        }
                        else if (this.container.getAttribute("id") == 3) {
                            this.main.innerHTML = ""
                            this.printTodoListItems(user.getTodoList())
                        }
                        else if (this.container.getAttribute("id") == 5) {
                            this.main.innerHTML = " "
                            this.printSearch();
                        }
                        


                        if (todoItem.getIsComplete() == true) {
                            isCompletedButton.setAttribute("style", "background-color:#4F4FFF")
                        } else if (todoItem.getIsComplete() == false) {
                            isCompletedButton.setAttribute("style", "background-color: white")

                        }
                    }
                }
            }
        });
        // editedButton.addEventListener("click", () => {
        //     for (let i = 0; i < user.getTodoList().getProjects().length; i++) {
        //         for (let j = 0; j < user.getTodoList().getProjects()[i].getTodoItems().length; j++) {
        //             if (user.getTodoList().getProjects()[i].getTodoItems()[j] === todoItem && user.getTodoList().getProjects()[i].getName() === todoItem.parentName) {
        //                 this.printEdit(todoItem, container); // Pass the current todoItem and its container
        //             }
        //         }
        //     }
        // });
    }
    printEachProject(todoProject) {
        const projectName = document.createElement("h4")
        projectName.classList.add("project-head");
        projectName.textContent = todoProject.getName()
        const span = document.createElement("span");
        span.textContent = parseFloat(Math.ceil((todoProject.getProgress())).toPrecision(2)) + " % of progress";
        this.main.appendChild(projectName)
        projectName.appendChild(span)
        todoProject.getTodoItems().forEach((e) => {
            this.printItemInContainer(e);
        })
    }
    printTodoListProjects(todoList) {
        todoList.getProjects().forEach(e => {
            this.printEachProject(e);
        })
    }
    //printExpandedToDoItem(todoItem) {
    //     const container = document.createElement("div");
    //     container.classList.add("card");
    //     const title = document.createElement("p")
    //     const description = document.createElement("p")
    //     const dueDate = document.createElement("p")
    //     const priority = document.createElement("p")
    //     const notes = document.createElement("p")
    //     const isCompleted = document.createElement("p")
    //     const expectedTime = document.createElement("p")
    //     title.textContent = "title: " + todoItem.getTitle();
    //     description.textContent = "description: " + todoItem.getDescription();
    //     dueDate.textContent = "dueDate: " + todoItem.getDueDate()
    //     priority.textContent = "priority: " + todoItem.getPriority()
    //     notes.textContent = "notes: " + todoItem.getNotes()
    //     isCompleted.textContent = "isCompleted: " + todoItem.getIsComplete()
    //     expectedTime.textContent = "expectedTime: " + todoItem.getExpectedTime()
    //     this.main.appendChild(container)
    //     container.appendChild(title)
    //     container.appendChild(description)
    //     container.appendChild(dueDate)
    //     container.appendChild(priority)
    //     container.appendChild(notes)
    //     container.appendChild(isCompleted)
    //     container.appendChild(expectedTime)
    // }

}

const user = new User("Ahmed", "ahmed@gmail.com")
const item = new TodoItem("new", "this is the most important Item.", "2024-8-15", "1", "don't forget to make the time table", true, "2 Hours");
const item2 = new TodoItem();
item2.setTitle("aaa")
const item3 = new TodoItem("b-gym", "this is to go to gym.", "2024-8-17", "2", "don't forget to do some pullups", true, "1 Hour")
const project = new TodoProject("MyProject");
project.addItem(item);
project.addItem(item3)
project.addItem(item2)
const project2 = new TodoProject("TProject");
const item5 = new TodoItem("rram", "this is to yam", "2024-8-25", "3", "don't forget to do some pullups", true, "1 Hour")
project2.addItem(item5)
project2.addItem(item5)
const item4 = new TodoItem("gym", "this is to go to gym.", " 2024-8-25", "3", "don't forget to do some pullups", true, "1 Hour")
project2.addItem(item4)
const printer = new UserGraphicInterface(user);
user.getTodoList().addProject(project)
user.getTodoList().addProject(project2)
printer.printEdit()


