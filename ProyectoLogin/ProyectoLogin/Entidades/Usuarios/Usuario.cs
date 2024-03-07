using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Usuarios
{
    public class Usuario
    {
        [Key]
        public int Usr_IdUsuario { get; set; }
        [StringLength(150, MinimumLength = 3, ErrorMessage = "El nombre debe tener menos de tres caracteres, ni mas de 150.")]
        public string Usr_Email { get; set; } = string.Empty;
        [Required]
        public string Usr_Password { get; set; } = string.Empty;

    }
}
