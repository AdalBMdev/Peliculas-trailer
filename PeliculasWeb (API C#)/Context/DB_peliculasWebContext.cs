using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Peliculas.Models;

namespace Peliculas.Context
{
    public partial class DB_peliculasWebContext : DbContext
    {
        public DB_peliculasWebContext()
        {
        }

        public DB_peliculasWebContext(DbContextOptions<DB_peliculasWebContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Pelicula> Peliculas { get; set; } = null!;
        public virtual DbSet<Rol> Rols { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=ADALBERTO; Database=DB_peliculasWeb; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pelicula>(entity =>
            {
                entity.HasKey(e => e.Idpeliculas)
                    .HasName("PK__Pelicula__A802669B87D6F920");

                entity.Property(e => e.Idpeliculas).HasColumnName("IDPeliculas");

                entity.Property(e => e.Actores)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Año).HasColumnType("date");

                entity.Property(e => e.Director)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IdRol).HasColumnName("Id_rol");

                entity.Property(e => e.Link)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Poster)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Reseña).HasColumnType("text");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.IdRol)
                    .HasName("PK__rol__6ABCB5E06AD3086A");

                entity.ToTable("rol");

                entity.Property(e => e.IdRol)
                    .ValueGeneratedNever()
                    .HasColumnName("id_rol");

                entity.Property(e => e.DescripcionRol)
                    .HasMaxLength(33)
                    .IsUnicode(false)
                    .HasColumnName("Descripcion_rol");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Idusuario)
                    .HasName("PK__Usuario__52311169050FDF63");

                entity.ToTable("Usuario");

                entity.Property(e => e.Idusuario).HasColumnName("IDUsuario");

                entity.Property(e => e.Clave)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Correo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IdRol).HasColumnName("Id_rol");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
