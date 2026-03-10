const div = document.createElement("div");

div.innerHTML = `

<div class="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-xl p-6">

<h1 class="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
<i class="bi bi-journal-text text-blue-500"></i>
My Notes
</h1>

<input
id="searchNote"
type="text"
placeholder="Search notes..."
class="input input-bordered w-full mb-4"
/>

<div class="flex gap-2 mb-4">

<input 
id="noteInput"
type="text"
placeholder="Write your note..."
class="input input-bordered w-full"
/>

<select id="noteCategory" class="select select-bordered">
<option>General</option>
<option>Study</option>
<option>Work</option>
<option>Personal</option>
</select>

<button onclick="addNote()" class="btn btn-primary">
<i class="bi bi-plus-lg"></i>
</button>

</div>

<ul id="notesList" class="space-y-3"></ul>

<p id="emptyMsg" class="text-center text-gray-400 text-sm mt-6">
No notes yet
</p>

</div>
`;

document.body.appendChild(div);


const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");
const emptyMsg = document.getElementById("emptyMsg");
const searchNote = document.getElementById("searchNote");
const noteCategory = document.getElementById("noteCategory");
const themeToggle = document.getElementById("themeToggle");

let notes = JSON.parse(localStorage.getItem("notes")) || [];


function showNotes(list = notes){

notesList.innerHTML = "";

if(list.length === 0){
emptyMsg.style.display = "block";
}else{
emptyMsg.style.display = "none";
}

list.forEach((note, index) => {

const li = document.createElement("li");

li.className = "flex justify-between items-start bg-white p-3 rounded-xl shadow";

li.innerHTML = `
<div class="flex flex-col flex-1">

<span class="font-semibold">${note.text}</span>

<span class="text-xs text-gray-500">
${note.category} • ${note.date}
</span>

</div>

<div class="flex gap-3">

<button onclick="pinNote(${index})" class="text-yellow-500">
<i class="bi ${note.pinned ? "bi-pin-angle-fill" : "bi-pin"}"></i>
</button>

<button onclick="editNote(${index})" class="text-blue-500">
<i class="bi bi-pencil"></i>
</button>

<button onclick="deleteNote(${index})" class="text-red-500">
<i class="bi bi-trash"></i>
</button>

</div>
`;

notesList.appendChild(li);

});

}


function addNote(){

const note = noteInput.value.trim();

if(note === "") return;

const noteObj = {

text: note,
category: noteCategory.value,
date: new Date().toLocaleString(),
pinned: false

};

notes.push(noteObj);

sortNotes();

localStorage.setItem("notes", JSON.stringify(notes));

noteInput.value = "";

showNotes();

}


function deleteNote(index){

notes.splice(index,1);

localStorage.setItem("notes", JSON.stringify(notes));

showNotes();

}


function editNote(index){

const newNote = prompt("Edit note", notes[index].text);

if(newNote !== null){

notes[index].text = newNote;
notes[index].date = new Date().toLocaleString();

localStorage.setItem("notes", JSON.stringify(notes));

showNotes();

}

}


function pinNote(index){

notes[index].pinned = !notes[index].pinned;

sortNotes();

localStorage.setItem("notes", JSON.stringify(notes));

showNotes();

}


function sortNotes(){

notes.sort((a,b) => {

if(a.pinned === b.pinned){

return new Date(b.date) - new Date(a.date);

}

return b.pinned - a.pinned;

});

}


searchNote.addEventListener("input", () => {

const value = searchNote.value.toLowerCase();

const filtered = notes.filter(n =>
n.text.toLowerCase().includes(value)
);

showNotes(filtered);

});


noteInput.addEventListener("keypress", (e) => {

if(e.key === "Enter"){
addNote();
}

});


function loadTheme(){

const savedTheme = localStorage.getItem("theme");

if(savedTheme){

document.documentElement.setAttribute("data-theme", savedTheme);

if(savedTheme === "dark"){
themeToggle.checked = true;
}

}

}


themeToggle.addEventListener("change", () => {

const theme = themeToggle.checked ? "dark" : "light";

document.documentElement.setAttribute("data-theme", theme);

localStorage.setItem("theme", theme);

});


loadTheme();
sortNotes();
showNotes();