<?php
    define("DB_HOST", "localhost");
    define("DB_NAME", "musica");
    define("DB_USER", "root");
    define("DB_PASSWORD", "");

    class Conexion{
        private $host;
        private $db_name;
        private $user;
        private $password;
        private $db_handler;
        
        public static function conectar(){
            $host=DB_HOST;
            $db_name=DB_NAME;
            $user=DB_USER;
            $password=DB_PASSWORD;
            $db_handler=null;
            try{
                $dns="mysql:host=$host; dbname=$db_name";
                $db_handler=new PDO($dns, $user, $password);
                $db_handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $db_handler->exec("set names utf8");
            } catch(Exception $e){
                echo "Error al intentar establecer conexión con la base de datos";
            }
            return $db_handler;
        }
    }
?>