let list = document.getElementById("notesList");
let ed = document.getElementById("editor");
let empty = document.getElementById("empty");

let t = document.getElementById("t");
let b = document.getElementById("b");
let d = document.getElementById("d");
let c = document.getElementById("c");

let save = document.getElementById("save");
let del = document.getElementById("del");
let search = document.getElementById("search");
let add = document.getElementById("addBtn");

let data = JSON.parse(localStorage.getItem("notes") || "[]");
let cur = null;

render();


add.onclick = () => openNote();

function openNote(n){
    ed.classList.remove("hidden");
    empty.classList.add("hidden");

    if(n){
        cur = n.id;
        t.value = n.title;
        b.value = n.body;
        d.textContent = n.date;
        c.textContent = b.value.length + " chars";
        del.classList.remove("hidden");
    } else {
        cur = null;
        t.value = "";
        b.value = "";
        d.textContent = new Date().toLocaleString();
        c.textContent = "0 chars";
        del.classList.add("hidden");
    }
}


save.onclick = () => {
    let title = t.value.trim();
    let body = b.value.trim();
    if(!body) return;

    let obj = {
        id: cur || Date.now(),
        title: title || "Untitled",
        body: body,
        date: new Date().toLocaleString()
    };

    if(cur){
        data = data.map(x => x.id === cur ? obj : x);
    } else {
        data.push(obj);
    }

    localStorage.setItem("notes", JSON.stringify(data));
    render();
    openNote(obj);
};

del.onclick = () => {
    data = data.filter(x => x.id !== cur);
    localStorage.setItem("notes", JSON.stringify(data));
    ed.classList.add("hidden");
    empty.classList.remove("hidden");
    render();
};


function render(){
    list.innerHTML = "";
    data.forEach(n => {
        let d2 = document.createElement("div");
        d2.className = "item";
        d2.innerHTML = "<b>"+n.title+"</b><div class='small'>"+n.date+"</div>";
        d2.onclick = () => openNote(n);
        list.appendChild(d2);
    });
}


b.oninput = () => {
    c.textContent = b.value.length + " chars";
};

search.oninput = () => {
    let q = search.value.toLowerCase();
    document.querySelectorAll(".item").forEach(i => {
        i.style.display = i.innerText.toLowerCase().includes(q) ? "" : "none";
    });
};
