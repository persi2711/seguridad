using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datos;
using Entidades.Usuarios;
using ProyectoLogin.Models;
using System.Security.Claims;
using NuGet.Common;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using NuGet.Protocol;

namespace ProyectoLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly DBContextSistema _context;
        private readonly IConfiguration _configuracion;

        public UsuariosController(DBContextSistema context, IConfiguration configuracion)
        {
            _context = context;
            _configuracion= configuracion;
        }

        #region Insertar. POST: api/Usuario/InsertarUsuario/5
        [HttpPost("[action]")]
        public async Task<IActionResult> InsertarUsuario(InsertarUsuarioModel modelUsuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Usuarios == null)
            {
                return Problem("Entity set 'BdContextSistema.Usuarios' is null ");
            }
            var email = modelUsuario.Usr_Email.ToUpper();
            if (await _context.Usuarios.AnyAsync(u => u.Usr_Email == email))
            {
                return BadRequest("El Email del usuario ya existe");
            }

            Usuario usuario = new()
            {
                
                Usr_Email = email,
                Usr_Password=modelUsuario.Password,

            };
            _context.Usuarios.Add(usuario);
            try
            {
                await _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                string error = ex.Message;
                var inner = ex.InnerException;
                return BadRequest();
            }
            return Ok(modelUsuario.Usr_Email.ToJson());
        }
        #endregion

        #region Login POST: api/Usuario/Login
        [HttpPost("[action]")]
        public async Task<IActionResult> Login(UserLoginModel model)
        {
            var email=model.Email.ToUpper();
            var usuario =await _context.Usuarios.FirstOrDefaultAsync(u=>u.Usr_Email==email);
           
            if(usuario == null)
            {
                return NotFound();
            }
            if (usuario.Usr_Password != model.Password)
            {
                return Problem("constraseña es incorrecta ");
            }

            return Ok(usuario.Usr_Password.ToJson());
        }
        #endregion

        #region servicios
        private static void CreaPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerificaPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac= new System.Security.Cryptography.HMACSHA512(passwordSalt)) 
            {
                var nuevoPasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return new ReadOnlySpan<byte>(passwordHash).SequenceEqual(new ReadOnlySpan<byte>(nuevoPasswordHash));
            }
        }

        private string GenerarTokens(List<Claim> claims) 
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuracion["Jwt:Key"]));
            var credenciales = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuracion["jnt:Issuer"],
                _configuracion["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credenciales,
                claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        #endregion









    }
}
