<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    switch($_POST["mensajes"]){
        case "recoger":
            $sql=$conexion->prepare("SELECT chat.*, a.nombre FROM chat JOIN administradores a ON chat.emisor=a.id ORDER BY fecha");
            $sql->execute();
            $datos=$sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos);
            break;
        case "enviar":
            $array=array(":emisor"=>$_POST["emisor"],
                ":receptor"=>$_POST["receptor"],
                ":contenido"=>$_POST["message"]
            );
            $sql=$conexion->prepare("INSERT INTO chat VALUES (DEFAULT, :emisor, :receptor, NOW(), :contenido)");
            $sql->execute($array);
            break;
    }
?>