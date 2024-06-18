using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BlazorCrud.Server.Models
{
    public class Jwt
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
        public static dynamic ValidarToken(ClaimsIdentity identity)
        {
            try
            {
                if (identity.Claims.Count() == 0)
                {
                    return new
                    {
                        success = false,
                        message = "Verificar token",
                        result = ""
                    };
                }

                var id = identity.Claims.FirstOrDefault(x => x.Type == "id").Value;

                Usuario usuario = Usuario.DB().FirstOrDefault(x => x.id == id);

                return new
                {
                    success = true,
                    message = "Exito",
                    result = usuario
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = "Catch" + ex.Message,
                    result = ""
                };
            }
        }
    }
}
