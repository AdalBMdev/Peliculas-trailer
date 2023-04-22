﻿using System;
using System.Collections.Generic;

namespace Peliculas.Models
{
    public partial class Pelicula
    {
        public int Idpeliculas { get; set; }
        public int? IdRol { get; set; }
        public string? Titulo { get; set; }
        public DateTime? Año { get; set; }
        public string? Director { get; set; }
        public string? Actores { get; set; }
        public string? Reseña { get; set; }
        public string? Poster { get; set; }
        public string? Link { get; set; }
    }
}
