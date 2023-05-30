
// document.getElementById
// Swal.fire({
//     title: 'Error!',
//     text: 'Estas seguro que deseas eliminar este usaurio',
//     icon: 'error',
//     confirmButtonText: 'Ok'
// })


Swal.fire({
  title: '¿Estas seguro?',
  text: "Esto no se puede revertir",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si eliminar'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Eliminado',
      'tu perfil se nos marchito',
      'ok'
    )
  }
})


// const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success',
//       cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false
//   })
  
//   swalWithBootstrapButtons.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, delete it!',
//     cancelButtonText: 'No, cancel!',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.isConfirmed) {
//       swalWithBootstrapButtons.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     } else if (
//       /* Read more about handling dismissals below */
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
//       swalWithBootstrapButtons.fire(
//         'Cancelled',
//         'Your imaginary file is safe :)',
//         'error'
//       )
//     }
//   })