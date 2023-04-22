﻿using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using Peliculas.Models;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using Newtonsoft.Json;


namespace Peliculas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeliculasController : Controller
    {
        private readonly string cadena = @"Server=ADALBERTO; Database=DB_peliculasWeb; Trusted_Connection=True;"; //Conexion a bdd

        [HttpPost("registrarPelicula")]
        public IActionResult RegistrarPeliculas(Pelicula oPelicula) //Obtiene un objeto tipo usuario
        {
            using (SqlConnection cn = new SqlConnection(cadena)) //Usa la conexion
            {
                SqlCommand cmd = new SqlCommand("sp_RegistrarPeliculas", cn);//Usa el store procedure de la base de datos "sp_RegistrarP"
                cmd.CommandType = CommandType.StoredProcedure;

                //Obtiene los datos de la consulta
                cmd.Parameters.AddWithValue("@Id_Rol", oPelicula.IdRol); 
                cmd.Parameters.AddWithValue("@Titulo", oPelicula.Titulo);
                cmd.Parameters.AddWithValue("@Año", oPelicula.Año);
                cmd.Parameters.AddWithValue("@Director", oPelicula.Director);
                cmd.Parameters.AddWithValue("@Actores", oPelicula.Actores);
                cmd.Parameters.AddWithValue("@Reseña", oPelicula.Reseña);
                cmd.Parameters.AddWithValue("@Poster", oPelicula.Poster);
                cmd.Parameters.AddWithValue("@Link", oPelicula.Link);

                SqlParameter Registrado = new SqlParameter("@Registrado", SqlDbType.Bit);
                Registrado.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Registrado);

                SqlParameter Mensaje = new SqlParameter("@Mensaje", SqlDbType.VarChar, 100);
                Mensaje.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Mensaje);

                cn.Open();

                cmd.ExecuteNonQuery();

                bool registrado = Convert.ToBoolean(Registrado.Value);
                string mensaje = Mensaje.Value.ToString();

                if (registrado)
                {
                    return Ok(mensaje);
                }
                else
                {
                    return BadRequest(mensaje);
                }
            }



        }

        [HttpGet("mostrarPeliculas")]
        public IActionResult MostrarPeliculas() //Obtiene el ID del usuario
        {
            using (SqlConnection cn = new SqlConnection(cadena)) //Usa la conexion
            {
                SqlCommand cmd = new SqlCommand("sp_MostrarPeliculas", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();

                List<Pelicula> peliculas = new List<Pelicula>();

                while (dr.Read())
                {
                    Pelicula pelicula = new Pelicula();

                    pelicula.Idpeliculas = Convert.ToInt32(dr["IDPeliculas"]);
                    pelicula.IdRol = Convert.ToInt32(dr["Id_rol"]);
                    pelicula.Titulo = dr["Titulo"].ToString();
                    pelicula.Año = Convert.ToDateTime(dr["Año"]);
                    pelicula.Director = dr["Director"].ToString();
                    pelicula.Actores = dr["Actores"].ToString();
                    pelicula.Reseña = dr["Reseña"].ToString();
                    pelicula.Poster = dr["Poster"].ToString();
                    pelicula.Link = dr["Link"].ToString();

                    peliculas.Add(pelicula);
                }

                cn.Close();

                return Ok(peliculas);
            }
        }

        [HttpGet("mostrarPeliculas/{id}")]
        public IActionResult MostrarPeliculasId(int id) //Obtiene el ID del usuario
        {
            using (SqlConnection cn = new SqlConnection(cadena)) //Usa la conexion
            {
                SqlCommand cmd = new SqlCommand("sp_MostrarPeliculasID", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IDPeliculas", id);

                SqlParameter Registrado = new SqlParameter("@Registrado", SqlDbType.Bit);
                Registrado.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Registrado);

                SqlParameter Mensaje = new SqlParameter("@Mensaje", SqlDbType.VarChar, 100);
                Mensaje.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Mensaje);

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();

                List<Pelicula> peliculas = new List<Pelicula>();

                while (dr.Read())
                {
                    Pelicula pelicula = new Pelicula();

                    pelicula.Idpeliculas = Convert.ToInt32(dr["IDPeliculas"]);
                    pelicula.IdRol = Convert.ToInt32(dr["Id_rol"]);
                    pelicula.Titulo = dr["Titulo"].ToString();
                    pelicula.Año = Convert.ToDateTime(dr["Año"]);
                    pelicula.Director = dr["Director"].ToString();
                    pelicula.Actores = dr["Actores"].ToString();
                    pelicula.Reseña = dr["Reseña"].ToString();
                    pelicula.Poster = dr["Poster"].ToString();
                    pelicula.Link = dr["Link"].ToString();

                    peliculas.Add(pelicula);
                }

                cn.Close();

                return Ok(peliculas);
            }
        }

        [HttpPut("editarPeliculas")]
        public IActionResult editarPeliculas(Pelicula oPelicula) //Obtiene el ID del usuario
        {
            using (SqlConnection cn = new SqlConnection(cadena)) //Usa la conexion
            {
                SqlCommand cmd = new SqlCommand("sp_editarPeliculas", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IDPeliculas", oPelicula.Idpeliculas);
                cmd.Parameters.AddWithValue("@Titulo", oPelicula.Titulo);
                cmd.Parameters.AddWithValue("@Año", oPelicula.Año);
                cmd.Parameters.AddWithValue("@Director", oPelicula.Director);
                cmd.Parameters.AddWithValue("@Actores", oPelicula.Actores);
                cmd.Parameters.AddWithValue("@Reseña", oPelicula.Reseña);
                cmd.Parameters.AddWithValue("@Poster", oPelicula.Poster);
                cmd.Parameters.AddWithValue("@Link", oPelicula.Link);

                SqlParameter Registrado = new SqlParameter("@Registrado", SqlDbType.Bit);
                Registrado.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Registrado);

                SqlParameter Mensaje = new SqlParameter("@Mensaje", SqlDbType.VarChar, 100);
                Mensaje.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Mensaje);

                cn.Open();

                cmd.ExecuteNonQuery();

                bool registrado = Convert.ToBoolean(Registrado.Value);
                string mensaje = Mensaje.Value.ToString();

                if (registrado)
                {
                    return Ok(mensaje);
                }
                else
                {
                    return BadRequest(mensaje);
                }
            }
        }

        [HttpDelete("eliminarPeliculas/{id}")]
        public IActionResult eliminarPelicula(int id)
        {
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                SqlCommand cmd = new SqlCommand("sp_eliminarPeliculas", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IDPeliculas", id);

                SqlParameter Registrado = new SqlParameter("@Registrado", SqlDbType.Bit);
                Registrado.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Registrado);

                SqlParameter Mensaje = new SqlParameter("@Mensaje", SqlDbType.VarChar, 100);
                Mensaje.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Mensaje);

                cn.Open();

                cmd.ExecuteNonQuery();

                bool registrado = Convert.ToBoolean(Registrado.Value);
                string mensaje = Mensaje.Value.ToString();

                if (registrado)
                {
                    return Ok(mensaje);
                }
                else
                {
                    return BadRequest(mensaje);
                }
            }
        }
    }

}
