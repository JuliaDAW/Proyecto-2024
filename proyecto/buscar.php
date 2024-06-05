<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letraduccion</title>
    <link rel="shortcut icon" href="archivos/img/logo.png">
    <!--CSS-->
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/buscar.css">
    <!--JavaScript-->
    <script type="text/javascript" src="js/jquery/jquery-3.7.1.js"></script>
    <script type="text/javascript" src="js/buscar.js"></script>
    <script type="text/javascript" src="js/cerrar_sesion.js"></script>
    <script type="text/javascript" src="js/session.js"></script>
</head>
<body>
    <input type="hidden" name="tipoU" id="id_tipoU"/>
    <input type="hidden" name="idU" id="id_idU"/>

    <?php
        //error_reporting(0); //Para que no se vean los errores php

        switch($_GET["busqueda"]){
            case "buscar":
                echo "<input type='hidden' name='b_buscar' id='id_busqueda'/>";
                echo "<input type='hidden' name='datos_buscar' id='id_datosB' value='".$_POST["dBuscar"]."'/>";
                break;
            case "artistas":
                echo "<input type='hidden' name='b_artistas' id='id_busqueda'/>";
                break;
            case "albumes":
                echo "<input type='hidden' name='b_albumes' id='id_busqueda'/>";
                break;
            case "canciones":
                echo "<input type='hidden' name='b_canciones' id='id_busqueda'/>";
                break;
        }
    ?>

    <header>
        <h1><a href="index.html">Letraduccion</a></h1>
        <div class="header1">
            <p><a href="buscar.php?busqueda=artistas">Artistas</a></p>
            <p><a href="buscar.php?busqueda=albumes">Álbumes</a></p>
            <p><a href="buscar.php?busqueda=canciones">Canciones</a></p>
        </div>
        <div class="header2">
        <form id="id_form_buscar" action="buscar.php?busqueda=buscar" method="post">
                <input type="text" name="dBuscar" id="id_busqueda"/>
                <label id="id_buscar">
                    <input type="submit" name="inputB" id="id_inputB" class="esconder"/>
                    <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </label>
            </form>
        </div>
        <div class="header3">
            <p><a href="area_personal.html" id="id_areaPersonal">Área personal</a></p>
            <p><a href="inicio_sesion.html" id="id_crear">Iniciar sesión</a></p>
            <p><a href="" id="id_cerrar">Cerrar sesión</a></p>
        </div>
    </header>
    
    <div class="contenido">
        <div id="id_filtros">
            <div id="div_fArt" class="esconder">
                Solista<input type="checkbox" name="ocupacion" id="id_ocSolista" value="solista"/>
                Grupo<input type="checkbox" name="ocupacion" id="id_ocGrupo" value="grupo"/>
                    <br/><br/>
                Año de debut: <input type="text" name="fechaDebut" id="id_fechaDebut"/>
                    <br/><br/>
                País de debut: <select name="paisDebut" id="id_paisDebut">
                    <option value="0">--Seleccione un país--</option>
                </select>
            </div>
            <div id="div_fAlb" class="esconder">
                Número de canciones: <input type="text" name="nCanciones" id="id_nCanciones"/>
                    <br/><br/>
                Fecha del lanzamiento: <input type="date" name="fechaLanzamiento" id="id_fechaLanzamiento"/>
                    <br/><br/>
                Artista: <select name="albArt" id="id_albArt">
                    <option value="0">--Seleccione un artista--</option>
                </select>
            </div>
            <div id="div_fCan" class="esconder">
                Artista: <select name="canArt" id="id_canArt">
                    <option value="0">--Seleccione un artista--</option>
                </select>
                    <br/><br/>
                Single<input type="checkbox" name="single" id="id_singleS" value="si"/>
                Álbum<input type="checkbox" name="single" id="id_singleN" value="no"/>
                <select name="canAlb" id="id_canAlb" class="esconder">
                    <option value="0">--Seleccione un álbum--</option>
                </select>
                    <br/><br/>
                Idioma<select name="idioma" id="id_idioma">
                    <option value="0">--Seleccione un idioma--</option>
                </select>
            </div>
            <br/>
            <input type="button" name="filtrar" id="id_filtrar" value="Filtrar"/>
        </div>
        <div id="id_resultados">
            <div id="div_mArt" class="esconder">
                <h2>Artistas</h2>
                <div id="id_mArt"></div>
            </div>
            <div id="div_mAlb" class="esconder">
                <h2>Álbumes</h2>
                <div id="id_mAlb"></div>
            </div>
            <div id="div_mCan" class="esconder">
                <h2>Canciones</h2>
                <div id="id_mCan"></div>
            </div>
        </div>
    </div>
</body>
</html>