var dt;

function medicos(){
    $(".box-body").on("click","button#actualizar",function(){
         var datos=$("#fmedicos").serialize();
         $.ajax({
            type:"get",
            url:"./php/Medicos/ControladorMedicos.php",
            data: datos,
            dataType:"json"
          }).done(function( resultado ) {
              if(resultado.respuesta){
                swal(
                    'Actualizado!',
                    'Se actualizaron los datos correctamente',
                    'success'
                )     
                dt.ajax.reload();
                $("#titulo").html("Listado Medicos");
                $("#editar").html("");
                $("#editar").removeClass("show");
                $("#editar").addClass("hide");
                $("#listado").removeClass("hide");
                $("#listado").addClass("show")
             } else {
                swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'                         
                })
            }
        });
    })

    $(".box-body").on("click","a.borrar",function(){
        //Recupera datos del formulario
        var codigo = $(this).data("codigo");

        swal({
              title: '¿Está seguro?',
              text: "¿Realmente desea borrar lel medico con codigo : " + codigo + " ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Borrarlo!'
        }).then((decision) => {
                if (decision.value) {

                    var request = $.ajax({
                        method: "get",
                        url: "./php/Medicos/ControladorMedicos.php",
                        data: {codigo: codigo, accion:'borrar'},
                        dataType: "json"
                    })

                    request.done(function( resultado ) {
                        if(resultado.respuesta == 'correcto'){
                            swal(
                                'Borrado!',
                                'El medico con codigo : ' + codigo + ' fue borrado',
                                'success'
                            )     
                            dt.ajax.reload();                            
                        } else {
                            swal({
                              type: 'error',
                              title: 'Oops...',
                              text: 'Something went wrong!'                         
                            })
                        }
                    });
                     
                    request.fail(function( jqXHR, textStatus ) {
                        swal({
                          type: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!' + textStatus                          
                        })
                    });
                }
        })

    });

    $("#contenido").on("click","button.btncerrar2",function(){
        $("#titulo").html("Listado medicos");
        $("#nuevo-editar").html("");
        $("#nuevo-editar").removeClass("show");
        $("#nuevo-editar").addClass("hide");
        $("#medico").removeClass("hide");
        $("#medico").addClass("show");

    })

    $("#contenido").on("click","button.btncerrar",function(){
        $("#contenedor").removeClass("show");
        $("#contenedor").addClass("hide");
        $("#contenido").html('')
    })

    $(".box").on("click","#nuevo", function(){
      $(this).hide();
      $(".box-title").html("Crear Empleado");
      $("#editar").addClass('show');
      $("#editar").removeClass('hide');
      $("#listado").addClass('hide');
      $("#listado").removeClass('show');
      $("#editar").load('./php/Medicos/NuevoMedico.php', function(){
          $.ajax({
            type:"get",
            url:"./php/Sedes/ControladorSedes.php",
            data: {accion:'listar'},
            dataType:"json"
          }).done(function( resultado ) {                    ;
              $.each(resultado.data, function (index, value) { 
                $("#editar #id_sede").append("<option value='" + value.id_sede + "'>" + value.nom_sede + "</option>")
              });
          });
      });
      
  })

    $("#editar").on("click","button#grabar",function(){

      var datos=$("#fmedicos").serialize();
       $.ajax({
            type:"get",
            url:"./php/Medicos/ControladorMedicos.php",
            data: datos,
            dataType:"json"
          }).done(function( resultado ) {
              if(resultado.respuesta){
                swal(
                    'Grabado!!',
                    'El registro se grabó correctamente',
                    'success'
                ) 
                $(".box-title").html("Listado de medicos");
                $(".box #nuevo").show();
                $("#editar").html('');
                $("#editar").addClass('hide');
                $("#editar").removeClass('show');
                $("#listado").addClass('show');
                $("#listado").removeClass('hide');
                dt.page( 'last' ).draw( 'page' );
                dt.ajax.reload(null, false);                   
         } else {
            swal({
                position: 'center',
                type: 'error',
                title: 'Ocurrió un erro al grabar',
                showConfirmButton: false,
                timer: 1500
            });
           
        }
    });
});


    $(".box-body").on("click","a.editar",function(){
     //  $("#titulo").html("Editar medico");
       //Recupera datos del fromulario
       var codigo = $(this).data("codigo");
       var sede;
        $(this).hide();
        $(".box-title").html("Actualizar Medicos");
       $("#editar").addClass('show');
       $("#editar").removeClass('hide');
       $("#listado").addClass('hide');
       $("#listado").removeClass('show'); 

       /*$("#editar").removeClass("hide");
        $("#editar").addClass("show");
        $("#empleado").removeClass("show");
        $("#empleado").addClass("hide");
       */

       $("#editar").load("./php/Medicos/EditarMedico.php");

       $.ajax({
           type:"get",
           url:"./php/Medicos/ControladorMedicos.php",
           data: {codigo: codigo, accion:'consultar'},
           dataType:"json"
           }).done(function( medico ) {        
                if(medico.respuesta === "no existe"){
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'medico no existe!!!!!'                         
                    })
                } else {
                  $("#id_medico").val(medico.codigo);                   
                  $("#nom_medico").val(medico.empleado);
                  $("#Especialista").val(medico.Especialista);
                  $("#cedu_medico").val(medico.cedula);                   
                  $("#celu_medico").val(medico.celular);                   
                  $("#correo_medico").val(medico.correo);
                  sede = medico.sede;
                }
           });

           $.ajax({
            type:"get",
            url:"./php/Sedes/ControladorSedes.php", // falta poner el el controlador de sedes
            data: {accion:'listar'},
            dataType:"json"
          }).done(function( resultado ) {                     
             $("#id_sede option").remove();
             $.each(resultado.data, function (index, value) { 
               
               if(sede === value.id_sede){
                 $("#id_sede").append("<option selected value='" + value.id_sede + "'>" + value.nom_sede + "</option>")
               }else {
                 $("#id_sede").append("<option value='" + value.id_sede + "'>" + value.nom_sede + "</option>")
               }
             });
          });    
           
      })
   }

$(document).ready(() => {
  $("#contenido").off("click", "a.editar");
  $("#contenido").off("click", "button#actualizar");
  $("#contenido").off("click","a.borrar");
  $("#contenido").off("click","button#nuevo");
  $("#contenido").off("click","button#grabar");
  $("#titulo").html("Listado de Medicos");
  dt = $("#tabla").DataTable({
        "ajax": "php/Medicos/ControladorMedicos.php?accion=listar",
        "columns": [
            { "data": "id_medico"} ,
            { "data": "nom_medico" },
            { "data": "Especialista" },
            { "data": "celu_medico" },
            { "data": "cedu_medico" },
            { "data": "correo_medico" },
            { "data": "nom_sede" }, //se cambio el campo id_sede por nom_sede
            { "data": "id_medico",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-danger btn-sm borrar"> <i class="fa fa-trash"></i></a>' 
                }
            },
            { "data": "id_medico",
                render: function (data) {
                          return '<a href="#" data-codigo="'+ data + 
                                 '" class="btn btn-info btn-sm editar"> <i class="fa fa-edit"></i></a>';
                }
            }
        ]
  });
  medico();
});
