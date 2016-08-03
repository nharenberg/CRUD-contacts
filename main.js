$(() => {
  let contacts = contactsFromStorage();
  let $lis = contacts.map(contact => createLi(contact));
  $("#list").append($lis);

  $('#list').on("dblclick", "li", removeContact);
  $("#list").on("click", 'button.edit', openEditModal);

  $("#editContactForm").submit(saveUpdate);
  $("#contactForm").submit(addContact);

  //$("#contactForm").submit(addContact);
  $("#saveButton").on("click", saveUpdate);
  });


function saveUpdate() {
 // let index = $("#contactEditModal").data("index");
  var newContact = $("#editContact").val();

  updateContact(newContact);

 $("#contactEditModal").modal("hide");

}

function updateContact(newContact) {

  console.log(newContact);

  // writeToStorage(newContact);

  // console.log("contracts from storage", contactsFromStorage());
  // let arr = [];
  // arr.push(contactsFromStorage());

 // createLis(arr);

  // select the li, 

}

function openEditModal() {

  let index = $(this).parent().index();
  let contact = $(this).siblings('span').text();

  $("#editContact").val(contact);
  $("#contactEditModal").data('index', index);
  $("#contactEditModal").modal();
}


function removeContact() {
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}

function removeFromStorage(index) {

  let contacts = contactsFromStorage();
  contacts.splice(index, 1);
  addToStorage(contacts);
}


function addContact(event) {
  event.preventDefault();


  //$('.newContact').val('');

  let nameField = $("#nameField").val();
  let numberField = $("#numberField").val();
  let addressField = $("#addressField").val();

  let contact = `${nameField}, ${numberField}, ${addressField}`;

  console.log(contact);

  let $li = createLi(contact);


  $('#list').append($li);
  addToStorage(contact);
}


function createLi(contact) {

  let $li = $("#template").clone();
  $li.removeAttr("id");
  $li.children(".contact").text(contact);
  return $li;
}

function createLis(contacts) {
  //take an array of strings,
  //turn them into jQuery elements

  return contacts.map(contact => $("<li>").text(contact));
    
}


function addToStorage(contact) {

  // 1. Read
  // 2. Parse
  let contacts = contactsFromStorage() || [];
 

  // 3. Modify
  contacts.push(contact);

  
  // 4. Stringify
  // 5. Write
  writeToStorage(contacts);

}

function writeToStorage(contacts) {

  localStorage.contacts = JSON.stringify(contacts);

}

function contactsFromStorage() {
  // Read

  let json = localStorage.contacts;
  var contacts;

  //Parse
  try{
  contacts = JSON.parse(json);
  
  } catch(e){
    var contacts = [];
  }

  return contacts;
}