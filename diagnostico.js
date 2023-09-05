console.log("Hola desde aqui");
let usuarios = [];

const tb = document.getElementById("tb");
const modalRegister = new bootstrap.Modal('#modalRegister')

const modalUpdate = new bootstrap.Modal('#modalUpdate')

const inputName = document.getElementById("inputName")
const inputJob  = document.getElementById("inputJob") 

const updateJob = document.getElementById("updateJob")
const updateName = document.getElementById("updateName")

async function logUsers() {
  const response = await fetch("https://reqres.in/api/users");
  const users = await response.json();
  usuarios = users.data;
  console.log(usuarios);
  usuarios.forEach((usuario) => {
    tb.innerHTML += `<tr>
      <td>${usuario.id}</td>
    <td>${usuario.email}</td>
    <td>${usuario.first_name}</td>
    <td>${usuario.last_name}</td>
    <td> <img src="${usuario.avatar}" alt=""></td>
    <td> 
    <button class="btn btn-warning" onclick="showModalUpdate(${usuario.id})">Editar</button>
    <button class="btn btn-danger" onclick ="deletUser(${usuario.id})">Eliminar</button>
  </td>
    </tr>`;
  });
}

 function showModalRegister(){
  modalRegister.show()
 }

 async  function addUser(){
  try {
    const response = await fetch("https://reqres.in/api/users",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        usuario = {
          name: inputName.value,
          job : inputJob.value
        }
        
      ),
    });
    const result = await response.json();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha realizado el registro',
      showConfirmButton: false,
      timer: 1500
    })
    modalRegister.hide()
  } catch (error) {
    console.error(error)
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'No se logro',
      showConfirmButton: false,
      timer: 1500
    })
  }

 }

 function showModalUpdate(id){
  console.log(id)
  modalUpdate.show()
  fulldata(id)
 }


 async function fulldata (id){
  console.log(id)
  console.log(`https://reqres.in/api/users/${id}`)
  const response = await fetch(`https://reqres.in/api/users/${id}`);
  const users = await response.json();
  usuario = users.data;
  console.log(usuario);
   updateJob.value = usuario.first_name;
   updateName.value = usuario.last_name;

 }
 async  function updateUser(id){
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        usuario = {
          name: updateName.value,
          job : updateJob.value
        }
        
      ),
    });
    const result = await response.json();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha realizado la actualización',
      showConfirmButton: false,
      timer: 1500
    })
    modalUpdate.hide()
  } catch (error) {
    console.error(error)
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'No se logro',
      showConfirmButton: false,
      timer: 1500
    })
  }

 }

 async  function deletUser(id){
  console.log(id)
  console.log(`https://reqres.in/api/users/${id}`)
    const response = await fetch(`https://reqres.in/api/users/${id}`,{
      method:"DELETE",
    })
    .then(response =>{
      console.log(response)
      if(response.status === 204){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha elimnado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se logro',
          showConfirmButton: false,
          timer: 1500
        })
      }
    

    })


 }

logUsers();
