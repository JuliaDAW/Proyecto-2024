function inicio(){
    let tipoE=$("#id_tipoE").val();
    let idE=$("#id_idE").val();
    
    if(tipoE==undefined && idE==undefined){ //si no hay elemento seleccionado
        elementos("art");
    } else{ //muestra los datos del elemento seleccionado
        datos_elemento(tipoE, idE);
    }

    $("#formulario").on("click", function(e){
        //obtiene el botón que ha sido clickado
        let name=$(e.target).attr("name");
        if(name=="update") validar(tipoE, idE);
        if(name=="delete"){
            let respuesta=window.confirm("¿Desea eliminar el siguiente elemento? Tenga en cuenta que si se borra un artista se eliminarán los álbumes y las canciones relacionada, así como al borrar un álbum se eliminarán las canciones relacionadas.");
            if(respuesta) eliminar();
        };

        //obtiene el radio que ha sido clickado
        let id=$(e.target).attr("id");
        if(id=="id_singleS") $("#id_albumCan").addClass("esconder");
        if(id=="id_singleN") $("#id_albumCan").removeClass("esconder");

        document.getElementById("id_artistaCan").addEventListener("change", cambiar_select);
    });
}

function elementos(elemento){ //obtiene los datos
    $.ajax({
        type: "post",
        url: "php/editar_eliminar.php",
        data: {ver: elemento, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            mostrar(datos, elemento);
            if(elemento=="art") elementos("alb");
            if(elemento=="alb") elementos("can");
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function mostrar(datos, elemento){ //muestra los datos a elegir
    let ruta="./archivos/";
    if(elemento=="art") ruta+="artistas/";
    if(elemento=="alb") ruta+="albumes/";
    if(elemento=="can") ruta+="canciones/";

    let mov=$("#id_movA").attr("name");

    datos.forEach(d => {
        let id=elemento+"_"+d.id;

        if(elemento=="can"){ //el elemento es canción
            $("#div_mCan").append(
                `<div class='viCanciones'>
                    <div class='divAudio'>
                        <audio src='`+ruta+d.archivo+`' id='`+id+`' controls></audio>
                    </div>
                    <div class='enlaceCancion'>
                        <a href='editar_borrar.php?mov=`+mov+`&in=`+id+`'>
                            <p>`+d.nombre+`</p>
                            <p>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        } else if(elemento=="alb"){ //el elemento es álbum
            $("#div_mAlb").append(
                `<div class='viAlbumes'>
                   <div class='divPortada'> 
                        <img src='`+ruta+d.archivo+`' id='`+id+`'/>
                    </div>
                    <div class='enlaceAlbum'>
                        <a href='editar_borrar.php?mov=`+mov+`&in=`+id+`'>
                            <p>`+d.nombre+`</p>
                            <p>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        } else{
            $("#div_mArt").append( //el elemento es artista
                `<div class='viArtistas'>
                    <div class='divFoto'>
                        <img src='`+ruta+d.archivo+`' id='`+id+`'/>
                    </div>
                    <div class='enlaceArtista'>
                        <a href='editar_borrar.php?mov=`+mov+`&in=`+id+`'>
                            <p>`+d.nombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        }
    });
}

function datos_elemento(tipoE, idE){ //obtiene los datos del elemento seleccionado
    $.ajax({
        type: "post",
        url: "php/editar_eliminar.php",
        data: {tipo: "s_"+tipoE, id: idE, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            mostrar_formulario(datos, tipoE);
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function mostrar_formulario(datos, tipoE){ //rellena el formulario con los datos recibidos
    let mov=$("#id_movA").attr("name");

    switch(tipoE){
        case "art":
            $("#formulario").append(
                `<label for='id_nombre'>Nombre:</label>
                    <input type='text' name='nombre_art' id='id_nombre_art' value="`+datos[0].nombre+`"/>
                    <br/>
                <label for='id_ocupacion'>Ocupación:</label>`
            );
            if(datos[0].ocupacion=="solista"){
                $("#formulario").append(
                    `<input type='radio' value='grupo' name='ocupacion' id='id_grupo'/>Grupo
                    <input type='radio' value='solista' name='ocupacion' id='id_solista' checked='checked'/>Solista`
                );
            } else if(datos[0].ocupacion=="grupo"){
                $("#formulario").append(
                    `<input type='radio' value='grupo' name='ocupacion' id='id_grupo' checked='checked'/>Grupo
                    <input type='radio' value='solista' name='ocupacion' id='id_solista'/>Solista`
                );
            }
            $("#formulario").append(
                `<br/>
                <label for='id_fechaDebut'>Año de debut:</label>
                    <input type='text' name='fechaDebut' id='id_fechaDebut' value='`+datos[0].fecha_debut+`'/>
                    <br/>
                <label for='id_pais'>País:</label>
                    <select name='pais' id='id_pais'></select>
                    <br/><br/>
                <label for='id_informacion'>Información:</label><br/>
                    <textarea name='informacion' id='id_informacion'>`+datos[0].informacion+`</textarea>
                    <br/>
                <label for='id_foto'>Foto:</label>
                    <input type='file' name='foto' id='id_foto' accept='image/*'/>
                    <br/>
                   <img src='./archivos/artistas/`+datos[0].archivo+`'/>`
            );

            //llamadas ajax
            $.ajax({ //paises
                type: "post",
                url: "php/arrays.php",
                data: {array: "paises", nocache: Math.random()},
                dataType: "json",
                success: function(paises){
                    Object.entries(paises).forEach(([p, n]) => {
                        if(datos[0].pais_debut==p){ //país que tenía establecido
                            $("#id_pais").append("<option selected='true' value='"+p+"'>"+n+"</option>");
                        } else{
                            $("#id_pais").append("<option value='"+p+"'>"+n+"</option>");
                        }
                    });
                },
                error: function(error){
                    //console.log(error);
                    window.alert("Se ha producido un error");
                }
            });
            break;
        case "alb":
            $("#formulario").append(
                `<label for='id_titulo_alb'>Título:</label>
                    <input type='text' name='titulo_alb' id='id_titulo_alb' value="`+datos[0].nombre+`"/>
                    <br/>
                <label for='id_nCanciones'>Número de canciones:</label>
                    <input type='text' name='nCanciones' id='id_nCanciones' value='`+datos[0].n_canciones+`'/>
                    <br/>
                <label for='id_fechaLanzamiento'>Fecha del lanzamiento:</label>
                    <input type='date' name='fechaLanzamiento' id='id_fechaLanzamiento' value='`+datos[0].fecha_lanzamiento+`'/>
                    <br/>
                <label for='id_artistaAlb'>Artista:</label>
                    <select name='artistaAlb' id='id_artistaAlb'></select>
                    <br/>
                <label for='id_portada'>Portada:</label>
                    <input type='file' name='portada' id='id_portada' accept='image/*'/>
                    <br/>
                <img src='./archivos/albumes/`+datos[0].archivo+`'/>`
            );

            //llamadas ajax
            $.ajax({ //artistas
                type: "post",
                url: "php/obtener.php",
                data: {que: "select_artista", nocache: Math.random()},
                dataType: "json",
                success: function(artista){
                    artista.forEach(art => {
                        if(datos[0].id_artista==art.id){
                            $("#id_artistaAlb").append("<option selected='true' value='"+art.id+"'>"+art.nombre+"</option>");
                        } else{
                            $("#id_artistaAlb").append("<option value='"+art.id+"'>"+art.nombre+"</option>");
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                    window.alert("Se ha producido un error");
                }
            });
            break;
        case "can":
            $("#formulario").append(
                `<label for='id_titulo_can'>Título:</label>
                    <input type='text' name='titulo_can' id='id_titulo_can' value="`+datos[0].nombre+`"/>
                    <br/>
                <label for=''>Artista:</label>
                    <select name='artistaCan' id='id_artistaCan'></select>
                    <br/>
                <label for='id_single'>Single:</label>`
            );
            $("#formulario").append("");
            if(datos[0].single=="si"){
                $("#formulario").append(
                    `<input type='radio' value='si' name='single' id='id_singleS' checked='checked'/>Sí
                    <input type='radio' value='no' name='single' id='id_singleN'/>No
                    <select class='esconder' name='albumCan' id='id_albumCan'></select>`
                );
            }
            if(datos[0].single=="no"){
                $("#formulario").append(
                    `<input type='radio' value='si' name='single' id='id_singleS'/>Sí
                    <input type='radio' value='no' name='single' id='id_singleN' checked='checked'/>No
                    <select name='albumCan' id='id_albumCan'></select>`
                );
            }
            $("#formulario").append(
                `<br/>
                <label for='id_idioma'>Idioma:</label>
                    <select name='idioma' id='id_idioma'></select>
                    <br/>
                <div id="letraduccion">
                    <div id="div_letra">
                        <label for='id_letra'>Letra:</label>
                            <br/>
                            <textarea name='letra' id='id_letra'>`+datos[0].letra+`</textarea>
                    </div>
                    <div id="div_traduccion">
                        <label for='id_traduccion'>Traducción:</label>
                            <br/>
                            <textarea name='traduccion' id='id_traduccion'>`+datos[0].traduccion+`</textarea>
                    </div>
                </div>
                <label for='id_audio'>Audio:</label>
                    <input type='file' name='audio' id='id_audio' accept='audio/*'/>
                    <br/>
                <audio src='./archivos/canciones/`+datos[0].archivo+`' controls></audio>
                    <br/>`
            );

            //llamadas ajax
            $.ajax({ //artistas
                type: "post",
                url: "php/obtener.php",
                data: {que: "select_artista", nocache: Math.random()},
                dataType: "json",
                success: function(artista){
                    artista.forEach(art => {
                        if(datos[0].id_artista==art.id){
                            $("#id_artistaCan").append("<option selected='true' value='"+art.id+"'>"+art.nombre+"</option>");
                        } else{
                            $("#id_artistaCan").append("<option value='"+art.id+"'>"+art.nombre+"</option>");
                        }
                    });

                    rellenar_albumes(datos); //rellena el select de los álbumes
                },
                error: function(error){
                    console.log(error);
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
                        if(datos[0].idioma==i){
                            $("#id_idioma").append("<option selected='true' value='"+i+"'>"+n+"</option>");
                        } else{
                            $("#id_idioma").append("<option value='"+i+"'>"+n+"</option>");
                        }
                    });
                },
                error: function(error){
                    //console.log(error);
                    window.alert("Se ha producido un error");
                }
            });
            break;
    }

    if(mov=="editar"){
        $("#formulario").append(
            `<input type='hidden' name='editar' id='id_editar' value='editar'/>
            <input type='button' name='update' id='id_update' value='Modificar'/>`
        );
    }
    if(mov=="borrar"){
        $("#formulario").append(
            `<input type='hidden' name='borrar' id='id_borrar' value='borrar'/>
            <input type='button' name='delete' id='id_delete' value='Eliminar'/>`
        );
    }
}

function validar(tipoE, idE){ //valida los datos introducidos
    let validado=true;
    let er;

    switch(tipoE){
        case "art":
            let nombre=$("#id_nombre_art").val();
            if(nombre==""){
                validado=false;
                window.alert("Nombre");
            }

            er=/^\d{4}$/;
            let fechaD=$("#id_fechaDebut").val();
            if(!er.test(fechaD)){
                validado=false;
                window.alert("Fecha");
            }

            let informacion=$("#id_informacion").val();
            if(informacion==""){
                validado=false;
                window.alert("Información");
            }
            break;
        case "alb":
            let tituloA=$("#id_titulo_alb").val();
            if(tituloA==""){
                validado=false;
                window.alert("Título");
            }

            er=/^\d+$/;
            let nCancion=$("#id_nCanciones").val();
            if(!er.test(nCancion)){
                validado=false;
                window.alert("Número canciones");
            }

            let fechaL=$("#id_fechaLanzamiento").val();
            if(fechaL==""){
                validado=false;
                window.alert("Fecha");
            }
            break;
        case "can":
            let tituloC=$("#id_titulo_can").val();
            if(tituloC==""){
                validado=false;
                window.alert("Título");
            }

            let singleN=$("#id_singleN").prop("checked");
            if(singleN){
                let album=$("#id_albumCan").val();
                if(album==0){
                    validado=false;
                    window.alert("Inserte un álbum o indique que es un single")
                }
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
            break;
    }

    if(validado) editar();
}

function editar(){
    $("#formulario").submit();
    $("#formulario").trigger("reset");
}

function eliminar(){ //elimina el elemento con el id pasado
    $("#formulario").submit();
    $("#formulario").trigger("reset");
}

function rellenar_albumes(datos){ //rellena el select con los álbumes del artista
    let idArt=$("#id_artistaCan").val();

    $.ajax({ //álbumes
        type: "post",
        url: "php/obtener.php",
        data: {que: "select_album", id_art: idArt, nocache: Math.random()},
        dataType: "json",
        success: function(album){
            if(album.length==0){
                $("#id_albumCan").append("<option value='0'>No hay álbumes disponibles</option>");
            } else{
                album.forEach(alb => {
                    if(datos[0].id_album==album.id){
                        $("#id_albumCan").append("<option selected='true' value='"+alb.id+"'>"+alb.nombre+"</option>");
                    } else{
                        $("#id_albumCan").append("<option value='"+alb.id+"'>"+alb.nombre+"</option>");
                    }
                });
            }
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function cambiar_select(){
    let value=$("#id_artistaCan").val();
    let albumes=document.getElementById("id_albumCan");
    while(albumes.length>0) albumes.lastChild.remove();

    $.ajax({ //álbumes
        type: "post",
        url: "php/obtener.php",
        data: {que: "select_album", id_art: value, nocache: Math.random()},
        dataType: "json",
        success: function(album){
            if(album.length==0){
                $("#id_albumCan").append("<option value='0'>No hay álbumes disponibles</option>");
            } else{
                $("#id_albumCan").append("<option value='0'>--Seleccione un álbum--</option>");
                album.forEach(alb => {
                    $("#id_albumCan").append("<option value='"+alb.id+"'>"+alb.nombre+"</option>");
                });
            }
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}