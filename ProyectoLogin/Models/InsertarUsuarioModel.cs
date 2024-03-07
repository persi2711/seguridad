using Humanizer.Localisation.TimeToClockNotation;

namespace ProyectoLogin.Models
{
    public class InsertarUsuarioModel
    {
        public  int Usr_IdUsuario { get; set; }
        public string Usr_Email { get; set; }=string.Empty;
        public string Password { get; set; }=string.Empty;

    }
}
