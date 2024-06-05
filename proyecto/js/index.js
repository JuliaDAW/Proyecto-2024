function inicio(){
    let idU=$("#id_idU").val();
    let tipoU=$("#id_tipoU").val();
    if(idU==0 && tipoU==""){
        $("#guardadas").addClass("esconder");
    } else{
        $("#guardadas").removeClass("esconder");
    }

    limpiar_divs();
    rellenar("recientes", idU, tipoU);

    $("#id_buscar").on("click", function(){
        if($("#id_busqueda").val()!="") $("#id_form_buscar").submit();
    });
}

function limpiar_divs(){ //vacía los divs
    let reciente=document.getElementById("mas_recientes");
    let popular=document.getElementById("mas_populares");
    let guardado=document.getElementById("guardadas");
    while(reciente.lastChild-1){ reciente.lastChild.remove(); }
    while(popular.lastChild-1){ popular.lastChild.remove(); }
    while(guardado.lastChild-1){ popular.lastChild.remove(); }
}

function rellenar(tipo, idU, tipoU){
    $.ajax({
        type: "post",
        url: "php/obtener.php",
        data: {que: tipo, idUsu: idU, tipoUsu: tipoU, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(tipo=="recientes"){
                mostrar_datos(datos, tipo);
                rellenar("guardadas", idU, tipoU);
            }
            if(tipo=="guardadas"){
                mostrar_datos(datos, tipo);
                rellenar("populares");
            }
            if(tipo=="populares"){
                let n=1;
                datos.forEach(d => {
                    $.ajax({
                        type: "post",
                        url: "php/obtener.php",
                        data: {que: "obtenerPopulares", idElem: d.id_cancion, nocache: Math.random()},
                        dataType: "json",
                        success: function(datos){
                            mostrar_datos(datos, "populares", n);
                            n++;
                        },
                        error: function(error){
                            //console.log(error);
                            window.alert("Se ha producido un error");
                        }
                    });
                });
            }
        },
        error: function(error){
            console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function mostrar_datos(datos, tipo, n){
    let ruta="./archivos/canciones/";
    let nombre="can_";

    datos.forEach(d => {
        let url=nombre+d.id;

        if(tipo=="recientes"){
            $("#div_recientes").append(
                `<div class='viCanciones'>
                    <div class='divAudio'>
                        <audio class='audio' src='`+ruta+d.archivo+`' controls></audio>
                    </div>
                    <div class='enlaceCancion'>
                        <a href='visualizacion.php?in=`+url+`'>
                            <p>`+d.nombre+`</p>
                            <p>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        }
        if(tipo=="populares"){
            $("#div_populares").append(
                `<p class='posicion'>`+n+`º</p>
                <div class='viCanciones'>
                    <div class='divAudio'>
                        <audio class='audio' src='`+ruta+d.archivo+`' controls></audio>
                    </div>
                    <div class='enlaceCancion'>
                        <a href='visualizacion.php?in=`+url+`'>
                            <p>`+d.nombre+`</p>
                            <p>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        }
        if(tipo=="guardadas"){
            $("#div_guardadas").append(
                `<div class='viCanciones'>
                    <div class='divAudio'>
                        <audio class='audio' src='`+ruta+d.archivo+`' controls></audio>
                    </div>
                    <div class='enlaceCancion'>
                        <a href='visualizacion.php?in=`+url+`'>
                            <p>`+d.nombre+`</p>
                            <p>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        }
    });
}