<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letraduccion</title>
    <link rel="shortcut icon" href="archivos/img/logo.png">
    <!--CSS-->
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/visualizar.css">
    <!--JavaScript-->
    <script type="text/javascript" src="js/jquery/jquery-3.7.1.js"></script>
    <script type="text/javascript" src="js/visualizacion.js"></script>
    <script type="text/javascript" src="js/cerrar_sesion.js"></script>
    <script type="text/javascript" src="js/session.js"></script>
</head>
<body>
    <input type="hidden" name="tipoU" id="id_tipoU"/>
    <input type="hidden" name="idU" id="id_idU"/>

    <?php
        //error_reporting(0); //Para que no se vean los errores php
        
        $datos=explode("_", $_GET["in"]);
        echo "<input type='hidden' name='tipoE' id='id_tipoE' value='".$datos[0]."'/>";
        echo "<input type='hidden' name='idE' id='id_idE' value='".$datos[1]."'/>";
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
        <div id="id_visualizar">
            <div id="id_principal"></div>
            <div id="id_informacionArt"></div>
            <div id="id_secundario"></div>
            <div id="id_letraduccion"></div>
            <div id="id_comentarios"></div>
        </div>
    </div>
</body>
</html>