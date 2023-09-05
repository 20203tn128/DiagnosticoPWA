console.log("Hola desde aqui")
let usuarios = []

const tr = document.getElementById("tr")
async function logUsers() {
    const response = await fetch("https://reqres.in/api/users");
    const users  = await response.json();
    console.log(users)
    usuarios = users.data
    console.log(usuarios)
  }
  logUsers()
tr.innerHTML +=`<tr>
<th scope="row">1</th>
<td>${usuarios}</td>
<td>${usuarios}</td>
<td>${usuarios}</td>
</tr>`

  