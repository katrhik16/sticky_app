//creating an array to store data, every single note has 2 main things 1.title 2.content. everynote an object is created (title & content)
// array
let notesData = [];
let generatedId = 0;

if (localStorage.getItem("notes") != null) {
  // JSON.parse convert string to array
  notesData = JSON.parse(localStorage.getItem("notes"));
  //checking the last element of the array
  generatedId = notesData[notesData.length - 1].id + 1;
}
//loading exisiting data into a new sticky notes
function displayExistingNotes() {
  notesData.forEach(function (oldNote, index) {
    let note = document.createElement("div");
    note.classList.add("note");
    let title = document.createElement("input");
    title.classList.add("title"); // add is a function
    title.setAttribute("placeholder", "Sticky Title...");
    title.setAttribute("type", "text");
    title.setAttribute("data-id", oldNote.id);
    title.value = oldNote.title;
    //elements title and content will have the same id has the object being generated, that is the relationship
    title.onkeyup = upDateTitle;
    //whenever i start typing in the title box the function updatetitle has to becalled
    //onkeyup means when i start typing pressing the keys

    let content = document.createElement("textarea");
    content.classList.add("content");
    content.setAttribute("placeholder", "Content Here");
    content.setAttribute("data-id", oldNote.id);
    content.value = oldNote.content;
    content.onkeyup = updateContent;

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "./delete.png";
    deleteBtn.setAttribute("data-id", oldNote.id);
    deleteBtn.onclick = deleteNote;

    // content element and note element should be added into the note element. putting a child into the parent
    note.appendChild(title);
    note.appendChild(content);
    note.appendChild(deleteBtn);

    document.getElementById("notes").appendChild(note);
  });
}
displayExistingNotes();

//creating html element using js
function newNote() {
  let note = document.createElement("div");
  note.classList.add("note");
  let title = document.createElement("input");
  title.classList.add("title"); // add is a function
  title.setAttribute("placeholder", "Sticky Title...");
  title.setAttribute("type", "text");
  title.setAttribute("data-id", generatedId);
  //elements title and content will have the same id has the object being generated, that is the relationship
  title.onkeyup = upDateTitle;
  //whenever i start typing in the title box the function updatetitle has to becalled
  //onkeyup means when i start typing pressing the keys

  let content = document.createElement("textarea");
  content.classList.add("content");
  content.setAttribute("placeholder", "Content Here");
  content.setAttribute("data-id", generatedId);
  content.onkeyup = updateContent;
  //delete is a keyword in javascript cant use it just like that
  let deleteBtn = document.createElement("img");
  deleteBtn.src = "./delete.png";
  deleteBtn.setAttribute("data-id", generatedId);
  deleteBtn.onclick = deleteNote;

  // content element and note element should be added into the note element. putting a child into the parent
  note.appendChild(title);
  note.appendChild(content);
  note.appendChild(deleteBtn);

  document.getElementById("notes").appendChild(note);
  //appendchild means what ever child is present add another child

  //when the arry is created i push a object which has blank data title and content, behaves like a storage
  notesData.push({ id: generatedId, title: "", content: "" });
  generatedId++;
  //note: the array as the string
  localStorage.setItem("notes", JSON.stringify(notesData));
}
//whenever something is wrtten in the input, the below function has to be called
function upDateTitle() {
  //how to access the input element inside the function
  //this keyword is available in js. to check use console.log(this) and check console whether its working or not.
  let titleId = Number(this.getAttribute("data-id"));
  let titleValue = this.value;
  let obj = notesData.find(function (note, index) {
    return note.id === Number(titleId);
  });
  obj.title = titleValue;
  localStorage.setItem("notes", JSON.stringify(notesData));
}
function updateContent() {
  //how to access the input element inside the function
  //this keyword is available in js. to check use console.log(this) and check console whether its working or not.
  let contentId = Number(this.getAttribute("data-id"));
  let contentValue = this.value;
  //used to find out the element
  let obj = notesData.find(function (note, index) {
    return note.id === contentId;
  });
  obj.content = contentValue;
  localStorage.setItem("notes", JSON.stringify(notesData));
}

function deleteNote() {
  //by using the below command we can go backwards to obtain the parent element
  let deleteId = Number(this.getAttribute("data-id"));
  //to delete any object from an array we need to find the index of it
  let index = notesData.findIndex(function (note, index) {
    return note.id === deleteId;
  });
  //helps in removing elements from an array
  notesData.splice(index, 1);
  this.parentNode.remove();
  localStorage.setItem("notes", JSON.stringify(notesData))
}
console.log(this.parentNode);
