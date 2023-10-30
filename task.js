const form=document.getElementById("form")
const demo=document.getElementById("demo")
let table=document.getElementById("tab1")

let button=document.getElementById("button");

form.addEventListener('submit',function(e){
    e.preventDefault();

    const name=document.getElementById('name').value
    const uid=document.getElementById('id').value
    const title=document.getElementById('title').value
    const checkbox=document.getElementById('checkbox').checked



    var row=table.insertRow(table.rows.length);
    const cell1=row.insertCell(0);
    const cell2=row.insertCell(1);
    const cell3=row.insertCell(2);
    const cell4=row.insertCell(3);

    row.style.border="1px solid";
    row.style.borderCollapse = 'collapse';
    cell1.style.border="1px solid";
    cell1.style.borderCollapse = "collapse";
    cell2.style.border="1px solid";
    cell2.style.borderCollapse = "collapse";
    cell3.style.border="1px solid";
    cell3.style.borderCollapse = "collapse";
    cell4.style.border="1px solid";
    cell4.style.borderCollapse = "collapse";
    table.style.borderCollapse = "collapse";


    cell1.innerHTML=name;
    cell2.innerHTML=uid;
    cell3.innerHTML=title;
    
    cell4.innerHTML = checkbox ? "Yes" : "No";

         
    form.reset()  ;


})
