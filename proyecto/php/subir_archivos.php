<?php
    require_once("conexion.php");
    require_once("session.php");

    $conexion=Conexion::conectar();

    if(isset($_FILES["foto_art"])){
        $arch=$_FILES["foto_art"];
        $ruta="../archivos/artistas/";

        $array=array(":nombre"=>$_POST["nombre_art"],
            ":ocupacion"=>$_POST["ocupacion"],
            ":fechaDebut"=>$_POST["fechaDebut"],
            ":paisDebut"=>$_POST["paisDebut"],
            ":informacion"=>$_POST["información"],
            ":imagen"=>$arch["name"]
        );
        $sql="INSERT INTO artistas VALUES (DEFAULT, :nombre, :ocupacion, :fechaDebut, LOWER(:paisDebut), :informacion, :imagen)";

        $objeto="artista";
    }
    if(isset($_FILES["foto_alb"])){
        $arch=$_FILES["foto_alb"];
        $ruta="../archivos/albumes/";

        $array=array(":titulo"=>$_POST["titulo_alb"],
            ":nCanciones"=>$_POST["nCanciones"],
            ":fechaLanzamiento"=>$_POST["fechaLanzamiento"],
            ":idArtista"=>$_POST["artAlb"],
            ":imagen"=>$arch["name"]
        );
        $sql="INSERT INTO albumes VALUES (DEFAULT, :titulo, :nCanciones, :fechaLanzamiento, :idArtista, :imagen)";

        $objeto="album";
    }
    if(isset($_FILES["audio"])){
        $arch=$_FILES["audio"];
        $ruta="../archivos/canciones/";

        $idAlb=$_POST["albCan"];
        if($_POST["single"]=="si") $idAlb=0;

        $array=array(":titulo"=>$_POST["titulo_can"],
            ":idArtista"=>$_POST["artCan"],
            ":single"=>$_POST["single"],
            ":idAlbum"=>$idAlb,
            ":idioma"=>$_POST["idioma"],
            ":letra"=>$_POST["letra"],
            ":traduccion"=>$_POST["traduccion"],
            ":audio"=>$arch["name"]
        );
        $sql="INSERT INTO canciones VALUES (DEFAULT, :titulo, :idArtista, :single, :idAlbum, LOWER(:idioma), :letra, :traduccion, :audio)";

        $objeto="cancion";
    }
    move_uploaded_file($arch["tmp_name"], $ruta.$arch["name"]);

    $sentencia=$conexion->prepare($sql);
    $sentencia->execute($array);

    if($objeto=="artista") $sql="SELECT id, nombre FROM artistas WHERE nombre='".$_POST["nombre_art"]."' AND ocupacion='".$_POST["ocupacion"]."' AND fecha_debut='".$_POST["fechaDebut"]."' AND pais_debut='".$_POST["paisDebut"]."'";
    if($objeto=="album") $sql="SELECT id, nombre FROM albumes WHERE nombre='".$_POST["titulo_alb"]."' AND fecha_lanzamiento='".$_POST["fechaLanzamiento"]."' AND id_artista='".$_POST["artAlb"]."'";
    if($objeto=="cancion") $sql="SELECT id, nombre FROM canciones WHERE nombre='".$_POST["titulo_can"]."' AND id_artista='".$_POST["artCan"]."' AND single='".$_POST["single"]."' AND id_album='".$idAlb."'";
    $sentencia=$conexion->prepare($sql);
    $sentencia->execute();
    $datos=$sentencia->fetchAll(PDO::FETCH_ASSOC);

    $array=array(":id_admin"=>$_SESSION["id_usuario"],
        ":id_objeto"=>$datos[0]["id"],
        ":nombre"=>$datos[0]["nombre"],
        ":objeto"=>$objeto
    );
    $sql=$conexion->prepare("INSERT INTO acciones VALUES (:id_admin, :id_objeto, :nombre, :objeto, 'aniadir', NOW())");
    $sql->execute($array);
?>

<script>window.location.replace("../aniadir.html");</script>