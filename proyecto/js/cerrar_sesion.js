function cerrarSesion(){
    var tipoU=$("#id_tipoU").val();
    var idU=$("#id_idU").val();
    
    if(tipoU!="" || idU!=0){ //hay una sesión iniciada
        if(tipoU=="admin"){
            $("#id_areaPersonal").removeClass("esconder");
        } else{
            $("#id_areaPersonal").addClass("esconder");
        }
        $("#id_crear").addClass("esconder");
        $("#id_cerrar").removeClass("esconder");
        
    } else{ //no hay sesiones iniciadas
        $("#id_crear").removeClass("esconder");
        $("#id_cerrar").addClass("esconder");
        $("#id_areaPersonal").addClass("esconder");
    }

    //llama a una función para cerrar sesión
    $("#id_cerrar").on("click", function(){ cerrar_sesion(); })
}

function cerrar_sesion(){ //restablece los datos de la sesión iniciada
    $.ajax({
        type: "post",
        url: "php/session.php",
        data: {sesion: "cerrar", nocache: Math.random()},
        dataType: "text",
        success: function(datos){
            window.location.replace("./index.html");
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    })
}