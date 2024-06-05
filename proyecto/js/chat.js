function inicio(){
    mensajes();

    $("#id_enviar").on("click", function(){
        let mensaje=$("#id_mensaje").val();
        if(mensaje!="") enviar(mensaje);
    })

    $("#id_buscar").on("click", function(){
        if($("#id_busqueda").val()!="") $("#id_form_buscar").submit();
    });
}

function mensajes(){
    $.ajax({
        type: "post",
        url: "php/chat.php",
        data: {mensajes: "recoger", nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            mostrar_mensajes(datos);
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function mostrar_mensajes(datos){
    let idU=$("#id_idU").val();
    let nombre;
    datos.forEach(m => {
        if(m.emisor==idU){
            let enviados=document.createElement("div");
            enviados.setAttribute("id", "chat_"+m.id);
            enviados.setAttribute("class", "enviados");
            $("#div_conversacion").append(enviados);
            nombre="Yo";
        } else{
            let recibidos=document.createElement("div");
            recibidos.setAttribute("id", "chat_"+m.id);
            recibidos.setAttribute("class", "recibidos");
            $("#div_conversacion").append(recibidos);
            nombre=m.nombre;
        }
        $("#chat_"+m.id).append(
            `<p>`+nombre+`</p>
            <p>`+m.contenido+`</p>
            <p>`+m.fecha+`</p>`
        );
    });
}

function enviar(mensaje){
    let idU=$("#id_idU").val();
    $.ajax({
        type: "post",
        url: "php/chat.php",
        data: {mensajes: "enviar", emisor: idU, receptor: 0, message: mensaje, nocache: Math.random()},
        dataType: "text",
        success: function(datos){
            window.location.reload();
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}