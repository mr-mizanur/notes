 const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function showNotes(){
notesList.innerHTML = "";

notes.forEach((note,index)=>{

const li = document.createElement("li");

li.innerHTML = `
${note}
<button onclick="deleteNote(${index})"><i class="bi bi-trash"></i></button>
`;

notesList.appendChild(li);

});

}

function addNote(){

const note = noteInput.value;

if(note === "") return;

notes.push(note);

localStorage.setItem("notes",JSON.stringify(notes));

noteInput.value = "";

showNotes();

}


function deleteNote(index){
    notes.splice(index ,1)
    localStorage.setItem("notes",JSON.stringify(notes) )
    showNotes()
}
showNotes();