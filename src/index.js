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
    constructor(title = "//", description = "//", dueDate = "//", priority = "3", notes = "none", isCompleted = false, expectedTime = "00:00") {
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
        const arr = []
        all.forEach(e => {
            if (e.getTitle() === title) {
                arr.push(e);
            }
        })
        return arr
    }
    updateAllProjectsProgress() {
        this.getProjects().forEach(e => {
            e.updateProgress()
        })
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
        this.setEventListener()
        this.user = user;
        this.value = "";
        this.container = document.querySelector(".container")
    }
    setEventListener() {
        let Counter1 = 0;
        let Counter2 = 0;
        this.userButton.addEventListener("click", () => {
            Counter1++;
            this.main.innerHTML = ""
            this.printUserInfo(user);
            this.user.getTodoList().getProjects().forEach(e => {
                e.updateProgress();
            })
        })
        this.addTaskButton.addEventListener("click", () => {
            this.main.innerHTML = "";
            this.printAddTask()
        })
        this.displayButton.addEventListener("click", () => {
            Counter1++;
            this.main.innerHTML = ""
            this.printTodoItemsByList(user.getTodoList())

        })
        this.searchButton.addEventListener("click", () => {
            this.main.innerHTML = " "
            this.printSearch();

        })
        this.filterButton.addEventListener("click", () => {
            this.main.innerHTML = "";
            this.printFilter();
        })
        this.myProjectsDisplayButton.addEventListener("click", () => {
            Counter1++
            this.projectList.innerHTML = "";
            if (Counter1 % 2 == 0) {
            }
            else {
                this.printProjectsDownMenu(user.getTodoList());
            }
        })
        this.myProjectsButton.addEventListener("click", () => {
            Counter2++
            this.projectList.innerHTML = "";
            if (Counter2 % 2 == 0) {
            }
            else {
                this.printProjectsDownMenu(user.getTodoList());
            }
        })
        this.myProjectsPlusButton.addEventListener("click", () => {
            this.main.innerHTML = ""
            this.printAddProject()
        })

    }
    printUserInfo(user) {
        this.user.getTodoList().updateAllProjectsProgress()
        user.getTodoList().updateProgress();
        const name = document.createElement("h2");
        const email = document.createElement("h2");
        const projects = document.createElement("h2");
        projects.classList.add("message")
        const items = document.createElement("h2")
        items.classList.add("message");
        const progress = document.createElement("h2")
        progress.classList.add("message")
        const userDiv = document.createElement("div")
        userDiv.classList.add("user-div")
        name.textContent = `Hello! \t` + user.name;
        email.textContent = user.email;
        projects.textContent = "You have    " + user.getTodoList().getProjects().length + " project";
        items.textContent = "You have    " + user.getTodoList().getAllItems().length + " item"
        progress.textContent = "You have    " + parseFloat(Math.ceil((user.getTodoList().getProgress())).toPrecision(2)) + " % of progress";
        this.main.appendChild(userDiv)
        userDiv.appendChild(name)
        userDiv.appendChild(email)
        this.main.appendChild(projects)
        this.main.appendChild(items)
        this.main.appendChild(progress)
    }
    printAddTask() {
        const h4 = document.createElement("h4")
        h4.classList.add("message");
        h4.textContent = "Enter the information for a new todo item"
        const form = document.createElement("form")
        form.classList.add("plus-form")
        const projectSelection = document.createElement("select");
        this.user.getTodoList().getProjects().forEach(e => {
            const option1 = document.createElement("option");
            option1.setAttribute("value", "#" + e.getName())
            option1.textContent = "#" + e.getName();
            projectSelection.appendChild(option1);
        })
        this.main.appendChild(projectSelection)

        const titleParagraph = document.createElement("h4")
        const titleInput = document.createElement("input");
        titleParagraph.textContent = "Title: "

        const descriptionParagraph = document.createElement("h4")
        const descriptionInput = document.createElement("input");
        descriptionParagraph.textContent = "Description: "

        const expectedTimeParagraph = document.createElement("h4")
        const expectedTimeInput = document.createElement("input");
        expectedTimeInput.setAttribute("type", "time");
        expectedTimeInput.setAttribute("value", "08:00");
        expectedTimeParagraph.textContent = "Expected hour: "

        const dueDateParagraph = document.createElement("h4")
        const dueDateInput = document.createElement("input");
        dueDateParagraph.textContent = "DueDate: "
        dueDateInput.setAttribute("type", "date")
        const currentTime = new Date()
        dueDateInput.setAttribute("value", currentTime.toISOString().slice(0, 10))

        const priorityParagraph = document.createElement("h4")
        const priorityInput = document.createElement("select");
        const pOption1 = document.createElement("option")
        pOption1.setAttribute("value", "1")
        pOption1.textContent = pOption1.value
        const pOption2 = document.createElement("option")
        pOption2.setAttribute("value", "2")
        pOption2.textContent = pOption2.value
        const pOption3 = document.createElement("option")
        pOption3.setAttribute("value", "3")
        pOption3.setAttribute("selected", "")
        pOption3.textContent = pOption3.value
        priorityParagraph.textContent = "Priority: "

        const notesParagraph = document.createElement("h4")
        const notesInput = document.createElement("input");
        notesParagraph.textContent = "Notes: "

        const isCompletedParagraph = document.createElement("h4")
        const isCompletedInput = document.createElement("select");
        isCompletedParagraph.textContent = "Is completed?: "
        const option1 = document.createElement("option")
        option1.setAttribute("value", false)
        option1.textContent = option1.value
        const option2 = document.createElement("option")
        option2.setAttribute("value", true)
        option2.textContent = option2.value

        const button = document.createElement("div");
        button.classList.add("button")
        button.textContent = "submit"

        const container = document.createElement("div")

        this.main.appendChild(h4)
        this.main.appendChild(form)
        form.appendChild(projectSelection)
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

        form.appendChild(button)
        this.main.appendChild(container)
        button.addEventListener("click", () => {
            const selection = projectSelection.value
            const title = titleInput.value;
            const description = descriptionInput.value;
            const dueDate = dueDateInput.value;
            const priority = priorityInput.value;
            if (priority > 3) {
                priorityInput.value = 3;
            }
            const notes = notesInput.value;
            const isCompleted = Boolean(isCompletedInput.value);
            const expectedTime = expectedTimeInput.value;

            titleInput.value = "";
            descriptionInput.value = "";
            expectedTimeInput.value = "08:00";
            dueDateInput.value = currentTime.toISOString().slice(0, 10);
            priorityInput.value = "";
            notesInput.value = "";
            isCompletedInput.value = "";
            user.getTodoList().getProjects().forEach(e => {
                if ("#" + e.getName() == projectSelection.value) {
                    e.addItem(new TodoItem(title, description, dueDate, priority, notes, isCompleted, expectedTime))
                    e.updateProgress();
                }
            })
            container.innerHTML = "";
            const h4 = document.createElement("h4")
            h4.classList.add("message")
            h4.textContent = "You make todo Item called " + title + " successfully!"
            container.appendChild(h4);
        })
    }
    printSearch() {
        this.user.getTodoList().updateAllProjectsProgress()

        this.container.setAttribute("id", "5")

        const h4 = document.createElement("h4")
        h4.textContent = "Enter the name of item you search for";
        h4.classList.add("message");

        const input = document.createElement("input");
        input.classList.add("search-input")

        const button = document.createElement("div");
        button.classList.add("button")
        button.textContent = "Search";

        const form = document.createElement("form");
        form.classList.add("search-form")
        this.main.appendChild(h4)
        this.main.appendChild(form);
        form.appendChild(input)
        form.appendChild(button);

        button.addEventListener("click", () => {
            const search = this.user.getTodoList().searchForItem();
            this.main.innerHTML = ""
            this.printSearch()
            if (search.length > 0) {
                search.forEach(e => {
                    this.printItem(e)
                })
            } else {
                const warningMessage = document.createElement("h4")
                warningMessage.classList.add("message");
                warningMessage.classList.add("warm")
                warningMessage.textContent = "No equivalent result"
                this.main.appendChild(warningMessage);
            }

        })
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                button.click()
            }
        });

    }
    printFilter() {
        this.user.getTodoList().updateAllProjectsProgress()

        this.container.setAttribute("id", "4")

        const h4 = document.createElement("h4")
        h4.textContent = "Choose which filter you want to filter by";
        h4.classList.add("message");

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
        button.classList.add("button")
        button.textContent = "Apply";

        const form = document.createElement("form");
        form.classList.add("filter-form")

        this.main.appendChild(h4)
        this.main.appendChild(form)
        form.appendChild(select)
        select.appendChild(option1)
        select.appendChild(option2)
        form.appendChild(button)

        button.addEventListener("click", () => {
            if (select.value == "alphabetically") {
                this.value = "alphabetically";
                const newArray = user.getTodoList().getAllItems().sort((a, b) => {
                    return a.getTitle().localeCompare(b.getTitle());
                });
                this.user.getTodoList().getProjects().forEach(e => {
                    e.setTodoItems(e.getTodoItems().sort((a, b) => {
                        return a.getTitle().localeCompare(b.getTitle());
                    }));
                })
                this.main.innerHTML = ""
                this.printFilter()
                newArray.forEach(e => {
                    this.printItem(e)
                });

            }
            else if (select.value == "priority") {
                this.value = "priority";
                const newArray2 = user.getTodoList().getAllItems().sort((a, b) => {
                    return a.getPriority().localeCompare(b.getPriority());
                });
                this.user.getTodoList().getProjects().forEach(e => {
                    e.setTodoItems(e.getTodoItems().sort((a, b) => {
                        return a.getPriority().localeCompare(b.getPriority());
                    }));
                })
                this.main.innerHTML = ""
                this.printFilter()
                newArray2.forEach(e => {
                    this.printItem(e)
                });
            }
        });
    }
    printTodoItemsByList(todoList) {
        this.user.getTodoList().updateAllProjectsProgress()

        this.container.setAttribute("id", "3")
        const h4 = document.createElement("h4")
        h4.classList.add("message")
        h4.classList.add("down")
        h4.textContent = "Display all todo items";
        this.main.appendChild(h4)
        if (this.value == "alphabetically") {
            this.value = "alphabetically";
            const newArray = user.getTodoList().getAllItems().sort((a, b) => {
                return a.getTitle().localeCompare(b.getTitle());
            });
            this.user.getTodoList().getProjects().forEach(e => {
                e.setTodoItems(e.getTodoItems().sort((a, b) => {
                    return a.getTitle().localeCompare(b.getTitle());
                }));
            })
            newArray.forEach(e => {
                this.printItem(e)
            });
        }
        else if (this.value == "priority") {
            this.value = "priority";

            const newArray2 = user.getTodoList().getAllItems().sort((a, b) => {
                return a.getPriority().localeCompare(b.getPriority());
            });
            this.user.getTodoList().getProjects().forEach(e => {
                e.setTodoItems(e.getTodoItems().sort((a, b) => {
                    return a.getPriority().localeCompare(b.getPriority());
                }));
            })
            newArray2.forEach(e => {
                this.printItem(e)
            });
        }
        else {
            this.user.getTodoList().getAllItems().forEach(e => {
                this.printItem(e)
            });
        }
        if (this.user.getTodoList().getAllItems().length == 0) {
            this.main.innerHTML = ""
            const h4 = document.createElement("h4")
            h4.classList.add("message")
            h4.classList.add("warm")
            h4.textContent = "There is no todo items"
            this.main.appendChild(h4)
        }

    }
    printItem(todoItem) {
        this.user.getTodoList().updateAllProjectsProgress()
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item");

        const name = document.createElement("span");
        name.textContent = "Name: " + todoItem.getTitle();

        const dueDate = document.createElement("span");

        dueDate.textContent = " Due date: " + todoItem.getDueDate();
        dueDate.classList.add("due");

        const div = document.createElement("div");

        const span = document.createElement("span")
        span.textContent = " P" + todoItem.getPriority();
        span.classList.add("priority-span")

        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");


        const isCompletedButton = document.createElement("input");
        isCompletedButton.setAttribute("type", "checkbox")
        isCompletedButton.classList.add("check-mark")
        isCompletedButton.classList.add("check");

        const editedButton = document.createElement("i");
        editedButton.classList.add("fa-solid", "fa-pen-to-square", "edit");

        if (todoItem.getPriority() == 1) {
            itemContainer.setAttribute("style", "background-color:  var(--container-red);")
        } else if (todoItem.getPriority() == 2) {
            itemContainer.setAttribute("style", "background:var(--container-yellow);")
        }

        if (todoItem.getIsComplete() == true || todoItem.getIsComplete() == "true") {
            isCompletedButton.setAttribute("checked", "")
        }

        this.main.appendChild(itemContainer);
        itemContainer.appendChild(isCompletedButton);
        itemContainer.appendChild(name);
        itemContainer.appendChild(dueDate);
        itemContainer.appendChild(span)
        itemContainer.appendChild(div);
        div.appendChild(deleteButton);
        div.appendChild(editedButton);

        deleteButton.addEventListener("click", () => {
            for (let i = 0; i < this.user.getTodoList().getProjects().length; i++) {
                for (let j = 0; j < this.user.getTodoList().getProjects()[i].getTodoItems().length; j++) {
                    if (this.user.getTodoList().getProjects()[i].getTodoItems()[j] === todoItem && user.getTodoList().getProjects()[i].getName() === todoItem.parentName) {
                        this.user.getTodoList().getProjects()[i].removeItem(j);
                        this.user.getTodoList().getProjects()[i].updateProgress();

                        if (this.container.getAttribute("id") == 1 | this.container.getAttribute("id") == "1") {
                            this.main.innerHTML = ""
                            this.printProject(user.getTodoList().getProjects()[i]);
                        } else if (this.container.getAttribute("id") == 2 | this.container.getAttribute("id") == "2") {
                            this.main.innerHTML = ""
                            this.printTodoListProjects(this.user.getTodoList());
                        }
                        else if (this.container.getAttribute("id") == 3 | this.container.getAttribute("id") == "3") {
                            this.main.innerHTML = ""
                            this.printTodoItemsByList(user.getTodoList())
                        }
                        else if (this.container.getAttribute("id") == 4 | this.container.getAttribute("id") == "4") {
                            this.main.innerHTML = " "
                            this.printFilter();
                        } else if (this.container.getAttribute("id") == 5 | this.container.getAttribute("id") == "5") {
                            this.main.innerHTML = "";
                            this.printSearch();
                        }
                    }
                }
            }
        });
        isCompletedButton.addEventListener("click", () => {
            for (let i = 0; i < user.getTodoList().getProjects().length; i++) {
                for (let j = 0; j < user.getTodoList().getProjects()[i].getTodoItems().length; j++) {
                    if (this.user.getTodoList().getProjects()[i].getTodoItems()[j] === todoItem && user.getTodoList().getProjects()[i].getName() === todoItem.parentName) {
                        if (this.user.getTodoList().getProjects()[i].getTodoItems().length > 0) {
                            if (todoItem.getIsComplete() == true || todoItem.getIsComplete() == "true") {
                                this.user.getTodoList().getProjects()[i].getTodoItems()[j].setIsComplete(false);

                            } else if (todoItem.getIsComplete() == false || todoItem.getIsComplete() == "false") {
                                this.user.getTodoList().getProjects()[i].getTodoItems()[j].setIsComplete(true);
                            }

                            this.user.getTodoList().getProjects()[i].updateProgress()
                            if (this.container.getAttribute("id") == 1 | this.container.getAttribute("id") == "1") {
                                this.main.innerHTML = ""
                                this.printProject(user.getTodoList().getProjects()[i]);
                            } else if (this.container.getAttribute("id") == 2 | this.container.getAttribute("id") == "2") {
                                this.main.innerHTML = ""
                                this.printTodoListProjects(this.user.getTodoList());
                            }
                            else if (this.container.getAttribute("id") == 3 | this.container.getAttribute("id") == "3") {
                                this.main.innerHTML = ""
                                this.printTodoItemsByList(user.getTodoList())
                            }
                            else if (this.container.getAttribute("id") == 4 | this.container.getAttribute("id") == "4") {
                                this.main.innerHTML = " "
                                this.printFilter();
                            } else if (this.container.getAttribute("id") == 5 | this.container.getAttribute("id") == "5") {
                                this.main.innerHTML = "";
                                this.printSearch();
                            }
                        }

                    }
                }
            }
        });
        // editedButton.addEventListener("click", () => {
        //     for (let i = 0; i < user.getTodoList().getProjects().length; i++) {
        //         for (let j = 0; j < user.getTodoList().getProjects()[i].getTodoItems().length; j++) {
        //             if (user.getTodoList().getProjects()[i].getTodoItems()[j] === todoItem && user.getTodoList().getProjects()[i].getName() === todoItem.parentName) {
        //                 this.printEdit()
        //             }
        //         }
        //     }
        // });
    }
    printProjectsDownMenu(todoList) {
        const projects = todoList.getProjects();
        projects.forEach(e => {
            const project = document.createElement("li");
            project.addEventListener("click", () => {
                this.main.innerHTML = ""
                this.printProject(e);
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
                    project.remove();
                }
            });
        })

        const allProjects = document.createElement("li");
        allProjects.style.color = "var(--main-icon-color)"
        allProjects.addEventListener("click", () => {
            if (this.user.getTodoList().getProjects().length == 0) {
                this.main.innerHTML = ""
                const h4 = document.createElement("h4")
                h4.classList.add("message")
                h4.classList.add("warm")
                h4.textContent = "There is no projects"
                this.main.appendChild(h4)
            } else {
                this.main.innerHTML = ""
                this.container.setAttribute("id", "2")
                this.printTodoListProjects(this.user.getTodoList());
            }

        })
        allProjects.textContent = "# " + "ALL"
        this.projectList.appendChild(allProjects)

    }
    printAddProject() {
        this.user.getTodoList().updateAllProjectsProgress()
        const h4 = document.createElement("h4")
        h4.classList.add("message");
        h4.textContent = "Enter the information for a new project"

        const form = document.createElement("form")
        form.classList.add("plus-form")

        const nameParagraph = document.createElement("h4")
        nameParagraph.textContent = "Name: "

        const nameInput = document.createElement("input");
        const button = document.createElement("div");
        button.classList.add("button")
        button.textContent = "Make"

        const container = document.createElement("div")

        this.main.appendChild(h4)
        this.main.appendChild(form)
        form.appendChild(nameParagraph)
        form.appendChild(nameInput)

        form.appendChild(button)
        this.main.appendChild(container)
        button.addEventListener("click", () => {
            const name = nameInput.value
            nameInput.value = "";
            this.user.getTodoList().addProject(new TodoProject(name))
            container.innerHTML = "";
            const h42 = document.createElement("h4")
            h42.classList.add("message")
            this.projectList.innerHTML = ""
            h42.textContent = "You make project called  " + name + " successfully!"
            this.printProjectsDownMenu(this.user.getTodoList())
            container.appendChild(h42);
        })
    }

    printProject(todoProject) {
        console.log(todoProject.getTodoItems())
        this.user.getTodoList().updateAllProjectsProgress()
        const projectName = document.createElement("h4")
        projectName.classList.add("project-head");
        projectName.textContent = todoProject.getName()
        const span = document.createElement("span");
        span.textContent = parseFloat(Math.ceil((todoProject.getProgress())).toPrecision(2)) + " % of progress";
        this.main.appendChild(projectName)
        projectName.appendChild(span)
        todoProject.getTodoItems().forEach((e) => {
            this.printItem(e);
        })
    }
    printTodoListProjects(todoList) {
        this.user.getTodoList().updateAllProjectsProgress()
        todoList.getProjects().forEach(e => {
            this.printProject(e);
        })
    }
    printEdit() {
        this.user.getTodoList().updateAllProjectsProgress()
        this.main.innerHTML = ""
        const select = document.createElement("select");
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
        div.classList.add("button")
        div.textContent = "submit"
        this.main.appendChild(form)
        form.appendChild(select)
        form.appendChild(titleParagraph)
        titleParagraph.appendChild(titleInput)
        form.appendChild(descriptionParagraph)
        descriptionParagraph.appendChild(descriptionInput)
        form.appendChild(expectedTimeParagraph)
        expectedTimeParagraph.appendChild(expectedTimeInput)
        form.appendChild(dueDateParagraph)
        dueDateParagraph.appendChild(dueDateInput)
        form.appendChild(priorityParagraph)
        priorityParagraph.appendChild(priorityInput)
        priorityInput.appendChild(pOption1)
        priorityInput.appendChild(pOption2)
        priorityInput.appendChild(pOption3)

        form.appendChild(notesParagraph)
        notesParagraph.appendChild(notesInput)
        form.appendChild(isCompletedParagraph)
        isCompletedParagraph.appendChild(isCompletedInput)
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

}
const user = new User("User", "User@gmail.com")
const item = new TodoItem("cooking", "cooking some meet and rice.", "2024-8-15", "1", "don't forget to make the time table", true, "02:00");
const item2 = new TodoItem("go to supermarket", "buy all needed grocery", "2024-8-18", "2", "don't forget to make the time table", false, "02:00");
const item3 = new TodoItem("go to gym", "this is to go to gym.", "2024-8-17", "2", "don't forget to do some pull ups ", true, "05:00")
const item4 = new TodoItem("coding", "practice for knew knowledge", " 2024-8-22", "3", "/", true, "12:00")
const item5 = new TodoItem("read documentations", "from the odin project", "2024-8-25", "3", "don't forget to edit the last project", true, "09:00")
const project = new TodoProject("Personal");
const project2 = new TodoProject("work");
project.addItem(item);
project.addItem(item3)
project.addItem(item2)
project2.addItem(item5)
project2.addItem(item4)
const printer = new UserGraphicInterface(user);
user.getTodoList().addProject(project)
user.getTodoList().addProject(project2)
printer.printEdit()


