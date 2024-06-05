$(document).ready(()=>{ //obtiene los valores de las variables de sesión y llama a dos funciones
    $.ajax({
        type: "post",
        url: "php/session.php",
        data: {nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            $("#id_tipoU").val(datos["usuario"]);
            $("#id_idU").val(datos["idUsuario"]);
            cerrarSesion();
            inicio();
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
});