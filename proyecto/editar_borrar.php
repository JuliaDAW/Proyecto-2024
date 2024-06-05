<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letraduccion</title>
    <link rel="shortcut icon" href="archivos/img/logo.png">
    <!--CSS-->
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/aniadir_editar_borrar.css">
    <!--JavaScript-->
    <script type="text/javascript" src="js/jquery/jquery-3.7.1.js"></script>
    <script type="text/javascript" src="js/editar_borrar.js"></script>
    <script type="text/javascript" src="js/cerrar_sesion.js"></script>
    <script type="text/javascript" src="js/session.js"></script>
</head>
<body>
    <?php
        //error_reporting(0); //Para que no se vean los errores php

        if($_GET["mov"]=="editar") echo "<input type='hidden' name='editar' id='id_movA'/>";
        if($_GET["mov"]=="borrar") echo "<input type='hidden' name='borrar' id='id_movA'/>";
    ?>
    
    <header>
        <h1><a href="index.html">Letraduccion</a></h1>
        <div class="header3I">
            <p><a href="area_personal.html">Área personal</a></p>
        </div>
    </header>

    <div class="contenido">
        <?php
            if(isset($_GET["in"])){
                $datos=explode("_", $_GET["in"]);
                ?>
                    <div class="div_formularios">
                        <form id="formulario" method="post" action="./php/editar_eliminar.php" enctype="multipart/form-data">
                            <?php
                                echo "<input type='hidden' name='tipoU' id='id_tipoU'/>";
                                echo "<input type='hidden' name='idU' id='id_idU'/>";
                                echo "<input type='hidden' name='tipoE' id='id_tipoE' value='".$datos[0]."'/>";
                                echo "<input type='hidden' name='idE' id='id_idE' value='".$datos[1]."'/>";
                            ?>
                        </form>
                    </div>
                <?php
            } else{
                ?>
                    <div id='div_mSelect'>
                        <div id="div_mArt">
                            <h2>Artistas</h2>
                        </div>
                        <div id="div_mAlb">
                            <h2>Álbumes</h2>
                        </div>
                        <div id="div_mCan">
                            <h2>Canciones</h2>
                        </div>
                    </div>
                <?php
            }
        ?>
    </div>
</body>
</html>