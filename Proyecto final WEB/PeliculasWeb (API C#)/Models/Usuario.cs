using System;
using System.Collections.Generic;

namespace Peliculas.Models
{
    public partial class Usuario
    {
        public int Idusuario { get; set; }
        public int? IdRol { get; set; }
        public string? Correo { get; set; }
        public string? Clave { get; set; }
    }
}
