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

namespace Peliculas.Controllers;
[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly string cadena = @"Server=ADALBERTO; Database=DB_peliculasWeb; Trusted_Connection=True;"; //Conexion a bdd


    [HttpPost("login")]
    public IActionResult Login([FromBody] JsonElement body)
    {
        // Obtener los valores de correo y clave del objeto JSON
        string correo = body.GetProperty("correo").GetString();
        var claveEncriptada = ConvertirSha256(body.GetProperty("clave").GetString()); //Vuelve a encriptar la clave introducida por el usuario

        using (SqlConnection cn = new SqlConnection(cadena))
        {
            SqlCommand cmd = new SqlCommand("sp_Validar", cn); //Usa el store procedure "sp_Validar"
            cmd.Parameters.AddWithValue("@Correo", correo);//Envia los datos necesarios
            cmd.Parameters.AddWithValue("@Clave", claveEncriptada);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.Open();

            int idUsuario = Convert.ToInt32(cmd.ExecuteScalar() ?? 0);


            if (idUsuario != 0) //Si encuentra un usuario 
            {

                HttpContext.Session.SetInt32("IdUsuario", idUsuario);

                //Obtener nickname
                SqlCommand cmd2 = new SqlCommand("SELECT Id_rol FROM Usuario WHERE IDUsuario = @IDUsuario", cn);
                cmd2.Parameters.AddWithValue("@IDUsuario", idUsuario);
                int rol = Convert.ToInt32(cmd.ExecuteScalar() ?? 0);

                var usuario = new
                {
                    id = idUsuario,
                    rol = rol,
                    mensaje = "Usuario encontrado"
                };

                // Serializar objeto en formato JSON y enviar como respuesta
                var jsonUsuario = JsonConvert.SerializeObject(usuario);
                return Ok(jsonUsuario);


            }
            else //Si no encuentra un usuario 
            {

                // Crear objeto con mensaje de error
                var error = new
                {
                    mensaje = "Usuario no encontrado"
                };

                // Serializar objeto en formato JSON y enviar como respuesta
                var jsonError = JsonConvert.SerializeObject(error);
                return BadRequest(jsonError);
            }
        }
    }


    private string ConvertirSha256(string inputString) //Encriptacion
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(inputString));

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }

    [HttpGet("logout")]
    public IActionResult Logout() //Desloguear-Cerrar sesion
    {
        HttpContext.Session.Clear();

        var usuario = new
        {
            id = 0,
            mensaje = "Sesion de Usuario finalizada"
        };

        // Serializar objeto en formato JSON y enviar como respuesta
        var jsonUsuario = JsonConvert.SerializeObject(usuario);
        return Ok(jsonUsuario);
    }

}



