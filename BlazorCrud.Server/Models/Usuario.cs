namespace BlazorCrud.Server.Models
{
    public class Usuario
    {
        public string id { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
        public string rol { get; set; }

        public static List<Usuario> DB()
        {
            var list = new List<Usuario>()
            {
                new Usuario
                {
                    id = "1",
                    usuario = "Dairo",
                    password = "123.",
                    rol = "empleado",
                },
                new Usuario
                {
                    id = "2",
                    usuario = "Arenas",
                    password = "123.",
                    rol = "empleado",
                },
                new Usuario
                {
                    id = "3",
                    usuario = "Kevin",
                    password = "123.",
                    rol = "asesor",
                },
                new Usuario
                {
                    id = "4",
                    usuario = "Juan",
                    password = "123.",
                    rol = "administrador",
                },
            };
            return list;
        }
    }
}
