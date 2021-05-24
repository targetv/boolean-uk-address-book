const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null,
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    const formEl = createElm("form", {
      className: "form-stack light-shadow center contact-form",
    });
    const h1El = createElm("h1", { innerText: "Edit Contact" });
    const firstNameLabel = createElm("label", {
      for: "first-name-input",
      innerText: "First Name:",
    });
    const firstNameInput = createElm("input", {
      id: "first-name-input",
      name: "first-name-input",
      type: "text",
    });

    const lastNameLabel = createElm("label", {
      for: "last-name-input",
      innerText: "Last Name:",
    });
    const lastNameInput = createElm("input", {
      id: "last-name-input",
      name: "last-name-input",
      type: "text",
    });
    const streetInputLabel = createElm("label", {
      for: "street-input",
      innerText: "Street:",
    });
    const streetInput = createElm("input", {
      name: "street-input",
      id: "street-input",
      type: "text",
    });
    const cityInputLabel = createElm("label", {
      for: "city-input",
      innerText: "City:",
    });
    const cityInput = createElm("input", {
      name: "city-input",
      id: "city-input",
      type: "text",
    });
    const postalInputLabel = createElm("label", {
      for: "post-code-input",
      innerText: "Post Code:",
    });
    const postalInput = createElm("input", {
      name: "post-code-input",
      id: "post-code-input",
      type: "text",
    });
    const checkboxSection = createElm("div", { className: "checkbox-section" });
    const checkboxEl = createElm("input", {
      id: "block-checkbox",
      name: "block-checkbox",
      type: "checkbox",
    });
    const checkboxLabel = createElm("label", {
      for: "block-checkbox",
      innerText: "Block",
    });

    const actionSection = createElm("div", { className: "actions-section" });
    const createButton = createElm("button", {
      className: "button blue",
      type: "submit",
      innerText: "Create",
    });
    actionSection.append(createButton);

    checkboxSection.append(checkboxEl, checkboxLabel);

    formEl.append(
      h1El,
      firstNameLabel,
      firstNameInput,
      lastNameLabel,
      lastNameInput,
      streetInputLabel,
      streetInput,
      cityInputLabel,
      cityInput,
      postalInputLabel,
      postalInput,
      checkboxSection,
      actionSection
    );
    formEl.addEventListener("submit", function (event) {
      event.preventDefault();
      fetch(`http://localhost:3000/contacts/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formEl["first-name-input"].value,
          lastName: formEl["last-name-input"].value,
          blockContact: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success", data);
        });

      fetch(`http://localhost:3000/addresses/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          street: formEl["street-input"].value,
          city: formEl["city-input"].value,
          postCode: formEl["post-code-input"].value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success", data);
        });
      const contactsEl = document.querySelector(".contacts-list");
      contactsEl.innerHTML = "";
      main();
    });

    viewSection.append(formEl);

    // [TODO] Write Code
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function createElm(tag, attobj) {
  const elm = document.createElement(tag);
  for (const key of Object.keys(attobj)) {
    elm[key] = attobj[key];
  }
  return elm;
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    // [TODO] Write Code
    const viewSection = document.querySelector(".view-section");
    const formEl = createContactForm();
    viewSection.append(formEl);
  });
}
function createContactForm() {
  const formEl = createElm("form", {
    className: "form-stack light-shadow center contact-form",
  });
  const h1El = createElm("h1", { innerText: "Create Contact" });
  const firstNameLabel = createElm("label", {
    for: "first-name-input",
    innerText: "First Name:",
  });
  const firstNameInput = createElm("input", {
    id: "first-name-input",
    name: "first-name-input",
    type: "text",
  });

  const lastNameLabel = createElm("label", {
    for: "last-name-input",
    innerText: "Last Name:",
  });
  const lastNameInput = createElm("input", {
    id: "last-name-input",
    name: "last-name-input",
    type: "text",
  });
  const streetInputLabel = createElm("label", {
    for: "street-input",
    innerText: "Street:",
  });
  const streetInput = createElm("input", {
    name: "street-input",
    id: "street-input",
    type: "text",
  });
  const cityInputLabel = createElm("label", {
    for: "city-input",
    innerText: "City:",
  });
  const cityInput = createElm("input", {
    name: "city-input",
    id: "city-input",
    type: "text",
  });
  const postalInputLabel = createElm("label", {
    for: "post-code-input",
    innerText: "Post Code:",
  });
  const postalInput = createElm("input", {
    name: "post-code-input",
    id: "post-code-input",
    type: "text",
  });
  const checkboxSection = createElm("div", { className: "checkbox-section" });
  const checkboxEl = createElm("input", {
    id: "block-checkbox",
    name: "block-checkbox",
    type: "checkbox",
  });
  const checkboxLabel = createElm("label", {
    for: "block-checkbox",
    innerText: "Block",
  });

  const actionSection = createElm("div", { className: "actions-section" });
  const createButton = createElm("button", {
    className: "button blue",
    type: "submit",
    innerText: "Create",
  });
  actionSection.append(createButton);

  checkboxSection.append(checkboxEl, checkboxLabel);

  formEl.append(
    h1El,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetInputLabel,
    streetInput,
    cityInputLabel,
    cityInput,
    postalInputLabel,
    postalInput,
    checkboxSection,
    actionSection
  );

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const firstname = formEl["first-name-input"].value;
    const lastname = formEl["last-name-input"].value;
    const streetname = formEl["street-input"].value;
    const cityname = formEl["city-input"].value;
    const postalcode = formEl["post-code-input"].value;
    postNewContact(firstname, lastname, streetname, cityname, postalcode);
  });

  return formEl;
}

function postNewContact(firstname, lastname, streetName, cityName, postalcode) {
  const newContactDetails = {
    firstName: firstname,
    lastName: lastname,
    blockContact: false,
    addressId: 3,
  };

  const addressesDetails = {
    street: streetName,
    city: cityName,
    postCode: postalcode,
  };

  fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContactDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success", data);
    });

  fetch("http://localhost:3000/addresses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressesDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success", data);
    });
  const contactsEl = document.querySelector(".contacts-list");
  contactsEl.innerHTML = "";
  main();
}
// [TODO] Write Code

function main() {
  listenNewContactButton();
  getContacts();
}

main();
