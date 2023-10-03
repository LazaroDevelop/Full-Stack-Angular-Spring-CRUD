const API_URL = "http://localhost:8080/v1/api";

const formInsert = document.querySelector(".insert-api");
const successMessage = document.getElementById("response-success");
const errorMessage = document.getElementById("response-error");

const addAddress = document.getElementById("add-address");

const addPhoneNumber = document.getElementById("add-phone-number");

var count = 0;
var count1 = 0;

const formFindByName = document.querySelector(".find-by-name");
const res = document.querySelector("#response");

const formFindInAgeRange = document.querySelector("#find-in-age-range");

const cleaner = document.getElementById("cleaner");

const formFindByAddress = document.querySelector(".find-by-addresses");

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

addAddress.addEventListener("click", (e) => {
    e.preventDefault();
    const div = document.getElementById("address-div");
    if(div.childNodes.length <= 6){
        count++;
        console.log(count);
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Insert your address here";
        input.className = "form-control";
        input.id = "addresses".concat(count);
        div.appendChild(input);
    }else{
        alert("You only have 3 address");
    }
})

addPhoneNumber.addEventListener("click", (e) => {
    e.preventDefault();
    const div = document.getElementById("phone-number-div");
    if(div.childNodes.length <= 6){
        count1++;
        console.log(count1);
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add your phone number here";
        input.className = "form-control";
        input.id = "phoneNumber".concat(count1);
        div.appendChild(input);
    }else{
        alert("You only have 3 phone numbers");
    }
})

formInsert.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const secondName = document.getElementById("secondName").value;
    const addresses = document.getElementById("addresses").value;
    const addresses1 = document.getElementById("addresses1")?.value;
    const addresses2 = document.getElementById("addresses2")?.value;
    const dayOfBirth = document.getElementById("birthday").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneNumber1 = document.getElementById("phoneNumber1")?.value;
    const phoneNumber2 = document.getElementById("phoneNumber2")?.value;
    const personalPicture = document.getElementById("personalPicture").value;

    console.table(firstName, secondName, addresses, birthday, phoneNumber, personalPicture);
    const address = [addresses];

    if(addresses1 !== undefined && addresses1 !== null){
        address.push(addresses1);
    } 
    
    if(addresses2 !== undefined && addresses2 !== null){
        address.push(addresses2);
    }

    const phones = [phoneNumber];

    if(phoneNumber1 !== undefined && phoneNumber1 !== null){
        phones.push(phoneNumber1);
    }

    if(phoneNumber2 !== undefined && phoneNumber2 !== null){
        phones.push(phoneNumber2);
    }

    console.log(address);
    console.log(phones);

    const contact = {firstName: firstName, secondName: secondName, addresses: address, dayOfBirth: dayOfBirth, phoneNumbers: phones, personalPhoto: personalPicture};
    
    const performRequest = API_URL.concat("/create-profile");

    fetch(performRequest, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    }).then(response => {
        if(!response.ok){
            throw new Error("Error de red o servidor");
        }
        return response.json();
    }).then(data => {
        console.log("Data: ",data);
        formInsert.reset();
        successMessage.hidden = false;
        loadMainData(null);
    }).catch(error => {
        console.error("Error:", error);
    })
});


formFindByName.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("by-name").value;
    console.log(firstName);
    
    const performRequest = API_URL.concat(`/by-name?name=${name}`);
    console.log(performRequest);

    loadMainData(performRequest);
    formFindByFirstName.reset();
});

formFindByAddress.addEventListener("submit", (e) => {
    e.preventDefault();

    const address = document.getElementById("by-address").value;
    console.log(address);

    const performRequest = API_URL.concat(`/by-addresses?address=${address}`);
    console.log(performRequest);

    fetch(performRequest, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Error de red o servidor")
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })

})



formFindInAgeRange.addEventListener("submit", (e) => {
    e.preventDefault();

    const minAge = document.querySelector("#minAge").value;
    const maxAge = document.querySelector("#maxAge").value;
    const ageRange = {minAge: minAge, maxAge: maxAge};

    console.log(ageRange);

    const performRequest = API_URL.concat("/contacts/between-age-range");
    console.log(performRequest);

    fetch(performRequest, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ageRange)
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
            birthDayCell.textContent = i.dayOfBirth;
            birthDayCell.id = "birthDayRowInfo".concat(i.id);
            row.appendChild(birthDayCell);
            
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = i.phoneNumbers;
            phoneNumberCell.id = "phoneNumberRowInfo".concat(i.id);
            row.appendChild(phoneNumberCell);

            const personalPictureCell = document.createElement("td");
            personalPictureCell.textContent = i.personalPhoto;
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
                const currentDayOfBird = document.querySelector("#birthDayRowInfo".concat(i.id)).textContent;
                const currentPhoneNumbers = document.querySelector("#phoneNumberRowInfo".concat(i.id)).textContent;
                const currentPersonalPhoto = document.querySelector("#personalPictureRowInfo".concat(i.id)).textContent;
                
                const contact = {
                    firstName: currentFirstName, 
                    secondName: currentSecondName, 
                    addresses: [currentAddresses],
                    dayOfBirth: currentDayOfBird,
                    phoneNumbers: [currentPhoneNumbers],
                    personalPhoto: currentPersonalPhoto
                }

                console.log(contact);

                const performRequest = API_URL.concat("/modify-profile/").concat(i.id);
                console.log(performRequest);

                fetch(performRequest, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact)
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error de red o servidor");
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    alert(data);
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
                    alert(data);
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
        if(data.length === 0){
            alert("No hay elementos a mostrar...")
        }
        
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
            birthDayCell.textContent = i.dayOfBirth;
            birthDayCell.id = "birthDayRowInfo".concat(i.id);
            row.appendChild(birthDayCell);
            
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = i.phoneNumbers;
            phoneNumberCell.id = "phoneNumberRowInfo".concat(i.id);
            row.appendChild(phoneNumberCell);

            const personalPictureCell = document.createElement("td");
            personalPictureCell.textContent = i.personalPhoto;
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
                    addresses: [currentAddresses],
                    dayOfBirth: currentBirthDay,
                    phoneNumbers: [currentPhoneNumber],
                    personalPhoto: currentPersonalPicture
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
