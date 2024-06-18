using BlazorCrud.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlazorCrud.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        public IConfiguration _configuration { get; set; }
        public UsuarioController(IConfiguration configuration) 
        { 
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public dynamic IniciarSesion([FromBody] object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());

            string user = data.usuario.ToString();
            string password = data.password.ToString();

            Usuario usuario = Usuario.DB().Where(x => x.usuario == user && x.password == password).FirstOrDefault();

            if (usuario == null) 
            {
                return new
                {
                    success = false,
                    message = "Credenciales incorrecta",
                    result = ""
                };
            }

            var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("id", usuario.id),
                new Claim("usuario", usuario.usuario),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));

            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    jwt.Issuer,
                    jwt.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: singIn
                );

            return new
            {
                success = true,
                message = "Exitoso",
                result = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

        [HttpPost]
        [Route("Eliminar")]

        public dynamic EliminarCliente()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.ValidarToken(identity);

            if (!rToken.success) return rToken;

            Usuario usuario = rToken.result;

            if (usuario.rol != "administrador")
            {
                return new
                {
                    success = false,
                    message = "No tienes permisos para consumir esta api",
                    result = ""
                };
            }

            return new
            {
                success = true,
                message = "Exitoso",
                result = ""
            };
        }
    }
}
