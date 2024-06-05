<?php
    require_once("conexion.php");

    $conexion=Conexion::conectar();

    $array=array(":accion"=>$_POST["a"]);

    switch($_POST["o"]){
        case "sin": //sin ordenar
            $sql="SELECT a.objeto, a.nombre, a.fecha, admin.nombre AS adminNombre FROM acciones a JOIN administradores admin ON admin.id=a.id_admin WHERE accion=:accion";
            break;
        case "admin": //ordenados por administrador
            $sql="SELECT a.objeto, a.nombre, a.fecha, admin.nombre AS adminNombre FROM acciones a JOIN administradores admin ON admin.id=a.id_admin WHERE accion=:accion ORDER BY admin.nombre";
            break;
        case "tipoObjeto": //ordenados por el tipo de objeto
            $sql="SELECT a.objeto, a.nombre, a.fecha, admin.nombre AS adminNombre FROM acciones a JOIN administradores admin ON admin.id=a.id_admin WHERE accion=:accion ORDER BY a.objeto";
            break;
        case "nombreObjeto": //ordenados por el nombre del objeto
            $sql="SELECT a.objeto, a.nombre, a.fecha, admin.nombre AS adminNombre FROM acciones a JOIN administradores admin ON admin.id=a.id_admin WHERE accion=:accion ORDER BY a.nombre";
            break;
        case "fecha": //ordenados por la fecha
            $sql="SELECT a.objeto, a.nombre, a.fecha, admin.nombre AS adminNombre FROM acciones a JOIN administradores admin ON admin.id=a.id_admin WHERE accion=:accion ORDER BY a.fecha";
            break;
    }
    $sentencia=$conexion->prepare($sql);
    $sentencia->execute($array);
    $datos=$sentencia->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datos);
?>