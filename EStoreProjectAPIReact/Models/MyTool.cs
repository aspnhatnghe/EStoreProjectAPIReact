using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EStoreProjectAPIReact.Models
{
    public class MyTool
    {
        public static string GetFullImagePath(HttpRequest request, string folder, string fileName)
        {
            var url = $"http{(request.IsHttps ? "s" : "")}://{request.Host}/Hinh";
            //kiểm tra xem có file hình trên server
            var fileInServer = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Hinh", folder, fileName);
            if (File.Exists(fileInServer))
            {
                return $"{url}/{folder}/{fileName}";
            }
            return $"{url}/no-image.png";
        }
    }
}
