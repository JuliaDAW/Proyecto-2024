<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    switch($_POST["que"]){
        //aniadir.js
        case "select_artista": //obtiene todos los artistas
            $sql=$conexion->prepare("SELECT id, nombre FROM artistas ORDER BY nombre");
            $sql->execute();
            break;
        case "select_album": //obtiene los albumes que tengan el id
            $array=array(":id_art"=>$_POST["id_art"]);
            $sql=$conexion->prepare("SELECT alb.id, alb.nombre FROM albumes alb JOIN artistas art ON alb.id_artista=art.id WHERE alb.id_artista=:id_art ORDER BY alb.nombre");
            $sql->execute($array);
            break;
        //inicio_sesion.js
        case "crearSesion": //obtiene la cantidad de usuarios con ese nombre o correo
            $array=array(":nombre"=>$_POST["nombreU"],
                ":correo"=>$_POST["email"]
            );
            $sql=$conexion->prepare("SELECT count(*) as existe FROM usuarios WHERE nombre=:nombre OR correo=:correo");
            $sql->execute($array);
            break;
        //index.js
        case "recientes": //obtiene las canciones insertadas más recientes
            $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM artistas art JOIN canciones can ON can.id_artista=art.id JOIN acciones acc ON can.id=acc.id_objeto WHERE objeto='cancion' AND accion='aniadir' ORDER BY acc.fecha LIMIT 10");
            $sql->execute();
            break;
        case "guardadas":
            $array=array(":idU"=>$_POST["idUsu"],
                ":tipoU"=>$_POST["tipoUsu"]
            );
            $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM artistas art JOIN canciones can ON can.id_artista=art.id JOIN movimientos mov ON mov.id_cancion=can.id WHERE mov.id_usuario=:idU AND tipoU=:tipoU AND mov.movimiento='guardar'");
            $sql->execute($array);
            break;
        case "populares": //obtiene las canciones con mayor votación
            $sql=$conexion->prepare("SELECT id_cancion, COUNT(*) AS nGustar FROM movimientos WHERE movimiento='gustar' GROUP BY id_cancion ORDER BY nGustar DESC LIMIT 10");
            $sql->execute();
            break;
        case "obtenerPopulares":
            $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM canciones can JOIN artistas art ON can.id_artista=art.id WHERE can.id='".$_POST["idElem"]."'");
            $sql->execute();
            break;
    }
    $datos=$sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datos);
?>