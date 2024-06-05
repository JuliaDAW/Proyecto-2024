$(document).ready(()=>{
    $("#id_cambiar").on("click", function(){ //cambiar de formulario
        let tipo=$("#id_cambiar").attr("cambiar");
        if(tipo=="crear"){
            $("#id_crearCuenta").removeClass("esconder");
            $("#id_iniciarSesion").addClass("esconder");
            $("#id_olvidado").addClass("esconder");
            $("#id_cambiar").text("¿Ya tiene una cuenta? Inicie sesión.");
            $("#id_cambiar").attr("cambiar", "iniciar");
        }
        if(tipo=="iniciar"){
            $("#id_crearCuenta").addClass("esconder");
            $("#id_iniciarSesion").removeClass("esconder");
            $("#id_olvidado").removeClass("esconder");
            $("#id_cambiar").text("¿Todavía no tiene una cuenta? Cree una nueva.");
            $("#id_cambiar").attr("cambiar", "crear");
        }
    });

    $("#id_iniciar").on("click", function(){ //iniciar sesión
        let nombre=$("#id_usuario").val();
        let contrasenia=$("#id_isContrasenia").val();
        if(nombre=="" || contrasenia==""){
            window.alert("Rellene los campos");
        } else{ iniciarSesion(nombre, contrasenia); }
    });
    $("#id_crear").on("click", function(){ //crear cuenta
        validar();
    });
});

function iniciarSesion(nombre, contrasenia){ //comprueba si existe en usuarios
    $.ajax({
        type: "post",
        url: "php/contrasenias.php",
        data: {tabla: "usuarios", isNombre: nombre, isContrasenia: contrasenia, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(datos["user"]==1){ //existe usuario
                $("#form_inicioSesion").trigger("reset");
                crear_sesion("usuario", nombre);
            }
            if(datos["admin"]==1){ //existe admin
                $("#form_inicioSesion").trigger("reset");
                crear_sesion("admin", nombre);
            }
            if(datos["user"]==0 && dato["admin"]==0) window.alert("No existe");
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function validar(){ //valida los campos y comprueba que no existan
    let er;
    let validado=true;

    let nombre=$("#id_nombreU").val();
    if(nombre==""){
        validado=false;
        window.alert("Nombre");
    }

    er=/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
    let correo=$("#id_correo").val();
    if(!er.test(correo)){
        validado=false;
        window.alert("Correo");
    }

    let contrasenia=$("#id_contrasenia").val();
    let rContrasenia=$("#id_repContrasenia").val();
    if(contrasenia=="" || contrasenia!==rContrasenia){
        validado=false;
        window.alert("Las contraseñas no coinciden");
    }

    $.ajax({ //comprueba que no exista ningún usuario con ese nombre o correo
        type: "post",
        url: "php/obtener.php",
        data: {que: "crearSesion", nombreU: nombre, email: correo, nocache: Math.random()},
        dataType: "json",
        success: function(datos){
            if(datos[0]["existe"]!=0){ //existe
                validado=false;
                window.alert("Ya existe un usuario");
            } else{ //no existe y crea uno
                if(validado){
                    aniadir_usuario(nombre, correo, contrasenia);
                    window.location.replace("./inicio_sesion.html");
                    window.alert("Se ha creado la cuenta");
                }
            }
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        },
    });
}

function aniadir_usuario(nombre, correo, contrasenia){ //añade un nuevo usuario a la bd
    $.ajax({
        type: "post",
        url: "php/aniadir_usuarios.php",
        data: {nombreU: nombre, correoU: correo, contraseniaU: contrasenia, nocache: Math.random()},
        dataType: "text",
        success: function(datos){
            $("#form_crearCuenta").trigger("reset");
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}

function crear_sesion(tipo, dato){ //crea variables de sesión
    $.ajax({
        type: "post",
        url: "php/session.php",
        data: {sesion: "crear", tipo_user: tipo, datos: dato, nocache: Math.random()},
        dataType: "text",
        success: function(datos){
            window.location.replace("./index.html");
        },
        error: function(error){
            //console.log(error);
            window.alert("Se ha producido un error");
        }
    });
}