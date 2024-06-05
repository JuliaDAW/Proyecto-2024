/*drop database if exists musica;
create database musica;
use musica;*/

drop table if exists artistas;
create table artistas(
    id int auto_increment,
    nombre varchar(255),
    ocupacion enum("solista", "grupo"),
    fecha_debut char(4),
    pais_debut varchar(255),
    informacion text,
    archivo varchar(255),
    primary key(id)
);

drop table if exists albumes;
create table albumes(
    id int auto_increment,
    nombre varchar(255),
    n_canciones int,
    fecha_lanzamiento date,
    id_artista int,
    archivo varchar(255),
    primary key(id)
);

drop table if exists canciones;
create table canciones(
    id int auto_increment,
    nombre varchar(255),
    id_artista int,
    single enum("si", "no"),
    id_album int,
    idioma varchar(255),
    letra text,
    traduccion text,
    archivo varchar(255),
    primary key(id)
);

drop table if exists administradores;
create table administradores(
    id int auto_increment,
    nombre varchar(50) unique,
    correo varchar(255) unique,
    contrasenia varchar(50),
    fecha_alta datetime,
    primary key(id)
);

drop table if exists acciones;
create table acciones(
    id_admin int,
    id_objeto int,
    nombre varchar(255),
    objeto enum("artista", "album", "cancion"),
    accion enum("aniadir", "editar", "borrar"),
    fecha datetime
);

drop table if exists chat;
create table chat(
    id int auto_increment,
    emisor int,
    receptor int,
    fecha datetime,
    contenido text,
    primary key(id)
);

drop table if exists usuarios;
create table usuarios(
    id int auto_increment,
    nombre varchar(50) unique,
    correo varchar(255) unique,
    contrasenia varchar(255),
    fecha_alta datetime,
    primary key(id)
);

drop table if exists movimientos;
create table movimientos(
    id_cancion int,
    id_usuario int,
    tipoU enum("admin", "user"),
    movimiento enum("guardar", "gustar")
);

drop table if exists comentarios;
create table comentarios(
    id int auto_increment,
    id_cancion int,
    id_usuario int,
    persona enum("admin", "user"),
    respondeA int,
    fecha datetime,
    contenido text,
    primary key(id)
);

/*Administradores*/
INSERT INTO administradores (nombre, correo, contrasenia, fecha_alta) VALUES ("Julia", "julia@proyecto.es", hex(AES_ENCRYPT("juliapass", 'clave')), NOW());
INSERT INTO administradores (nombre, correo, contrasenia, fecha_alta) VALUES ("Mara", "mara@proyecto.es", hex(AES_ENCRYPT("marapass",'clave')), NOW());
INSERT INTO administradores (nombre, correo, contrasenia, fecha_alta) VALUES ("Marco", "marco@proyecto.es", hex(AES_ENCRYPT("marcopass",'clave')), NOW());
/*Fin Administradores*/

/*Artistas*/
INSERT INTO artistas (nombre, ocupacion, fecha_debut, pais_debut, informacion, archivo) VALUES ("SEVENTEEN", "grupo", "2015", "coreaSur", "Grupo musical de origen coreano, formado en 2012 y que debutó el 26 de mayo de 2015 bajo la compañía discográfica Pledis Entertainment. Está formado por 13 integrantes: S.Coups, Jeonghan, Joshua, Jun, Hoshi, Wonoo, Woozi, DK, Mingyu, The8, Seungkwan, Vernon y Dino. El grupo a su vez se divide en tres unidades: Vocal Team, compuesto por vocalistas principales; Hip-Hop Team, compuesto por raperos principales; y Performance Team, compuesto por bailarínes principales. El nombre, SEVENTEEN, proviene de la suma de los 13 integrantes, las 3 unidades y el grupo que forman [13+3+1=17].", "seventeen.jpg");
INSERT INTO acciones VALUES (1, 2, "SEVENTEEN", "artista", "aniadir", "2024-03-21 09:39:57");
/*Fin Artistas*/

/*Álbumes*/INSERT INTO albumes (nombre, n_canciones, fecha_lanzamiento, id_artista, archivo) VALUES ("Attaca", "7", "2021-10-22", "2", "attaca.jpg");
INSERT INTO acciones VALUES (1, 3, "Attaca", "album", "aniadir", "2024-03-30 10:58:10");
/*Fin Álbumes*/

/*Canciones*/
INSERT INTO canciones (nombre, id_artista, single, id_album, idioma, letra, traduccion, archivo) VALUES ("Rock with You", 2, "no", 3, "coreano",
    "지금 이 노래가 내가 될 수 있게 <br/>
    만들어 준 네가 다가온다 <br/>
    셋 둘 하나 <br/>
        <br/>
    뭐든지 다 주고 싶어 <br/>
    나에게 너만 있다면 <br/>
    Won't let them break your heart, oh, no <br/>
    네가 없다면 난 아무것도 아냐 <br/>
        <br/>
    No words are enough for you <br/>
    노랫말로 담고 싶어 <br/>
    So 모든 나의 감정 <br/>
    너로 읽고 쓰게 해줘 <br/>
        <br/>
    I just want to love you <br/>
    널 혼자 두지 않아 난 <br/>
    I just want you, I need you <br/>
    이 밤은 짧고 넌 당연하지 않아 <br/>
        <br/>
    I tell you <br/>
    This time I wanna rock with you <br/>
    Moonlight 이 밤에 shine on you <br/>
    Tonight I wanna ride with you <br/>
    그 어디라도 <br/>
        <br/>
    Baby, hold on, baby, hold on 어디에서도 <br/>
    Baby, hold on, baby, hold on 어디서라도 <br/>
    세상이 끝나더라도 <br/>
    I wanna ride with you <br/>
        <br/>
    널 위해 달리고 있어 <br/>
    널 위해서라면 뭐든 (뭐든) <br/>
    숨이 멈출 때까지 난 너만 <br/>
        <br/>
    No words are enough for you <br/>
    멜로디로 담고 싶어 <br/>
    So 너의 모든 감정 <br/>
    내가 들을 수 있게 해줘 <br/>
        <br/>
    I just want to love you <br/>
    널 혼자 두지 않아 난 <br/>
    I just want you, I need you <br/>
    이 밤은 짧고 넌 당연하지 않아 <br/>
        <br/>
    I tell you <br/>
    This time I wanna rock with you <br/>
    Moonlight 이 밤에 shine on you <br/>
    Tonight I wanna ride with you <br/>
    그 어디라도 <br/>
        <br/>
    Baby, hold on, baby, hold on 어디에서도 <br/>
    Baby, hold on, baby, hold on 어디서라도 <br/>
    세상이 끝나더라도 <br/>
    I wanna ride with you <br/>
    Fall into your eyes <br/>
    모든 순간들이 오로지 널 향해 있어 <br/>
    나는 너 하나로 충분해 <br/>
        <br/>
    당연한 건 하나 없어 <br/>
    나에게 너만 있어서 <br/>
    Won't let them break your heart, oh no <br/>
        <br/>
    그 어디라도 baby, hold on, baby, hold on <br/>
    어디에서도 baby, hold on, baby, hold on <br/>
    어디서라도 세상이 끝나더라도 <br/>
        <br/>
    I wanna rock with you <br/>
    I wanna rock with you <br/>
    I wanna stay with you",

    "Para que esta canción pueda ser yo ahora <br/>
    Tú que lo hiciste vienes <br/>
    Tres dos uno <br/>
        <br/>
    quiero darte todo <br/>
    Si tan solo te tuviera <br/>
    No dejaré que te rompan el corazón, oh, no <br/>
    No soy nada sin ti <br/>
        <br/>
    No hay palabras suficientes para ti <br/>
    Quiero ponerlo en letra <br/>
    Entonces todos mis sentimientos <br/>
    Déjame leer y escribir <br/>
        <br/>
    Sólo quiero amarte <br/>
    No te dejaré solo <br/>
    Sólo te quiero, te necesito <br/>
    Esta noche es corta y no te dan por sentado <br/>
        <br/>
    Te digo <br/>
    Esta vez quiero rockear contigo <br/>
    La luz de la luna brilla sobre ti esta noche <br/>
    Esta noche quiero viajar contigo <br/>
    En cualquier lugar <br/>
        <br/>
    Bebé, espera, bebé, espera, en cualquier lugar <br/>
    Bebé, espera, bebé, espera, en cualquier lugar <br/>
    Incluso si el mundo se acaba <br/>
    Quiero viajar contigo <br/>
        <br/>
    Estoy corriendo por ti <br/>
    Cualquier cosa para ti (cualquier cosa) <br/>
    Hasta que deje de respirar, solo te tengo a ti <br/>
        <br/>
    No hay palabras suficientes para ti <br/>
    Quiero ponerlo en una melodia <br/>
    Entonces todos tus sentimientos <br/>
    Déjame escuchar <br/>
        <br/>
    Sólo quiero amarte <br/>
    No te dejaré solo <br/>
    Sólo te quiero, te necesito <br/>
    Esta noche es corta y no te dan por sentado <br/>
        <br/>
    Te digo <br/>
    Esta vez quiero rockear contigo <br/>
    La luz de la luna brilla sobre ti esta noche <br/>
    Esta noche quiero viajar contigo <br/>
    En cualquier lugar <br/>
        <br/>
    Bebé, espera, bebé, espera, en cualquier lugar <br/>
    Bebé, espera, bebé, espera, en cualquier lugar <br/>
    Incluso si el mundo se acaba <br/>
    Quiero viajar contigo <br/>
    Caer en tus ojos <br/>
    Todos los momentos están dirigidos solo a ti <br/>
    Tengo suficiente de ti <br/>
        <br/>
    Nada se da por sentado <br/>
    Sólo te tengo a ti <br/>
    No dejaré que te rompan el corazón, oh no <br/>
        <br/>
    En cualquier lugar bebé, espera, bebé, espera <br/>
    En cualquier lugar bebé, espera, bebé, espera <br/>
    Incluso si el mundo termina en alguna parte <br/>
        <br/>
    Quiero rockear contigo <br/>
    Quiero rockear contigo <br/>
    Quiero quedarme contigo",
"rock with you.m4a");
INSERT INTO acciones VALUES (2, 4, "Rock with You", "cancion", "aniadir", "2024-04-29 14:58:36");
/*Fin Canciones*/