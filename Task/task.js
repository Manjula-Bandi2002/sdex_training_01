const form = document.getElementById("form");
    const tableBody = document.getElementById("tablebody");
    const url = "https://mock-api-template-rh6s.onrender.com/users";
    const divPagination = document.getElementById("pagination-container");


    const itemsPerPage = 10;
    let currentPage = 1;
    let data = [];

    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const currentPageSpan = document.getElementById("currentPageSpan");

    window.addEventListener("load", () => {
        fetchData();
    });

    function fetchData() {
        fetch(url)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`Error fetching data: ${res.status} - ${res.statusText}`);
            }
            return res.json()
        })
            .then((fetchedData) => {
                data = fetchedData; 
                renderTable(currentPage);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }

    function createPaginationButtons(totalPages) {
        divPagination.innerHTML = '';

        // Previous page button
        const prevButton = document.createElement("button");
        prevButton.innerText = "← Previous";
        prevButton.addEventListener("click", () => goToPage(currentPage - 1));
        divPagination.appendChild(prevButton);

        const numButtonsToShow = 3; // You can change this number as needed
        const halfNumButtons = Math.floor(numButtonsToShow / 2);

        for (let i = currentPage - halfNumButtons; i <= currentPage + halfNumButtons; i++) {
            if (i >= 1 && i <= totalPages) {
                const paginationButton = document.createElement("button");
                paginationButton.innerText = i;
                paginationButton.addEventListener("click", () => goToPage(i));
                divPagination.appendChild(paginationButton);
            }
        }

        // Next page button
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next →";
        nextButton.addEventListener("click", () => goToPage(currentPage + 1));
        divPagination.appendChild(nextButton);
    }

    function goToPage(page) {
        if (page >= 1 && page <= Math.ceil(data.length / itemsPerPage)) {
            currentPage = page;
            renderTable(currentPage);
        }
    }

    function calculateTotalPages() {
        return Math.ceil(data.length / itemsPerPage);
    }

    function renderTable(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        pageData.forEach((element) => {
            const newRow = document.createElement("tr");
            const cellUserId = document.createElement("td");
            const cellid = document.createElement("td");
            const celltitle = document.createElement("td");
            const cellCompleted = document.createElement("td");
            const cellDeleted = document.createElement("button");
            cellDeleted.innerText = "Delete";
            cellDeleted.style.marginTop="10px"
            cellDeleted.style.backgroundColor="#b8e6bf"
            cellDeleted.style.marginLeft="5px"

            const cellUpdate = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.innerText = "Edit" ;
            editButton.style.backgroundColor="orange"

            cellUserId.innerHTML = element.userid;
            cellid.innerHTML = element.id;
            celltitle.innerHTML = element.title;
            cellCompleted.innerHTML = element.completed;

            if (cellCompleted.innerText === "true") {
                cellCompleted.style.color = "blue";
            } else {
                cellCompleted.style.color = "red";
            }

            cellDeleted.addEventListener("click", async function () {
                const confirmdel = confirm("Are you sure want to delete the entire row....?");
                if (confirmdel) {
                    let response = await fetch(url + "/" + element.id, { method: "DELETE" });
                    console.log(response);
                    fetchData();
                }
                alert('Deleted successfully.....');
            });

            editButton.addEventListener("click", function () {
                enterEditMode(element.id, element);
            });
            cellUpdate.appendChild(editButton);

            newRow.appendChild(cellUserId);
            newRow.appendChild(cellid);
            newRow.appendChild(celltitle);
            newRow.appendChild(cellCompleted);
            newRow.appendChild(cellDeleted);
            newRow.appendChild(cellUpdate);

            tableBody.appendChild(newRow);
        });

        createPaginationButtons(calculateTotalPages());

        currentPageSpan.textContent = page;
    }

    function addNewRecord(data) {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    alert("User created successfully....");
                    fetchData();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .catch((error) => {
                console.error("Error creating user: ", error);
            });
    }

    function updateExistingRecord(id, data) {
        fetch(url + `/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Data updated successfully🥳🥳🥳.......");
                    fetchData();
                } else {
                    throw Error("Network response was not ok");
                }
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const recordId = document.getElementById("recordId").value;
        const UserId = document.getElementById("name").value;
        const id = document.getElementById("id").value;
        const title = document.getElementById("title").value;
        const Completed = document.getElementById("checkbox").checked ? "true" : "false";
        console.log("clicked me");
        const obj = {
            userid: UserId,
            id,
            title,
            completed: Completed,
        };

        if (recordId) {
            updateExistingRecord(recordId, obj);
        } else {
            addNewRecord(obj);
        }

        
        form.reset();
    })

    function enterEditMode(id, data) {
        document.getElementById("recordId").value = id;
        document.getElementById("name").value = data.userid;
        document.getElementById("id").value = data.id;
        document.getElementById("title").value = data.title;
        document.getElementById("checkbox").checked = data.completed;
    }