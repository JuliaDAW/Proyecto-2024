function inicio(){
    $("p").on("click", function(){ //cambiar campos del formulario
        let element=$(this).attr("class");
        registrado=0;
        switch(element){ //muestra o esconde el div correspondiente con los campos
            case "artista":
                $("#id_artista").removeClass("esconder");
                $("#id_album").addClass("esconder");
                $("#id_cancion").addClass("esconder");
                $("#id_hidden").val("artista");
                break;
            case "album":
                $("#id_artista").addClass("esconder");
                $("#id_album").removeClass("esconder");
                $("#id_cancion").addClass("esconder");
                $("#id_hidden").val("album");
                limpiar_select("album");
                obtener_datos("album");
                break;
            case "cancion":
                $("#id_artista").addClass("esconder");
                $("#id_album").addClass("esconder");
                $("#id_cancion").removeClass("esconder");
                $("#id_hidden").val("cancion");
                limpiar_select("cancion_art");
                obtener_datos("cancion");
                break;
        }
    });

    //paises e idiomas
    paises_idiomas();

    //esconder select del formulario canciones
    $("#id_si").on("click", function(){ $("#id_albCan").addClass("esconder"); });
    $("#id_no").on("click", function(){ $("#id_albCan").removeClass("esconder"); });

    $("#id_artCan").on("change", function(){ //obtiene y rellena el select album
        limpiar_select("cancion_alb");
        let artista=$("#id_artCan").val();
        $.ajax({
            type: "post",
            url: "php/obtener.php",
            data: {que: "select_album", id_art: artista, nocache: Math.random()},
            dataType: "json",
            success: function(datos){
                $(datos).each(function(album){
                    $("<option>", {
                        value: this.id,
                        text: this.nombre
                    }).appendTo("#id_albCan");
                });
            },
            error: function(error){
                //console.log(error);
                window.alert("Se ha producido un error");
            }
        });
    });

    //activa la función validar al clickar
    $("#id_aniadir_art").on("click", function(){validar();});
    $("#id_aniadir_alb").on("click", function(){validar();});
    $("#id_aniadir_can").on("click", function(){validar();});
};

function paises_idiomas(){ //obtiene y rellena los paises e idiomas
    $.ajax({ //paises
        type: "post",
        url: "php/arrays.php",
        data: {array: "paises", nocache: Math.random()},
        dataType: "json",
        success: function(paises){
            Object.entries(paises).forEach(([p, n]) => {
                $("#id_pais").append("<option value='"+p+"'>"+n+"</option>");
            });
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });

    $.ajax({ //idiomas
        type: "post",
        url: "php/arrays.php",
        data: {array: "idiomas", nocache: Math.random()},
        dataType: "json",
        success: function(idiomas){
            Object.entries(idiomas).forEach(([i, n]) => {
                $("#id_idioma").append("<option value='"+i+"'>"+n+"</option>");
            });
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function limpiar_select(tipo){ //elimina los datos del select
    if(tipo=="album"){
        let artAlb=document.getElementById("id_artAlb");
        while(artAlb.length>1){
            artAlb.lastChild.remove();
        }
    }
    if(tipo=="cancion_art"){
        let artCan=document.getElementById("id_artCan");
        while(artCan.length>1){
            artCan.lastChild.remove();
        }
    }
    if(tipo=="cancion_alb"){
        let albCan=document.getElementById("id_albCan");
        while(albCan.length>1){
            albCan.lastChild.remove();
        }
    }
}

function obtener_datos(tipo){ //obtener todos los artistas
    $.ajax({
        type: "post",
        url: "php/obtener.php",
        data: {que: "select_artista", nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            rellenar_select(tipo, datos);
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function rellenar_select(tipo, datos){ //rellena select con los datos recibidos
    let $e;
    if(tipo=="album") $e=$("#id_artAlb");
    if(tipo=="cancion") $e=$("#id_artCan");

    $(datos).each(function(artista){
        $("<option>", {
            value: this.id,
            text: this.nombre
        }).appendTo($e);
    });
}

function validar(){ //validar campos
    let er;
    let validado=true;
    let elemento=$("#id_hidden").val();

    switch(elemento){
        case "artista": //campos artista
            let nombre=$("#id_nombre_art").val();
            if(nombre==""){
                validado=false;
                window.alert("Nombre");
            }

            let grupo=$("#id_grupo").prop("checked");
            let solista=$("#id_solista").prop("checked");
            if(!grupo && !solista){
                validado=false;
                window.alert("Ocupación");
            }

            er=/^\d{4}$/;
            let fechaDebut=$("#id_fechaDebut").val();
            if(!er.test(fechaDebut)){
                validado=false;
                window.alert("Fecha");
            }

            let pais=$("#id_pais").val();
            if(pais==0){
                validado=false;
                window.alert("País");
            }

            let informacion=$("#id_informacion").val();
            if(informacion==""){
                validado=false;
                window.alert("Información");
            }

            let foto_art=$("#id_foto_art").val();
            if(foto_art==""){
                validado=false;
                window.alert("Foto");
            }
            break;
        case "album": //campos album
            let titulo_alb=$("#id_titulo_alb").val();
            if(titulo_alb==""){
                validado=false;
                window.alert("Título");
            }

            er=/^\d+$/;
            let nCancion=$("#id_nCanciones").val();
            if(!er.test(nCancion)){
                validado=false;
                window.alert("Número de canciones");
            }

            let fechaLanzamiento=$("#id_fechaLanzamiento").val();
            if(fechaLanzamiento==""){
                validado=false;
                window.alert("Fecha");
            }

            let artAlb=$("#id_artAlb").val();
            if(artAlb=="elegir"){
                validado=false;
                window.alert("Artista");
            }

            let foto_alb=$("#id_foto_alb").val();
            if(foto_alb==""){
                validado=false;
                window.alert("Foto");
            }
            break;
        case "cancion": //campos cancion
            let titulo_can=$("#id_titulo_can").val();
            if(titulo_can==""){
                validado=false;
                window.alert("Título");
            }

            let artCan=$("#id_artCan").val();
            if(artCan=="elegir"){
                validado=false;
                window.alert("Artista");
            }

            let si=$("#id_si").prop("checked");
            let no=$("#id_no").prop("checked");
            if(!si && !no){
                validado=false;
                window.alert("Single");
            } else{
                if(no){
                    let albCan=$("#id_albCan").val();
                    if(albCan=="elegir"){
                        validado=false;
                        window.alert("Álbum");
                    }
                }
            }

            let idioma=$("#id_idioma").val();
            if(idioma==0){
                validado=false;
                window.alert("Idioma");
            }

            let letra=$("#id_letra").val();
            if(letra==""){
                validado=false;
                window.alert("Letra");
            }

            let traduccion=$("#id_traduccion").val();
            if(traduccion==""){
                validado=false;
                window.alert("Traducción");
            }

            let audio=$("#id_audio").val();
            if(audio==""){
                validado=false;
                window.alert("Audio");
            }
            break;
    }

    if(validado) subir_archivo(elemento);
}

function subir_archivo(elemento){ //envía los datos y resetea el formulario
    if(elemento=="artista") $("#id_artista").submit();
    if(elemento=="album") $("#id_album").submit();
    if(elemento=="cancion") $("#id_cancion").submit();

    $("#id_artista").trigger("reset");
    $("#id_album").trigger("reset");
    $("#id_cancion").trigger("reset");
}