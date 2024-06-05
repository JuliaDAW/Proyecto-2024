<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    switch($_POST["tipo"]){
        case "b_artistas":
            if(isset($_POST["filtro"])){
                $array=array(":ocupacion"=>$_POST["filtro"][0]["ocupacion"],
                    ":fechaDebut"=>$_POST["filtro"][1]["fDebut"],
                    ":paisDebut"=>$_POST["filtro"][2]["pais"]
                );
                $sql=$conexion->prepare("SELECT * FROM artistas WHERE ocupacion=:ocupacion OR fecha_debut=:fechaDebut OR pais_debut=:paisDebut");
                $sql->execute($array);
            } else if(isset($_POST["barraB"])){
                $sql=$conexion->prepare("SELECT * FROM artistas WHERE nombre LIKE '%".$_POST["barraB"][0]["buscar"]."%'");
                $sql->execute();
            } else{
                $sql=$conexion->prepare("SELECT * FROM artistas");
                $sql->execute();
            }
            break;
        case "b_albumes":
            if(isset($_POST["filtro"])){
                $array=array(":nCanciones"=>$_POST["filtro"][0]["numCan"],
                    ":fechaLanzamiento"=>$_POST["filtro"][1]["fLanzamiento"],
                    ":artista"=>$_POST["filtro"][2]["artista"]
                );
                $sql=$conexion->prepare("SELECT alb.*, art.nombre AS artNombre FROM albumes alb JOIN artistas art ON alb.id_artista=art.id WHERE n_canciones=:nCanciones OR fecha_lanzamiento=:fechaLanzamiento OR id_artista=:artista");
                $sql->execute($array);
            } else if(isset($_POST["barraB"])){
                $sql=$conexion->prepare("SELECT alb.*, art.nombre AS artNombre FROM albumes alb JOIN artistas art ON alb.id_artista=art.id WHERE alb.nombre LIKE '%".$_POST["barraB"][0]["buscar"]."%'");
                $sql->execute();
            } else{
                $sql=$conexion->prepare("SELECT alb.*, art.nombre AS artNombre FROM albumes alb JOIN artistas art ON alb.id_artista=art.id");
                $sql->execute();
            }
            break;
        case "b_canciones":
            if(isset($_POST["filtro"])){
                $array=array(":album"=>$_POST["filtro"][0]["album"],
                    ":artista"=>$_POST["filtro"][1]["artista"],
                    ":single"=>$_POST["filtro"][2]["single"],
                    ":idioma"=>$_POST["filtro"][3]["idioma"]
                );
                if($_POST["filtro"][2]["single"]=="si"){
                    $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM canciones can JOIN artistas art ON can.id_artista=art.id WHERE id_artista=:artista OR single=:single OR idioma=:idioma");
                } else if($_POST["filtro"][2]["single"]=="no"){
                    $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM canciones can JOIN artistas art ON can.id_artista=art.id WHERE id_artista=:artista OR (single=:single AND id_album=:album) OR idioma=:idioma");
                }
                $sql->execute($array);
            } else if(isset($_POST["barraB"])){
                $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM canciones can JOIN artistas art ON can.id_artista=art.id WHERE can.nombre LIKE '%".$_POST["barraB"][0]["buscar"]."%'");
                $sql->execute();
            } else{
                $sql=$conexion->prepare("SELECT can.*, art.nombre AS artNombre FROM canciones can JOIN artistas art ON can.id_artista=art.id");
                $sql->execute();
            }
            break;
    }

    $datos=$sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datos);
?>