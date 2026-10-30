window.onload = function() {

const quickAdd = document.getElementById("quickAdd");

const addressBook = document.getElementById("addressBook");
const fullname = document.getElementById("fullname");
const number = document.getElementById("number");
const email = document.getElementById("email");
const address = document.getElementById("address");

const addbookDiv = document.querySelector(".addbook");

const submit = document.getElementById("submit");
const cancel = document.getElementById("cancel");
const viewAddressBook = document.getElementById("viewAddressBook");


let contacts = [];


quickAdd.addEventListener("click",function(e) {
    e.preventDefault();
    addressBook.classList.remove("hidden");

});

addressBook.addEventListener("submit", function(e){
    e.preventDefault();
    addToBook();
});

cancel.addEventListener("click", function(e){
    e.preventDefault();
addressBook.classList.add("hidden");
clearForm();
});
viewAddressBook.addEventListener("click", function(){
    showAddressbook();
});


addbookDiv.addEventListener("click", removeEntry);

function jsonStructure(fullname, number, email, address){
    this.fullname  = fullname;
    this.number = number;
    this.email = email;
    this.address = address;
 }

 function addToBook(){
      const isValid =
            fullname.value.trim() !== "" &&
            number.value.trim() !== "" &&
            email.value.trim() !== "" &&
            address.value.trim() !== "" ;
            
        if (!isValid) {

            alert("Please fill in all fields.");

            return;

        }

        const obj = new jsonStructure(
            fullname.value.trim(),
            number.value.trim(),
            email.value.trim(),
            address.value.trim()
        );

          contacts.push(obj);

        saveAddressBook();

        addressBook.classList.remove("hidden");

        clearForm();

        showAddressbook();

    }

    function saveAddressBook() {

        localStorage.setItem(
            "addbook",
            JSON.stringify(contacts)
        );

    }

    function removeEntry(e) {

          if (e.target.classList.contains("delbutton")) {

            const remId = Number(
                e.target.getAttribute("data-id")
            );

            if (
                !Number.isInteger(remId) ||
                remId < 0 ||
                remId >= addressBook.length
            ) {
                return;
            }

            const confirmDelete = confirm(
                "Are you sure you want to delete this contact?"
            );

            if (!confirmDelete) {

                return;

            }

            addressBook.splice(remId, 1);

            saveAddressBook();

            showAddressbook();

        }

    }
     function clearForm() {

        addressBook.reset();

    }

    function showAddressbook() {

        const savedContacts = localStorage.getItem("addbook");
console.log("Saved contacts: ", savedContacts)
        if (savedContacts !== null) {

            try {

                const parsedContacts = JSON.parse(savedContacts);

                contacts = Array.isArray(parsedContacts)
                    ? parsedContacts
                    : [];

            } catch (error) {

                contacts = [];

            }

        } else {

            contacts = [];
  }


        addbookDiv.replaceChildren();

        if (contacts.length === 0) {

            const message = document.createElement("p");

            message.className = "empty-message";

            message.textContent = "No contacts yet. Add your first contact!";

            addbookDiv.appendChild(message);

            return;

        }

        contacts.forEach(function (contact, index) {

            const entry = document.createElement("div");

            entry.className = "entry";

            const nameDiv = document.createElement("div");

            nameDiv.className = "name";

            const nameText = document.createElement("p");

            nameText.textContent = contact.fullname;

            nameDiv.appendChild(nameText);

            const numberDiv = document.createElement("div");

            numberDiv.className = "number";

            const numberText = document.createElement("p");

            numberText.textContent = "Phone: " + contact.number;

            numberDiv.appendChild(numberText);

            const addressDiv = document.createElement("div");

            addressDiv.className = "address";

            const addressText = document.createElement("p");

            addressText.textContent = "Address: " + contact.address;

            addressDiv.appendChild(addressText);

            const emailDiv = document.createElement("div");

            emailDiv.className = "email";

            const emailText = document.createElement("p");

            emailText.textContent = "Email: " + contact.email;

            emailDiv.appendChild(emailText);

            const deleteButton = document.createElement("button");

            deleteButton.className = "delbutton";

            deleteButton.setAttribute("data-id", index);

            deleteButton.textContent = "Delete";

            deleteButton.type = "button";

            entry.append(
                nameDiv,
                numberDiv,
                addressDiv,
                emailDiv,
                deleteButton
            );

            addbookDiv.appendChild(entry);

        });

    }

};



