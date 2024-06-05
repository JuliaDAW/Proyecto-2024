<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    if(isset($_POST["e"])){
        $array=array(":id"=>$_POST["id"]);

        switch($_POST["e"]){
            case "art": //obtiene todos los datos del artista
                $sql="SELECT * FROM artistas WHERE id=:id";
                break;
            case "art_alb": //obtiene los álbumes que sean del artista
                $sql="SELECT * FROM albumes WHERE id_artista=:id";
                break;
            case "art_can": //obtiene las canciones que sean del artista y no pertenezcan a un álbum
                $sql="SELECT * FROM canciones WHERE id_artista=:id AND id_album=0";
                break;
            case "alb": //obtiene todos los datos del álbum
                $sql="SELECT * FROM albumes WHERE id=:id";
                break;
            case "alb_art": //obtiene al artista del álbum
                $sql="SELECT art.* FROM artistas art JOIN albumes alb ON art.id=alb.id_artista WHERE alb.id=:id";
                break;
            case "alb_can": //obtiene las canciones que están en el álbum
                $sql="SELECT can.* FROM canciones can JOIN albumes alb ON can.id_album=alb.id WHERE alb.id=:id";
                break;
            case "can": //obtiene todos los datos de la canción
                $sql="SELECT * FROM canciones WHERE id=:id";
                break;
            case "can_art": //obtiene el artista de la canción
                $sql="SELECT art.* FROM artistas art JOIN canciones can ON art.id=can.id_artista WHERE can.id=:id";
                break;
            case "can_alb": //obtiene el álbum de la canción
                $sql="SELECT alb.* FROM albumes alb JOIN canciones can ON alb.id=can.id_album WHERE can.id=:id";
                break;
            case "comentarios": //obtiene los comentarios de la canción
                $sql="SELECT * FROM comentarios WHERE id_cancion=:id";
                break;
            case "nombreCom":
                if($_POST["tipo"]=="admin") $sql="SELECT nombre FROM administradores WHERE id=:id";
                if($_POST["tipo"]=="user") $sql="SELECT nombre FROM usuarios WHERE id=:id";
                break;
        }

        $sentencia=$conexion->prepare($sql);
        $sentencia->execute($array);
        $datos=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);
    }
    if(isset($_POST["comprobar"])){
        $array=array(":idUser"=>$_POST["idUsu"],
            ":idElem"=>$_POST["idCan"],
            ":tipoUser"=>$_POST["tipoUsu"]
        );

        $sql=$conexion->prepare("SELECT movimiento, COUNT(*) as existe FROM movimientos WHERE id_usuario=:idUser AND id_cancion=:idElem AND tipoU=:tipoUser GROUP BY movimiento");
        $sql->execute($array);
        $datos=$sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);
    }
    if(isset($_POST["m"])){
        $array=array(":idUser"=>$_POST["idUser"],
            ":idElem"=>$_POST["idElem"],
            ":tipoU"=>$_POST["user"],
            ":mov"=>$_POST["m"]
        );
        if($_POST["existe"]==0){
            $sql="INSERT INTO movimientos VALUES (:idElem, :idUser, :tipoU, :mov)";
        } else{
            $sql="DELETE FROM movimientos WHERE id_cancion=:idElem AND id_usuario=:idUser AND movimiento=:mov AND tipoU=:tipoU";
        }
        $sentencia=$conexion->prepare($sql);
        $sentencia->execute($array);
    }
    if(isset($_POST["com"])){
        $tipoU=$_POST["tipoUsu"];

        $array=array(":idE"=>$_POST["idElem"],
            ":idU"=>$_POST["idUsu"],
            ":tipoU"=>$_POST["tipoUsu"],
            ":respondeA"=>$_POST["pc"],
            ":coment"=>$_POST["comentario"]
        );
        $sql=$conexion->prepare("INSERT INTO comentarios VALUES (DEFAULT, :idE, :idU, :tipoU, :respondeA, NOW(), :coment)");
        $sql->execute($array);
    }
?>