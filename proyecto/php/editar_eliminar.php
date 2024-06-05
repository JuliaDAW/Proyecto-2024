<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    if(isset($_POST["editar"])){ //editar
        switch($_POST["tipoE"]){
            case "art":
                $array=array(
                    ":id"=>$_POST["idE"],
                    ":nombre"=>$_POST["nombre_art"],
                    ":ocupacion"=>$_POST["ocupacion"],
                    ":fechaDebut"=>$_POST["fechaDebut"],
                    ":pais"=>$_POST["pais"],
                    ":informacion"=>$_POST["informacion"]
                );

                $a=array(":idU"=>$_POST["idU"],
                    ":idE"=>$_POST["idE"],
                    ":nombre"=>$_POST["nombre_art"]
                );
                $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'artista', 'editar', NOW())");
                $sentencia->execute($a);

                if($_FILES["foto"]["name"]==""){ //no hay fichero
                    $sql="UPDATE artistas SET nombre=:nombre, ocupacion=:ocupacion, fecha_debut=:fechaDebut, pais_debut=:pais, informacion=:informacion WHERE id=:id";
                } else{ //hay fichero
                    $fichero=$_FILES["foto"];
                    $ruta="../archivos/artistas/";

                    $sentencia=$conexion->prepare("SELECT archivo FROM artistas WHERE id='".$_POST["idE"]."'");
                    $sentencia->execute();
                    $artista=$sentencia->fetch(PDO::FETCH_ASSOC);
                    unlink($ruta.$artista["archivo"]);

                    $sql="UPDATE artistas SET nombre=:nombre, ocupacion=:ocupacion, fecha_debut=:fechaDebut, pais_debut=:pais, informacion=:informacion, archivo='".$fichero["name"]."' WHERE id=:id";
                }
                break;
            case "alb":
                $array=array(
                    ":id"=>$_POST["idE"],
                    ":titulo"=>$_POST["titulo_alb"],
                    ":nCanciones"=>$_POST["nCanciones"],
                    ":fecha"=>$_POST["fechaLanzamiento"],
                    ":artista"=>$_POST["artistaAlb"]
                );

                $a=array(":idU"=>$_POST["idU"],
                    ":idE"=>$_POST["idE"],
                    ":nombre"=>$_POST["titulo_alb"]
                );
                $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'album', 'editar', NOW())");
                $sentencia->execute($a);

                if($_FILES["portada"]["name"]==""){
                    $sql="UPDATE albumes SET nombre=:titulo, n_canciones=:nCanciones, fecha_lanzamiento=:fecha, id_artista=:artista WHERE id=:id";
                } else{
                    $fichero=$_FILES["portada"];
                    $ruta="../archivos/albumes/";

                    $sentencia=$conexion->prepare("SELECT archivo FROM albumes WHERE id='".$_POST["idE"]."'");
                    $sentencia->execute();
                    $album=$sentencia->fetch(PDO::FETCH_ASSOC);
                    unlink($ruta.$album["archivo"]);

                    $sql="UPDATE albumes SET nombre=:titulo, n_canciones=:nCanciones, fecha_lanzamiento=:fecha, id_artista=:artista, archivo='".$fichero["name"]."' WHERE id=:id";
                }
                break;
            case "can":
                $album=$_POST["albumCan"];
                if($_POST["single"]=="si") $album=0;

                $array=array(
                    ":id"=>$_POST["idE"],
                    ":titulo"=>$_POST["titulo_can"],
                    ":artista"=>$_POST["artistaCan"],
                    ":single"=>$_POST["single"],
                    ":album"=>$album,
                    ":idioma"=>$_POST["idioma"],
                    ":letra"=>$_POST["letra"],
                    ":traduccion"=>$_POST["traduccion"]
                );

                $a=array(":idU"=>$_POST["idU"],
                    ":idE"=>$_POST["idE"],
                    ":nombre"=>$_POST["titulo_can"]
                );
                $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'cancion', 'editar', NOW())");
                $sentencia->execute($a);

                if($_FILES["audio"]["name"]==""){
                    $sql="UPDATE canciones SET nombre=:titulo, id_artista=:artista, single=:single, id_album=:album, idioma=:idioma, letra=:letra, traduccion=:traduccion WHERE id=:id";
                } else{
                    $fichero=$_FILES["audio"];
                    $ruta="../archivos/canciones/";

                    $sentencia=$conexion->prepare("SELECT archivo FROM canciones WHERE id='".$_POST["idE"]."'");
                    $sentencia->execute();
                    $cancion=$sentencia->fetch(PDO::FETCH_ASSOC);
                    unlink($ruta.$cancion["archivo"]);

                    $sql="UPDATE canciones SET nombre=:titulo, id_artista=:artista, single=:single, id_album=:album, idioma=:idioma, letra=:letra, traduccion=:traduccion, archivo='".$fichero["name"]."' WHERE id=:id";
                }
                break;
        }
        move_uploaded_file($fichero["tmp_name"], $ruta.$fichero["name"]);

        $sentencia=$conexion->prepare($sql);
        $sentencia->execute($array);
?>
    <script>window.location.replace("../editar_borrar.php?mov=editar");</script>
<?php
    } else if(isset($_POST["borrar"])){ //elimina datos
        switch($_POST["tipoE"]){
            case "art":
                //Elimina al artista y a los elementos relacionados
                $sentencia=$conexion->prepare("SELECT id, nombre, archivo FROM canciones WHERE id_artista='".$_POST["idE"]."'");
                $sentencia->execute();
                $canciones=$sentencia->fetchAll(PDO::FETCH_ASSOC);
                for($i=0; $i<count($canciones); $i++){
                    $sentencia=$conexion->prepare("DELETE FROM movimientos WHERE id_cancion=".$canciones[$i]["id"]."");
                    $sentencia->execute();

                    $sentencia=$conexion->prepare("DELETE FROM comentarios WHERE id_cancion=".$canciones[$i]["id"]."");
                    $sentencia->execute();

                    //Inserta en las tablas la informacion del elemento a eliminar
                    $a=array(":idU"=>$_POST["idU"],
                        ":idE"=>$canciones[$i]["id"],
                        ":nombre"=>$canciones[$i]["nombre"]
                    );
                    $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'cancion', 'borrar', NOW())");
                    $sentencia->execute($a);

                    unlink("../archivos/canciones/".$canciones[$i]["archivo"]);
                }

                $sentencia=$conexion->prepare("DELETE FROM canciones WHERE id_artista='".$_POST["idE"]."'");
                $sentencia->execute();

                //Inserta en las tablas la información del elemento eliminado
                $sentencia=$conexion->prepare("SELECT id, nombre, archivo FROM albumes WHERE id_artista='".$_POST["idE"]."'");
                $sentencia->execute();
                $albumes=$sentencia->fetchAll(PDO::FETCH_ASSOC);
                for($j=0; $j<count($albumes); $j++){
                    $a=array(":idU"=>$_POST["idU"],
                        ":idE"=>$albumes[$i]["id"],
                        ":nombre"=>$albumes[$i]["nombre"]
                    );
                    $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'album', 'borrar', NOW())");
                    $sentencia->execute($a);

                    unlink("../archivos/albumes/".$albumes[$j]["archivo"]);
                }

                $sentencia=$conexion->prepare("DELETE FROM albumes WHERE id_artista='".$_POST["idE"]."'");
                $sentencia->execute();

                //Inserta informacion del elemento eliminado
                $sentencia=$conexion->prepare("SELECT nombre, archivo FROM artistas WHERE id='".$_POST["idE"]."'");
                $sentencia->execute();
                $artista=$sentencia->fetch(PDO::FETCH_ASSOC);

                unlink("../archivos/artistas/".$artista["archivo"]);

                $a=array(":idU"=>$_POST["idU"],
                    ":idE"=>$_POST["idE"],
                    ":nombre"=>$artista["nombre"]
                );
                $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'artista', 'borrar', NOW())");
                $sentencia->execute($a);

                $sql="DELETE FROM artistas WHERE id='".$_POST["idE"]."'";
                break;
            case "alb":
                //Elimina al álbum y a los elementos relacionados
                $sentencia=$conexion->prepare("SELECT id, nombre, archivo FROM canciones WHERE id_album='".$_POST["idE"]."'");
                $sentencia->execute();
                $canciones=$sentencia->fetchAll(PDO::FETCH_ASSOC);
                for($i=0; $i<count($canciones); $i++){
                    $sentencia=$conexion->prepare("DELETE FROM movimientos WHERE id_cancion=".$canciones[$i]["id"]."");
                    $sentencia->execute();

                    $sentencia=$conexion->prepare("DELETE FROM comentarios WHERE id_cancion=".$canciones[$i]["id"]."");
                    $sentencia->execute();

                    //Inserta en las tablas la informacion del elemento a eliminar
                    $a=array(":idU"=>$_POST["idU"],
                        ":idE"=>$canciones[$i]["id"],
                        ":nombre"=>$canciones[$i]["nombre"]
                    );
                    $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'cancion', 'borrar', NOW())");
                    $sentencia->execute($a);

                    unlink("../archivos/canciones/".$canciones[$i]["archivo"]);
                }

                //Elimina las canciones
                $sentencia=$conexion->prepare("DELETE FROM canciones WHERE id_album='".$_POST["idE"]."'");
                $sentencia->execute();

                //Inserta informacion del elemento eliminado
                $sentencia=$conexion->prepare("SELECT nombre, archivo FROM albumes WHERE id='".$_POST["idE"]."'");
                $sentencia->execute();
                $album=$sentencia->fetch(PDO::FETCH_ASSOC);

                unlink("../archivos/albumes/".$album["archivo"]);

                $a=array(":idU"=>$_POST["idU"],
                    ":idE"=>$_POST["idE"],
                    ":nombre"=>$album["nombre"]
                );
                $sentencia=$conexion->prepare("INSERT INTO acciones VALUES ('".$_POST["idU"]."', '".$_POST["idE"]."', '".$album["nombre"]."', 'album', 'borrar', NOW())");
                $sentencia->execute($a);

                $sql="DELETE FROM albumes WHERE id='".$_POST["idE"]."'";
                break;
            case "can":
                //Elimina la canción y los elementos relacionados
                $sentencia=$conexion->prepare("DELETE FROM movimientos WHERE id_cancion='".$_POST["idE"]."'");
                $sentencia->execute();

                $sentencia=$conexion->prepare("DELETE FROM comentarios WHERE id_cancion='".$_POST["idE"]."'");
                $sentencia->execute();

                //Inserta datos del elemento eliminado en la tabla
                $sentencia=$conexion->prepare("SELECT nombre, archivo FROM canciones WHERE id='".$_POST["idE"]."'");
                $sentencia->execute();
                $cancion=$sentencia->fetch(PDO::FETCH_ASSOC);

                unlink("../archivos/canciones/".$cancion["archivo"]);

                $a=array(":idU"=>$_POST["idU"],
                    ":idE"=>$_POST["idE"],
                    ":nombre"=>$cancion["nombre"]
                );
                $sentencia=$conexion->prepare("INSERT INTO acciones VALUES (:idU, :idE, :nombre, 'cancion', 'borrar', NOW())");
                $sentencia->execute($a);

                $sql="DELETE FROM canciones WHERE id='".$_POST["idE"]."'";
                break;
        }
        $sentencia=$conexion->prepare($sql);
        $sentencia->execute();
?>
    <script>window.location.replace("../editar_borrar.php?mov=borrar");</script>
<?php
    } else{ //mostrar datos
        if(isset($_POST["ver"])){ //obtener todos los elementos
            switch($_POST["ver"]){
                case "art":
                    $sql="SELECT id, nombre, archivo FROM artistas ORDER BY nombre";
                    break;
                case "alb":
                    $sql="SELECT alb.id, alb.nombre, alb.archivo, art.nombre AS artNombre FROM albumes alb JOIN artistas art ON art.id=alb.id_artista ORDER BY alb.nombre";
                    break;
                case "can":
                    $sql="SELECT can.id, can.nombre, can.archivo, art.nombre AS artNombre FROM canciones can JOIN artistas art ON art.id=can.id_artista ORDER BY can.nombre";
                    break;
            }
            $sentencia=$conexion->prepare($sql);
            $sentencia->execute();
        }
        if(isset($_POST["tipo"]) && isset($_POST["id"])){ //obtener los datos de un elemento determinado
            $array=array(":id"=>$_POST["id"]);
    
            switch($_POST["tipo"]){
                case "s_art":
                    $sql="SELECT * FROM artistas WHERE id=:id";
                    break;
                case "s_alb":
                    $sql="SELECT * FROM albumes WHERE id=:id";
                    break;
                case "s_can":
                    $sql="SELECT * FROM canciones WHERE id=:id";
                    break;
            }
            $sentencia=$conexion->prepare($sql);
            $sentencia->execute($array);
        }
        $datos=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);
    }
?>