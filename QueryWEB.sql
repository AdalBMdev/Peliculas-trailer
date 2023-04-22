create database DB_PeliculasWeb

use DB_PeliculasWeb

create table Usuario(
IDUsuario int primary key identity (1,1),
Id_rol int,
Correo varchar(100),
Clave varchar(500)
)


insert into Usuario(Id_rol,Correo,Clave) values (1,'admin@gmail,com','03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4')--Perfil admin

create table Peliculas(
IDPeliculas int primary key identity(1,1),
Id_rol int,
Titulo varchar(100),
Año date,
Director varchar(250),
Actores varchar(250),
Reseña text,
Poster varchar(250),
Link text
)

drop table Peliculas

create table rol
(
id_rol int primary key,
Descripcion_rol varchar(33)
)

insert into rol values
(1, 'Administrador'),
(2, 'Usuario')

select * from rol
select * from Peliculas

create procedure sp_editarPeliculas(
@IDPeliculas int,
@Titulo varchar(100),
@Año date,
@Director varchar(100),
@Actores varchar(100),
@Reseña text,
@Poster varchar(300),
@Link text,
@Registrado bit output,
@Mensaje varchar(100) output
)
as
begin

	if(exists(select * from Peliculas where IDPeliculas = @IDPeliculas))
	begin
		UPDATE Peliculas 
		SET Titulo = @Titulo, Año = @Año, Director = @Director, Actores = @Actores, Reseña = @Reseña, Poster = @Poster, Link = @Link
		WHERE IDPeliculas = @IDPeliculas

		set @Registrado = 1
		set @Mensaje = 'Pelicula editada'
	end
	else
	begin 
		set @Registrado = 0
		set @Mensaje = 'No se pudo editar la pelicula'
	end
end

DROP PROCEDURE dbo.sp_editarPeliculas;

create procedure sp_eliminarPeliculas(
@IDPeliculas int,
@Registrado bit output,
@Mensaje varchar(100) output
)
as
begin
		if(exists(select * from Peliculas where IDPeliculas = @IDPeliculas))
BEGIN
    DELETE FROM Peliculas WHERE IDPeliculas = @IDPeliculas
    SET @Registrado = 1;
    SET @Mensaje = 'La pelicula ha sido eliminada correctamente';
END
ELSE
BEGIN
    SET @Registrado = 0;
    SET @Mensaje = 'La pelicula que intentas eliminar no existe';
END
END

CREATE PROCEDURE sp_MostrarPeliculas
AS
BEGIN
    SELECT * FROM Peliculas;
END

EXEC sp_MostrarPeliculas;

CREATE PROCEDURE sp_MostrarPeliculasID
@IDPeliculas int,
@Registrado bit output,
@Mensaje varchar(100) output
as
begin
		if(exists(select * from Peliculas where IDPeliculas = @IDPeliculas))
BEGIN
    SELECT * FROM Peliculas WHERE IDPeliculas = @IDPeliculas
    SET @Registrado = 1;
    SET @Mensaje = 'La pelicula ha sido encontrada correctamente';
END
ELSE
BEGIN
    SET @Registrado = 0;
    SET @Mensaje = 'La pelicula que intentas encontrar no existe';
END
END

create procedure sp_RegistrarPeliculas(
@Id_rol int,
@Titulo varchar(100),
@Año date,
@Director varchar(250),
@Actores varchar(250),
@Reseña text,
@Poster varchar(250),
@Link text,
@Registrado bit output,
@Mensaje varchar(100) output
)
as
begin

	if(not exists(select * from Peliculas where Titulo = @Titulo and @Id_rol =  1))
	begin
		insert into Peliculas(Id_rol,Titulo,Año,Director,Actores,Reseña,Poster,Link) values(@Id_rol,@Titulo,@Año,@Director,@Actores,@Reseña,@Poster,@Link)-- insertar
		set @Registrado = 1
		set @Mensaje = 'Pelicula registrado'
	end
	else
	begin 
		set @Registrado = 0
		set @Mensaje = 'Titulo ya existe'
	end
end

DROP PROCEDURE dbo.sp_RegistrarPeliculas;


/*create procedure sp_Registrar(
@Correo varchar(100),
@Clave varchar(500),
@Registrado bit output,
@Mensaje varchar(100) output
)
as
begin

	if(not exists(select * from Usuario where Correo = @Correo))--Validar correo 
	begin
		insert into Usuario(Correo,Clave) values(@Correo,@Clave)-- insertar
		set @Registrado = 1
		set @Mensaje = 'Usuario registrado'
	end
	else
	begin 
		set @Registrado = 0
		set @Mensaje = 'Correo/Nick ya existe'
	end
end*/

insert into Usuario(Id_rol,Correo,Clave) values('1','admin@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4')


create procedure sp_Validar(
@Correo varchar(100),
@Clave varchar(500)
)
as
begin
	if(exists(select * from Usuario where Correo = @Correo and Clave = @Clave))
		select IDUsuario from Usuario where Correo = @Correo and Clave = @Clave
	else
		select '0'
end

declare @registrado bit, @mensaje varchar(100)

exec sp_Registrar 'Adal','adal@gmail.com','1234', @registrado output, @mensaje output

select @registrado
select @mensaje

select * from Usuario
select * from Peliculas


TRUNCATE TABLE Usuario;
TRUNCATE TABLE Peliculas;



exec sp_Validar 'adal@gmail.com','1234'
