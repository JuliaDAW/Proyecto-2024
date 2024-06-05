function inicio(){
    //elemento
    var tipoE=$("#id_tipoE").val();
    var idE=$("#id_idE").val();

    $("#id_principal").on("click", function(e){ //guardar o dar me gusta
        let mov=$(e.target).attr("name");
        let exis=$(e.target).attr("existe");
        if(mov=="gustar" || mov=="guardar") movimiento(mov, idE, exis);
    });
    $("#id_comentarios").on("click", function(e){
        if($(e.target).attr("id")=="id_publicar"){
            let coment=$("#id_coment").val();
            if(!coment=="") comentarios(coment, idE, 0);
        }
    });

    obtener_datos(tipoE, idE);

    let esconder=false;
    $("#id_comentarios").on("click", function(e){
        let tipoU=$("#id_tipoU").val();
        let idU=$("#id_idU").val();
        if(tipoU!="" && idU!=0){
            if($(e.target).attr("id")=="id_contestar"){
                esconder=true;
                if(esconder) $(e.target).addClass("esconder");

                let idC=$(e.target).attr("idComentario");
                $("#com_"+idC).append(
                    `<form id='form_coment'>
                        <legend>Responder</legend>
                        <input type='hidden' name='idCan' id='id_idCan' value='`+idE+`'/>
                        <input type='hidden' name='idUsu' id='id_idUsu' value='`+idU+`'/>
                        <input type='hidden' name='idCom' id='id_idCom' value='`+idC+`'/>
                        <input type='hidden' name='tipoUsu' id='id_tipoUsu' value='`+tipoU+`'/>
                        <textarea name='comentario' id='id_comentario`+idC+`'></textarea>
                        <input type='button' name='responder' id='id_responder' value='Responder'/>
                    </form>`
                );
            }
        }
    });

    $("#id_comentarios").on("click", function(e){
        if($(e.target).attr("id")=="id_responder"){
            let idC=$("#id_idCom").val();;
            let coment=$("#id_comentario"+idC).val();
            if(!coment=="") comentarios(coment, idE, idC);
        }
    });

    $("#id_buscar").on("click", function(){
        if($("#id_busqueda").val()!="") $("#id_form_buscar").submit();
    });
}

function obtener_datos(tipoE, idE){
    $.ajax({
        type: "post",
        url: "php/visualizar.php",
        data: {e: tipoE, id: idE, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            mostrar_datos(tipoE, datos, idE);
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function mostrar_datos(tipoE, datos, idE){ //muestra la información del elemento seleccionado
    var tipoU=$("#id_tipoU").val();
    var idU=$("#id_idU").val();
    let url=window.location.href;
    let datosE;
    switch(tipoE){
        case "art": //rellena el div principal con datos del artista
            $("#id_principal").append(
                `<div id='div_visualizar_foto'>
                    <figure>
                        <img src='./archivos/artistas/`+datos[0].archivo+`'/>
                        <figcaption>`+datos[0].nombre+` (`+datos[0].ocupacion+`)</figcaption>
                    </figure>
                </div>
                <div id='id_datos'>
                    <div id='div_datos'>
                        <p>Debut: `+datos[0].fecha_debut+`</p>
                    </div>
                    <div id='redesSociales'>
                        <h3>Comparte</h3>
                        <a href='https://www.linkedin.com/sharing/share-offsite/?url=`+url+`'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                            </svg>
                        </a>
                        <a href='https://twitter.com/intent/tweet?text=Descubre%20nueva%20musica&url=`+url+`&hashtags=musica'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                            </svg>
                        </a>
                        <a href='https://api.whatsapp.com/send?text=Descubre%20nueva%20musica'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>`
            );

            $("#id_informacionArt").append(`<div id='div_descripcion'></div>`);
            document.getElementById("id_informacionArt").innerHTML=datos[0].informacion;

            $.ajax({ //paises
                type: "post",
                url: "php/arrays.php",
                data: {array: "paises", nocache: Math.random()},
                dataType: "json",
                success: function(paises){
                    Object.entries(paises).forEach(([p, n]) => {
                        if(p==datos[0].pais_debut) $("#div_datos").append("<p>País: "+n+"</p>");
                    });
                },
                error: function(error){
                    //console.log(error);
                    window.alert("Se ha producido un error");
                }
            });
            
            datosE="art_alb";
            break;
        case "art_alb": //rellena el div secundario con los álbumes del artista
            datos.forEach(d => {
                $("#id_secundario").append(
                    `<div class='viAlbumes'>
                        <h3>Álbum</h3>
                        <div class='enlaceAlbum'>
                            <a href='visualizacion.php?in=alb_`+d.id+`'>
                                <p>`+d.nombre+`</p>
                            </a>
                        </div>
                    </div>`
                );
            });
            datosE="art_can";
            break;
        case "art_can": //rellena el div secundario con las canciones que pertencen a un álbum del artista
            datos.forEach(d => {
                $("#id_secundario").append(
                    `<div class='viCanciones'>
                        <h3>Canción</h3>
                        <div class='enlaceCancion'>
                            <p>
                                <a href='visualizacion.php?in=can_`+d.id+`'>`+d.nombre+`</a>
                            </p>
                        </div>
                    </div>`
                );
            });
            datosE="";
            break;
        case "alb": //rellena el div principal con datos del álbum
            $("#id_principal").append(
                `<div id='div_visualizar_portada'>
                    <figure>
                        <img src='./archivos/albumes/`+datos[0].archivo+`'/>
                        <figcaption>`+datos[0].nombre+`</figcaption>
                    </figure>
                </div>
                <div id='id_datos'>
                    <div id='div_datos'>
                        <p>Nº Canciones: `+datos[0].n_canciones+`</p>
                        <p>Lanzamiento: `+datos[0].fecha_lanzamiento+`</p>
                    </div>
                    <div id='redesSociales'>
                        <h3>Comparte</h3>
                        <a href='https://www.linkedin.com/sharing/share-offsite/?url=`+url+`'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                            </svg>
                        </a>
                        <a id='twitter' href='https://twitter.com/intent/tweet?text=Descubre%20nueva%20musica&url=`+url+`&hashtags=musica'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                                </svg>
                        </a>
                        <a href='https://api.whatsapp.com/send?text=Descubre%20nueva%20musica'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>`
            );
            datosE="alb_art";
            break;
        case "alb_art": //rellena con los datos del artista del álbum
            $("#id_secundario").append(
                `<div class='viArtistas'>
                    <h3>Artista</h3>
                    <div class='enlaceArtista'>
                        <p>
                            <a href='visualizacion.php?in=art_`+datos[0].id+`'>`+datos[0].nombre+`</a>
                        </p>
                    </div>
                </div>`
            );
            datosE="alb_can";
            break;
        case "alb_can": //rellena el div secundario con las canciones del álbum
            datos.forEach(d => {
                $("#id_secundario").append(
                    `<div class='viCanciones'>
                        <h3>Canción</h3>
                        <div class='enlaceCancion'>
                            <p>
                                <a href='visualizacion.php?in=can_`+d.id+`'>`+d.nombre+`</a>
                            </p>
                        </div>
                    </div>`
                );
            });
            datosE="";
            break;
        case "can": //rellena el div principal con datos de la canción
            $("#id_principal").append(
                `<div id='div_visualizar_audio'>
                    <figure>
                        <audio src='./archivos/canciones/`+datos[0].archivo+`' controls></audio>
                        <figcaption>`+datos[0].nombre+`</figcaption>
                    </figure>
                </div>
                <div id='id_datos'>
                    <div id='div_datos'></div>
                    <div id='redesSociales'>
                        <h3>Comparte</h3>
                        <a href='https://www.linkedin.com/sharing/share-offsite/?url=`+url+`'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                            </svg>
                        </a>
                        <a href='https://twitter.com/intent/tweet?text=Descubre%20nueva%20musica&url=`+url+`&hashtags=musica'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                            </svg>
                        </a>
                        <a href='https://api.whatsapp.com/send?text=Descubre%20nueva%20musica'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>`
            );

            if(tipoU!="" && idU!=0) comprobar_movimientos(datos[0].id, idU, tipoU);

            $("#id_letraduccion").append(
                `<div id='div_lyric'>
                    <div id='div_letra'>
                        <div class='idioma' id='idioma_original'></div>
                        <div class='letraduccion' id='letra'></div>
                    </div>
                    <div id='div_traduccion'>
                        <div class='idioma'>
                            <h3>Español</h3>
                        </div>
                        <div class='letraduccion' id='traduccion'></div>
                    </div>
                </div>`
            );
            document.getElementById("letra").innerHTML=datos[0].letra;
            document.getElementById("traduccion").innerHTML=datos[0].traduccion;

            $.ajax({ //idiomas
                type: "post",
                url: "php/arrays.php",
                data: {array: "idiomas", nocache: Math.random()},
                dataType: "json",
                success: function(idiomas){
                    Object.entries(idiomas).forEach(([i, n]) => {
                        if(i==datos[0].idioma) $("#idioma_original").append("<h3>"+n+"</h3>");
                    });
                },
                error: function(error){
                    //console.log(error);
                    window.alert("Se ha producido un error");
                }
            });

            datosE="can_art";
            break;
        case "can_art": //rellena con los datos del artista de la canción
            $("#id_secundario").append(
                `<div class='viArtistas'>
                    <h3>Artista</h3>
                    <div class='enlaceArtista'>
                        <p>
                            <a href='visualizacion.php?in=art_`+datos[0].id+`'>`+datos[0].nombre+`</a>
                        </p>
                    </div>
                </div>`
            );
            datosE="comentarios";
            break;
        case "comentarios": //rellena con los datos de los comentarios
            $("#id_comentarios").append("<h4>Comentarios</h4>");
            if(tipoU!="" && idU!=0){
                $("#id_comentarios").append(
                    `<form id='form_coment'>
                        <input type='hidden' name='idCan' id='id_idCan' value='`+idE+`'/>
                        <input type='hidden' name='idUsu' id='id_idUsu' value='`+idU+`'/>
                        <input type='hidden' name='tipoUsu' id='id_tipoUsu' value='`+tipoU+`'/>
                        <textarea name='coment' id='id_coment' placeholder='Anímate, déjanos saber tu opinión'></textarea>
                        <input type='button' name='publicar' id='id_publicar' value='Publicar'/>
                    </form>`
                );
            }

            let div=document.createElement("div");
            div.setAttribute("id", "div_comentarios");
            $("#id_comentarios").append(div);

            datos.forEach(d => {
                if(d.respondeA==0){
                    $("#div_comentarios").append(
                        `<div class='coment' id='com_`+d.id+`'>
                            <div class='datos' id='datos_`+d.id+`'>
                                <p>`+d.fecha+`</p>
                            </div>
                            <div class='comentario'
                                <p>`+d.contenido+`</p>
                            </div>`
                    );

                    if(tipoU!="" && idU!=0){
                        $("#div_comentarios").append("<input type='button' name='contestar' id='id_contestar' idComentario='"+d.id+"' value='Contestar'/>");
                    }

                    datos.forEach(r =>{
                        if(r.respondeA==d.id){
                            console.log(r);
                            $("#div_comentarios").append(
                                `<div class='respuesta' id='res_`+r.id+`'>
                                    <div class='datos' id='datos_`+r.id+`'>
                                        <p>`+r.fecha+`</p>
                                    </div>
                                    <div class='comentario'>
                                        <p>`+r.contenido+`</p>
                                    </div>
                                </div>`
                            );

                            $.ajax({
                                type: "post",
                                url: "php/visualizar.php",
                                data: {e: "nombreCom", id: r.id_usuario, tipo: r.persona, nocache: Math.random()},
                                dataType: "json",
                                success: function(nombre){
                                    $("#datos_"+r.id).append("<p>"+nombre[0]["nombre"]+" - "+r.persona+"</p>");
                                },
                                error: function(error){
                                    //console.log(error);
                                    window.alert("se ha producido un error");
                                }
                            });
                        }
                    });
                    $("#div_comentarios").append(`</div>`);

                    $.ajax({
                        type: "post",
                        url: "php/visualizar.php",
                        data: {e: "nombreCom", id: d.id_usuario, tipo: d.persona, nocache: Math.random()},
                        dataType: "json",
                        success: function(nombre){
                            $("#datos_"+d.id).append("<p>"+nombre[0]["nombre"]+" - "+d.persona+"</p>");
                        },
                        error: function(error){
                            //console.log(error);
                            window.alert("se ha producido un error");
                        }
                    });
                }
            });
            datosE="can_alb";
            break;
        case "can_alb": //rellena con los datos del álbum de la canción, si tiene
            $("#id_secundario").append(
                `<div class='viAlbumes'>
                    <h3>Álbum</h3>
                    <div class='enlaceAlbum'>
                        <p>
                            <a href='visualizacion.php?in=alb_`+datos[0].id+`'>`+datos[0].nombre+`</a>
                        </p>
                    </div>
                </div>`
            );
            datosE="";
            break;
    }

    if(datosE!=""){ obtener_datos(datosE, idE);
    } else if(datosE!=""){
        
    }
}

function comprobar_movimientos(idCancion, idU, tipoU){ //comprueba si existe alguno de los movimientos
    $.ajax({
        type: "post",
        url: "php/visualizar.php",
        data: {comprobar: "c", idCan: idCancion, idUsu: idU, tipoUsu: tipoU, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            let nm=datos.length;
            if(nm==2){ //los dos movimientos existen
                $("#div_datos").append(
                    `<label class='m'>
                        <input type='button' name='gustar' id='id_gustar' value='Quitar me gusta' existe='1' class='esconder'/>
                        <img src='./archivos/img/corazonRelleno.png' alt='Quitar me gusta'/>
                    </label>
                    <label class='m'>
                        <input type='button' name='guardar' id='id_guardar' value='Quitar de guardado' existe='1' class='esconder'/>
                        <img src='./archivos/img/guardarRelleno.png' alt='Quitar de guardados'/>
                    </label>`
                );
            } else if(nm==1){ //existe un movimiento
                datos.forEach(m=>{
                    if(m.movimiento=="gustar"){ //el movimiento que existe es gustar
                        $("#div_datos").append(
                            `<label class='m'>
                                <input type='button' name='gustar' id='id_gustar' value='Quitar me gusta' existe='1' class='esconder'/>
                                <img src='./archivos/img/corazonRelleno.png' alt='Quitar me gusta'/>
                            </label>
                            <label class='m'>
                                <input type='button' name='guardar' id='id_guardar' value='Guardar' existe='0' class='esconder'/>
                                <img src='./archivos/img/guardar.png' alt='Guardar'/>
                            </label>`
                        );
                    } else if(m.movimiento=="guardar"){ //el movimiento que existe es guardar
                        $("#div_datos").append(
                            `<label class='m'>
                                <input type='button' name='gustar' id='id_gustar' value='Me gusta' existe='0' class='esconder'/>
                                <img src='./archivos/img/corazon.png' alt='Me gusta'/>
                            </label>
                            <label class='m'>
                                <input type='button' name='guardar' id='id_guardar' value='Quitar de guardado' existe='1' class='esconder'/>
                                <img src='./archivos/img/guardarRelleno.png' alt='Quitar de guardados'/>
                            </label>`
                        );
                    }
                });
            } else{ //los dos movimientos no existen
                $("#div_datos").append(
                    `<label class='m'>
                        <input type='button' name='gustar' id='id_gustar' value='Me gusta' existe='0' class='esconder'/>
                        <img src='./archivos/img/corazon.png' alt='Me gusta'/>
                    </label>
                    <label class='m'>
                        <input type='button' name='guardar' id='id_guardar' value='Guardar' existe='0' class='esconder'/>
                        <img src='./archivos/img/guardar.png' alt='Guardar'/>
                    </label>`
                );
            }
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function movimiento(mov, idE, exis){ //registra en la base de datos lo que ha hecho el usuario
    var tipoU=$("#id_tipoU").val();
    var idU=$("#id_idU").val();
    $.ajax({
        type: "post",
        url: "php/visualizar.php",
        data: {m: mov, existe: exis, user: tipoU, idUser: idU, idElem: idE, nocache: Math.random()},
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

function comentarios(coment, idE, idCom){
    var tipoU=$("#id_tipoU").val();
    var idU=$("#id_idU").val();
    console.log(tipoU);
    $.ajax({
        type: "post",
        url: "php/visualizar.php",
        data: {com: "publicar", idElem: idE, idUsu: idU, pc: idCom, tipoUsu: tipoU, comentario: coment, nocache: Math.random()},
        dataType: "text",
        success: function(){
            window.location.reload();
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}