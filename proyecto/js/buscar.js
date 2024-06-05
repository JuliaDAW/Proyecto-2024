function inicio(){
    let buscar=$("#id_busqueda").attr("name");
    let datosB=$("#id_datosB").val();

    rellenar_filtros_elementos("b_artistas");
    rellenar_filtros_arrays("paises");

    controlar_checkSingle();
    
    if(buscar=="b_buscar"){ //datos por búsqueda en la barra
        filtros.push({buscar: datosB});
        resultados_globales("b_artistas");
        $("#id_filtros").addClass("esconder");
    } else if(datosB==undefined){ //todos los datos de un elemento
        if(buscar=="b_artistas"){
            $("#div_fArt").removeClass("esconder");
        }
        if(buscar=="b_albumes"){
            $("#div_fAlb").removeClass("esconder");
        }
        if(buscar=="b_canciones"){
            $("#div_fCan").removeClass("esconder");
        }

        resultados_elemento(buscar);
    }

    $("#id_filtrar").on("click", verificar);

    $("#id_inputB").on("click", function(){
        let valor=$("#id_busqueda").val();
        if(valor!="") $("#id_form_buscar").submit();
    });
}

var filtros=[];

function rellenar_filtros_elementos(elemento){ //obtiene artistas y álbumes para los filtros
    $.ajax({
        type: "post",
        url: "php/buscar_datos.php",
        data: {tipo: elemento, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(elemento=="b_artistas"){
                datos.forEach(art => {
                    $("#id_albArt").append("<option value='"+art.id+"'>"+art.nombre+"</option>");
                    $("#id_canArt").append("<option value='"+art.id+"'>"+art.nombre+"</option>");
                });
                rellenar_filtros_elementos("b_albumes");
            } else if(elemento=="b_albumes"){
                datos.forEach(alb => {
                    $("#id_canAlb").append("<option value='"+alb.id+"'>"+alb.nombre+"</option>");
                });
            }
        },
        error: function(error){
            //console.log(error);
            windowa.alert("Se ha producido un error");
        }
    });
}

function rellenar_filtros_arrays(array){ //obtiene paises, idiomas y géneros musicales para los filtros
    $.ajax({
        type: "post",
        url: "php/arrays.php",
        data: {array: array, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(array=="paises"){
                Object.entries(datos).forEach(([p, n]) => {
                    $("#id_paisDebut").append("<option value='"+p+"'>"+n+"</option>");
                });
                rellenar_filtros_arrays("idiomas");
            } else if(array=="idiomas"){
                Object.entries(datos).forEach(([i, n]) => {
                    $("#id_idioma").append("<option value='"+i+"'>"+n+"</option>");
                });
                rellenar_filtros_arrays("genMusicales");
            }/*else if(array=="genMusicales"){
                console.log(datos);
            }*/
        },
        error: function(error){
            //console.log(error);
            windowa.alert("Se ha producido un error");
        }
    });
}

function controlar_checkSingle(){ //controla que solo haya un check seleccionado
    //check de artista
    let solista=document.getElementById("id_ocSolista");
    let grupo=document.getElementById("id_ocGrupo");
    solista.onclick=function(){
        if(grupo.checked) grupo.checked=null;
    };
    grupo.onclick=function(){
        if(solista.checked!=false) solista.checked=null;
    };

    //check de canción
    let singleS=document.getElementById("id_singleS");
    let singleN=document.getElementById("id_singleN");
    singleS.onclick=function(){
        if(singleN.checked) singleN.checked=null;
        $("#id_canAlb").addClass("esconder");
    };
    singleN.onclick=function(){
        if(singleS.checked!=false) singleS.checked=null;
        if(singleN.checked){
            $("#id_canAlb").removeClass("esconder");
        } else{
            $("#id_canAlb").addClass("esconder");
        }
    };
}

function resultados_globales(t){ //obtiene todos los datos filtrados
    $.ajax({
        type: "post",
        url: "php/buscar_datos.php",
        data: {tipo: t, barraB: filtros, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(t=="b_artistas"){
                mostrar_datos(datos, t);
                resultados_globales("b_albumes");
            } else if(t=="b_albumes"){
                mostrar_datos(datos, t);
                resultados_globales("b_canciones");
            } else if(t=="b_canciones"){
                mostrar_datos(datos, t);
            }
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function resultados_elemento(buscar){ //obtiene datos de un elemento con o sin filtros
    $.ajax({
        type: "post",
        url: "php/buscar_datos.php",
        data: {tipo: buscar, filtro: filtros, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            console.log(datos);
            mostrar_datos(datos, buscar);
        },
        error: function(error){
            console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function mostrar_datos(datos, buscar){ //muestra los datos en pantalla
    let ruta="./archivos/"; //variable con la ruta de los archivos
    let nombre_e; //variable con la que se distingirá el elemento

    switch(buscar){
        case "b_artistas":
            ruta+="artistas/";
            nombre_e="art";
            break;
        case "b_albumes":
            ruta+="albumes/";
            nombre_e="alb";
            break;
        case "b_canciones":
            ruta+="canciones/";
            nombre_e="can";
            break;
    }

    datos.forEach(d => {
        let id=nombre_e+"_"+d.id;

        if(buscar=="b_canciones"){ //el elemento es canción
            $("#div_mCan").removeClass("esconder");
            $("#id_mCan").append(
                `<div class='viCanciones'>
                    <div class='divAudio'>
                        <audio src='`+ruta+d.archivo+`' id='`+id+`' controls></audio>
                    </div>
                    <div class='enlaceCancion'>
                        <a href='visualizacion.php?in=`+id+`'>
                            <p id='`+id+`'>`+d.nombre+`</p>
                            <p id='`+id+`'>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        } else if(buscar=="b_albumes"){ //el elemento es álbum
            $("#div_mAlb").removeClass("esconder");
            $("#id_mAlb").append(
                `<div class='viAlbumes'>
                    <div class='divPortada'>
                        <img src='`+ruta+d.archivo+`' id='`+id+`'/>
                    </div>
                    <div class='enlaceAlbum'>
                        <a href='visualizacion.php?in=`+id+`'>
                            <input type='hidden' name='id_e' value='`+id+`'/>
                            <p id='`+id+`'>`+d.nombre+`</p>
                            <p id='`+id+`'>`+d.artNombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        } else if(buscar=="b_artistas"){ //el elemento es artista
            $("#div_mArt").removeClass("esconder");
            $("#id_mArt").append(
                `<div class='viArtistas'>
                    <div class='divFoto'>
                        <img src='`+ruta+d.archivo+`' id='`+id+`'/>
                    </div>
                    <div class='enlaceArtista'>
                        <a href='visualizacion.php?in=`+id+`'>
                            <input type='hidden' name='id_e' value='`+id+`'/>
                            <p id='`+id+`'>`+d.nombre+`</p>
                        </a>
                    </div>
                </div>`
            );
        }
    });

    if(!$("#id_resultados").html()) console.log("No hay contenido"); //no hay contenido
}

function verificar(){ //verifica que al menos haya un filtro seleccionado
    filtros.splice(0, filtros.length); //limipia el array
    let validado=true;
    let buscar=$("#id_busqueda").attr("name");

    switch(buscar){
        case "b_artistas":
            let solista=$("#id_ocSolista").prop("checked");
            let grupo=$("#id_ocGrupo").prop("checked");
            let fechaDebut=$("#id_fechaDebut").val();
            let pais=$("#id_paisDebut").val();
            if(!solista && !grupo && fechaDebut=="" && pais==0){
                window.alert("Seleccione al menos 1 filtro");
                validado=false;
            } else{
                if(fechaDebut!="" && isNaN(fechaDebut)){
                    window.alert("Introduzca un valor válido en la año de debut");
                    validado=false;
                }

                let oc="";
                if(solista) oc=$("#id_ocSolista").val();
                if(grupo) oc=$("#id_ocGrupo").val();
                
                filtros.push({ocupacion: oc});
                filtros.push({fDebut: fechaDebut});
                filtros.push({pais: pais});
            }
            break;
        case "b_albumes":
            let nCancion=$("#id_nCanciones").val();
            let fechaLanzamiento=$("#id_fechaLanzamiento").val();
            let artistaAlb=$("#id_albArt").val();
            if(nCancion=="" && fechaLanzamiento=="" && artistaAlb==0){
                window.alert("Seleccione al menos 1 filtro");
                validado=false;
            } else{
                if(nCancion!="" && isNaN(nCancion)){
                    window.alert("Introduzca un valor válido en el número de canciones");
                    validado=false;
                }
                filtros.push({numCan: nCancion});
                filtros.push({fLanzamiento: fechaLanzamiento});
                filtros.push({artista: artistaAlb});
            }
            break;
        case "b_canciones":
            let singleS=$("#id_singleS").prop("checked");
            let singleN=$("#id_singleN").prop("checked");
            let artistaCan=$("#id_canArt").val();
            let idioma=$("#id_idioma").val();
            if(!singleS && !singleN && artistaCan==0 && idioma==0){
                window.alert("Seleccione al menos 1 filtro");
                validado=false;
            } else{
                let sg="";
                if(singleS) sg=$("#id_singleS").val();
                if(singleN) sg=$("#id_singleN").val();

                if(singleN){
                    let albumCan=$("#id_canAlb").val();
                    if(albumCan==0){
                        window.alert("Seleccione un álbum");
                        validado=false;
                    } else{
                        filtros.push({album: albumCan});
                    }
                } else if(singleS){
                    filtros.push({album: "0"});
                } else{
                    filtros.push({album: "-1"});
                }
                filtros.push({artista: artistaCan});
                filtros.push({single: sg});
                filtros.push({idioma: idioma});
            }
            break;
    }

    if(validado){
        limpiar_div(buscar);
        resultados_elemento(buscar);
    }
}

function limpiar_div(buscar){ //limpia los resultados que haya
    let reciente;
    if(buscar=="b_artistas") reciente=document.getElementById("id_mArt");
    if(buscar=="b_albumes") reciente=document.getElementById("id_mAlb");
    if(buscar=="b_canciones") reciente=document.getElementById("id_mCan");
    while(reciente.lastChild){ reciente.lastChild.remove(); }
}