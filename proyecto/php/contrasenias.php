<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    $array=array(":nombre"=>$_POST["isNombre"],
        ":contrasenia"=>$_POST["isContrasenia"]
    );

    $sql=$conexion->prepare("SELECT COUNT(*) AS n, contrasenia AS encriptado FROM usuarios WHERE nombre=:nombre OR correo=:nombre");
    $sql->execute($array);
    $datosU=$sql->fetch(PDO::FETCH_ASSOC);
    if($datosU["n"]!=0){
        $encU=password_verify($_POST["isContrasenia"], $datosU["encriptado"]);
    }
    
    $sql=$conexion->prepare("SELECT COUNT(*) AS n, contrasenia, hex(AES_ENCRYPT(:contrasenia, 'clave')) AS encriptado FROM administradores WHERE nombre=:nombre OR correo=:nombre");
    $sql->execute($array);
    $datosA=$sql->fetch(PDO::FETCH_ASSOC);
    if($datosA["n"]!=0){
        $conA=$datosA["contrasenia"];
        $encA=$datosA["encriptado"];
    }

    if($datosU["n"]!=0){
        if($encU){
            $existe=array("user"=>1,
                "admin"=>0
            );
            echo json_encode($existe);
        }
    } else if($datosA["n"]!=0){
        if($conA==$encA){
            $existe=array("user"=>0,
                "admin"=>1
            );
            echo json_encode($existe);
        }
    } else{
        $existe=array("user"=>0,
            "admin"=>0
        );
        echo json_encode($existe);
    }
?>