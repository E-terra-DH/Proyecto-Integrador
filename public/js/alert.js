
function deleteUser(evt, id) {
  evt.preventDefault()

  sure('no floreciste???', id);

}
function sure(msg = "alerta de eliminación", id) {


  Swal.fire({
    title: '¿Estas seguro?',
    text: msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteData(id)
        .then(data => {
          location.replace('/')
        })
        .catch(error => console.log(error))
        ;


      Swal.fire(
        'Eliminado',
        'tu perfil se nos marchito',
        'ok'
      )
    }
  })


}

const deleteData = async (id) => {
  let api = 'http://localhost:3006/users/delete/' + id
  try {
    const response = await fetch(api, {
      method: 'DELETE'
    });
    return response.json();
  } catch (error) {
    console.log('Fetch Error', error);
  }
};







