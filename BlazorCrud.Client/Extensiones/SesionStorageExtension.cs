using Blazored.SessionStorage;
using BlazorCrud.Shared;
using System.Text.Json;
using System.Text;
 

namespace BlazorCrud.Client.Extensiones
{
    public static class SesionStorageExtension
    {
        public static async Task GuardarStorage<T>(
            this ISessionStorageService sessionStorageService,
            string key, T item
            ) where T : class
        {
            var itemJson = JsonSerializer.Serialize(item);
            await sessionStorageService.SetItemAsStringAsync(key, itemJson);
        }

        public static async Task<T?> ObtenerStorage<T>(
            this ISessionStorageService sessionStorageService,
            string key
            ) where T : class
        {
            var itemJon = await sessionStorageService.GetItemAsStringAsync(key);

            if (itemJon != null)
            {
                var item = JsonSerializer.Deserialize<T>(itemJon);
                return item;
            } else { return null; }
        }
    }
}
