
console.log("RAPID NOTES");
showNotes();

// If user adds a note then store it in the local storages
// Add function
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let obj = {
        title: addTitle.value.toLowerCase(),
        text: addTxt.value.toLowerCase()
    }
    notesObj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
});


// To display all notes using localstorage
// Display function
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.text}</p>
                      <button onclick="deleteNote(this.id)" class="btn btn-primary" id="${index}">Delete</button>
                    </div>
                </div>`;
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html
    }
    else {
        notesElem.innerHTML = `No Saved Notes`;
    }
}

// Function to delete notes
// Delete function
function deleteNote(index) {
    // console.log("Deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Search function
let search = document.getElementById('srchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("search", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByClassName('card-body')[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
}) 
