<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    session_start();

    if(!isset($_SESSION["usuario"])) $_SESSION["usuario"]="";
    if(!isset($_SESSION["id_usuario"])) $_SESSION["id_usuario"]=0;

    if(isset($_POST["sesion"])){
        switch($_POST["sesion"]){
            case "crear": //añadir datos a las variables de sesión
                $array=array(":datos"=>$_POST["datos"]);

                if($_POST["tipo_user"]=="usuario"){ //los datos son un usuario
                    $_SESSION["usuario"]="user"; //sesion con tipo de usuario
                    $sql="SELECT id FROM usuarios WHERE nombre=:datos OR correo=:datos";
                }
                if($_POST["tipo_user"]=="admin"){ //los datos son de un administrador
                    $_SESSION["usuario"]="admin"; //sesion con tipo de usuario
                    $sql="SELECT id FROM administradores WHERE nombre=:datos OR correo=:datos";
                }

                $sentencia=$conexion->prepare($sql);
                $sentencia->execute($array);
                $datos=$sentencia->fetchAll(PDO::FETCH_ASSOC);
                $_SESSION["id_usuario"]=$datos[0]["id"]; //sesión con id
                break;
            case "cerrar": //eliminar datos de la sesión iniciada
                $_SESSION["usuario"]="";
                $_SESSION["id_usuario"]=0;
                break;
        }
    }

    $sesiones=array("usuario"=>$_SESSION["usuario"],
        "idUsuario"=>$_SESSION["id_usuario"]
    );
    echo json_encode($sesiones);
?>