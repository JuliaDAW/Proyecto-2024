function inicio(){
    $("#aniadidos").on("click", function(){
        $("#div_insert").removeClass("esconder");
        $("#div_update").addClass("esconder");
        $("#div_delete").addClass("esconder");
    });
    $("#modificados").on("click", function(){
        $("#div_insert").addClass("esconder");
        $("#div_update").removeClass("esconder");
        $("#div_delete").addClass("esconder");
    });
    $("#borrados").on("click", function(){
        $("#div_insert").addClass("esconder");
        $("#div_update").addClass("esconder");
        $("#div_delete").removeClass("esconder");
    });

    let orden="sin";

    datos_tablas("aniadir", orden);

    $("#id_admin").on("click", function(){
        orden=$("#id_admin").attr("name");
        limpiar_tablas();
        datos_tablas("aniadir", orden);
    });
    $("#id_tipoObjeto").on("click", function(){
        orden=$("#id_tipoObjeto").attr("name");
        limpiar_tablas();
        datos_tablas("aniadir", orden);
    });
    $("#id_nombreObjeto").on("click", function(){
        orden=$("#id_nombreObjeto").attr("name");
        limpiar_tablas();
        datos_tablas("aniadir", orden);
    });
    $("#id_fecha").on("click", function(){
        orden=$("#id_fecha").attr("name");
        limpiar_tablas();
        datos_tablas("aniadir", orden);
    });

    $("#id_buscar").on("click", function(){
        if($("#id_busqueda").val()!="") $("#id_form_buscar").submit();
    });
}

function limpiar_tablas(){
    let aniadir=document.getElementById("tbody_aniadir");
    let editar=document.getElementById("tbody_update");
    let borrar=document.getElementById("tbody_delete");
    while(aniadir.lastChild){ aniadir.lastChild.remove(); }
    while(editar.lastChild){ editar.lastChild.remove(); }
    while(borrar.lastChild){ borrar.lastChild.remove(); }
}

function datos_tablas(accion, orden){
    $.ajax({
        type: "post",
        url: "php/area_personal.php",
        data: {a: accion, o: orden, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(accion=="aniadir"){
                datos.forEach(d => {
                    $("#tbody_aniadir").append(
                        `<tr>
                            <td>`+d.adminNombre+`</td>
                            <td>`+d.objeto+`</td>
                            <td>`+d.nombre+`</td>
                            <td>`+d.fecha+`</td>
                        </tr>`
                    );
                });
                datos_tablas("editar", orden);
            }
            if(accion=="editar"){
                datos.forEach(d => {
                    $("#tbody_update").append(
                        `<tr>
                            <td>`+d.adminNombre+`</td>
                            <td>`+d.objeto+`</td>
                            <td>`+d.nombre+`</td>
                            <td>`+d.fecha+`</td>
                        </tr>`
                    );
                });
                datos_tablas("borrar", orden);
            }
            if(accion=="borrar"){
                datos.forEach(d => {
                    $("#tbody_delete").append(
                        `<tr>
                            <td>`+d.adminNombre+`</td>
                            <td>`+d.objeto+`</td>
                            <td>`+d.nombre+`</td>
                            <td>`+d.fecha+`</td>
                        </tr>`
                    );
                });
            }
        },
        error: function(error){
            console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}