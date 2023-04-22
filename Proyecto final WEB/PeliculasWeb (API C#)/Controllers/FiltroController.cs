using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
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
    public class FiltroController : Controller
    {

        private readonly string cadena = @"Server=ADALBERTO; Database=DB_peliculasWeb; Trusted_Connection=True;"; //Conexion a bdd

        [HttpGet("filtroTitulo/{busqueda}")]
        public IActionResult FiltroTitulo(string busqueda)
        {
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                SqlCommand cmd = new SqlCommand();

                cmd.CommandText = "SELECT * FROM Peliculas WHERE Titulo LIKE '%' + @Busqueda + '%' OR Director LIKE '%' + @Busqueda + '%' OR Actores LIKE '%' + @Busqueda + '%'";
                cmd.Parameters.AddWithValue("@Busqueda", busqueda);

                cmd.Connection = cn;
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
        
    }
}
