const API_URL = "http://localhost:8080/v1/api";

const formInsert = document.querySelector(".insert-api");
const successMessage = document.getElementById("response-success");
const errorMessage = document.getElementById("response-error");


const formFindByFirstName = document.querySelector(".find-by-first-name");
const formFindBySecondName = document.querySelector(".find-by-second-name");
const res = document.querySelector("#response");

const formFindByDateRange = document.querySelector("#find-by-date-range");

const cleaner = document.getElementById("cleaner");

//table section
const table = document.querySelector(".table");
const tbody = table.querySelector(".tbody");

loadMainData(null);
// setInterval(loadMainData, 2000);

table.addEventListener("click", (e) => {
    var target = e.target;
    if(target.tagName === "TD"){
        cellEdit(target);
    }
});

cleaner.addEventListener("click", (e) => {
    e.preventDefault();

    loadMainData(null);
})

function cellEdit(cell){
    var currentContent = cell.innerHTML;

    var input = document.createElement("input");
    input.className = "bg-dark text-white";
    if(cell.id.toString().includes("birthDay")){
        input.type = "date";
        input.value = currentContent;
    }else{
        input.type = "text";
        input.value = currentContent;
    }

    cell.innerHTML = "";
    cell.appendChild(input);

    input.addEventListener("change", () => {
        saveChanges(cell, input.value);
    });

    input.focus();
}


function saveChanges(cell, value){
    cell.innerHTML = value;
}


formInsert.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const secondName = document.getElementById("secondName").value;
    const addresses = document.getElementById("addresses").value;
    const birthday = document.getElementById("birthday").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const personalPicture = document.getElementById("personalPicture").value;

    console.table(firstName, secondName, addresses, birthday, phoneNumber, personalPicture);

    const profile = {firstName: firstName, secondName: secondName, addresses: addresses, birthDay: birthday, phoneNumber: phoneNumber, personalPicture: personalPicture};
    
    const performRequest = API_URL.concat("/create-profile");

    fetch(performRequest, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    }).then(response => {
        if(!response.ok){
            throw new Error("Error de red o servidor");
        }
        return response.json();
    }).then(data => {
        console.log(data);
        formInsert.reset();
        successMessage.hidden = false;
        loadMainData(null);
    }).catch(error => {
        console.error("Error:", error);
    })
});


formFindByFirstName.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("by-first-name").value;
    console.log(firstName);
    
    const performRequest = API_URL.concat("/by-first-name/").concat(firstName);
    console.log(performRequest);

    loadMainData(performRequest);
    formFindByFirstName.reset();
});


formFindBySecondName.addEventListener("submit", (e) => {
    e.preventDefault();

    const secondName = document.getElementById("by-second-name").value;
    console.log(secondName);
    
    const performRequest = API_URL.concat("/by-second-name/").concat(secondName);
    console.log(performRequest);

    loadMainData(performRequest);
    formFindByFirstName.reset();
});


formFindByDateRange.addEventListener("submit", (e) => {
    e.preventDefault();

    const beginDate = document.querySelector("#beginDate").value;
    const endDate = document.querySelector("#endDate").value;
    const rangeDate = {beginDate: beginDate, endDate: endDate};

    console.log(rangeDate);

    const performRequest = API_URL.concat("/profiles/between-dates");
    console.log(performRequest);

    fetch(performRequest, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rangeDate)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Error de red o servidor");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }

        data.forEach(i => {

            const row = document.createElement("tr");

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = i.firstName;
            firstNameCell.id = "firstNameRowInfo".concat(i.id);
            row.appendChild(firstNameCell);

            const secondNameCell = document.createElement("td");
            secondNameCell.textContent = i.secondName;
            secondNameCell.id = "secondNameRowInfo".concat(i.id);
            row.appendChild(secondNameCell);

            const addressesCell = document.createElement("td");
            addressesCell.textContent = i.addresses;
            addressesCell.id = "addressesRowInfo".concat(i.id);
            row.appendChild(addressesCell);

            const birthDayCell = document.createElement("td");
            birthDayCell.textContent = i.birthDay.toString().substring(0, 10);
            birthDayCell.id = "birthDayRowInfo".concat(i.id);
            row.appendChild(birthDayCell);
            
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = i.phoneNumber;
            phoneNumberCell.id = "phoneNumberRowInfo".concat(i.id);
            row.appendChild(phoneNumberCell);

            const personalPictureCell = document.createElement("td");
            personalPictureCell.textContent = i.personalPicture;
            personalPictureCell.id = "personalPictureRowInfo".concat(i.id);
            row.appendChild(personalPictureCell);

            const updateTd = document.createElement("td");
            const updateBtn = document.createElement("button");
            updateBtn.textContent = "update";
            updateBtn.className = "btn btn-warning";
            updateBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const currentFirstName = document.querySelector("#firstNameRowInfo".concat(i.id)).textContent;
                const currentSecondName = document.querySelector("#secondNameRowInfo".concat(i.id)).textContent;
                const currentAddresses = document.querySelector("#addressesRowInfo".concat(i.id)).textContent;
                const currentBirthDay = document.querySelector("#birthDayRowInfo".concat(i.id)).textContent;
                const currentPhoneNumber = document.querySelector("#phoneNumberRowInfo".concat(i.id)).textContent;
                const currentPersonalPicture = document.querySelector("#personalPictureRowInfo".concat(i.id)).textContent;
                
                const currentProfile = {
                    firstName: currentFirstName, 
                    secondName: currentSecondName, 
                    addresses: currentAddresses,
                    birthDay: currentBirthDay,
                    phoneNumber: currentPhoneNumber,
                    personalPicture: currentPersonalPicture
                }

                console.log(currentProfile);

                const performRequest = API_URL.concat("/modify-profile/").concat(i.id);
                console.log(performRequest);

                fetch(performRequest, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentProfile)
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error de red o servidor");
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    loadMainData();
                })
                .catch(error => {
                    console.error("Error: ", error);
                })
            })
            updateTd.appendChild(updateBtn);
            row.appendChild(updateTd);

            const deleteTd = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            deleteBtn.className = "btn btn-danger";
            deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                
                const performRequest = API_URL.concat("/delete-profile/").concat(i.id);
                console.log(performRequest);
                console.log(i.id);

                fetch(performRequest, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error de red o servidor");
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    loadMainData();
                })
                .catch(error => {
                    console.error("Error: ", error);
                })
            })
            deleteTd.appendChild(deleteBtn);
            row.appendChild(deleteTd);

            tbody.appendChild(row);
        });
        console.log(data);
    })
    .catch(error => {
        console.error("Error: ", error);
    })
});


function loadMainData(performRequest){
    if(performRequest === null || performRequest === undefined){
        performRequest = API_URL.concat("/all");    
    }

    fetch(performRequest, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if(!response.ok){
            throw new Error("Error de red o servidor");
        }
        return response.json();
    }).then(data => {
        
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }

        data.forEach(i => {

            const row = document.createElement("tr");

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = i.firstName;
            firstNameCell.id = "firstNameRowInfo".concat(i.id);
            row.appendChild(firstNameCell);

            const secondNameCell = document.createElement("td");
            secondNameCell.textContent = i.secondName;
            secondNameCell.id = "secondNameRowInfo".concat(i.id);
            row.appendChild(secondNameCell);

            const addressesCell = document.createElement("td");
            addressesCell.textContent = i.addresses;
            addressesCell.id = "addressesRowInfo".concat(i.id);
            row.appendChild(addressesCell);

            const birthDayCell = document.createElement("td");
            birthDayCell.textContent = i.birthDay.toString().substring(0, 10);
            birthDayCell.id = "birthDayRowInfo".concat(i.id);
            row.appendChild(birthDayCell);
            
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = i.phoneNumber;
            phoneNumberCell.id = "phoneNumberRowInfo".concat(i.id);
            row.appendChild(phoneNumberCell);

            const personalPictureCell = document.createElement("td");
            personalPictureCell.textContent = i.personalPicture;
            personalPictureCell.id = "personalPictureRowInfo".concat(i.id);
            row.appendChild(personalPictureCell);

            const updateTd = document.createElement("td");
            const updateBtn = document.createElement("button");
            updateBtn.textContent = "update";
            updateBtn.className = "btn btn-warning"
            updateBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const currentFirstName = document.querySelector("#firstNameRowInfo".concat(i.id)).textContent;
                const currentSecondName = document.querySelector("#secondNameRowInfo".concat(i.id)).textContent;
                const currentAddresses = document.querySelector("#addressesRowInfo".concat(i.id)).textContent;
                const currentBirthDay = document.querySelector("#birthDayRowInfo".concat(i.id)).textContent;
                const currentPhoneNumber = document.querySelector("#phoneNumberRowInfo".concat(i.id)).textContent;
                const currentPersonalPicture = document.querySelector("#personalPictureRowInfo".concat(i.id)).textContent;
                
                const currentProfile = {
                    firstName: currentFirstName, 
                    secondName: currentSecondName, 
                    addresses: currentAddresses,
                    birthDay: currentBirthDay,
                    phoneNumber: currentPhoneNumber,
                    personalPicture: currentPersonalPicture
                }

                console.log(currentProfile);

                const performRequest = API_URL.concat("/modify-profile/").concat(i.id);
                console.log(performRequest);

                fetch(performRequest, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentProfile)
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error de red o servidor");
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    loadMainData();
                })
                .catch(error => {
                    console.error("Error: ", error);
                })
            })
            updateTd.appendChild(updateBtn);
            row.appendChild(updateTd);

            const deleteTd = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            deleteBtn.className = "btn btn-danger";
            deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                
                const performRequest = API_URL.concat("/delete-profile/").concat(i.id);
                console.log(performRequest);
                console.log(i.id);

                fetch(performRequest, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error de red o servidor");
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    loadMainData();
                })
                .catch(error => {
                    console.error("Error: ", error);
                })
            })
            deleteTd.appendChild(deleteBtn);
            row.appendChild(deleteTd);

            tbody.appendChild(row);
        });
        console.log(data);

    }).catch(error => {
        console.error("Error:", error);
    })
}
