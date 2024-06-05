<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    //encripta contraseñas
    $contrasenia=password_hash($_POST["contraseniaU"], PASSWORD_BCRYPT);
    
    $array=array(":nombre"=>$_POST["nombreU"],
        ":correo"=>$_POST["correoU"],
        ":contrasenia"=>$contrasenia
    );
    $sql="INSERT INTO usuarios VALUES(DEFAULT, :nombre, LOWER(:correo), :contrasenia, NOW())";
    
    $sentencia=$conexion->prepare($sql);
    $sentencia->execute($array);
?>