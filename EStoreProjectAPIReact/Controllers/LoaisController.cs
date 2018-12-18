using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EStoreProjectAPIReact.Models;

namespace EStoreProjectAPIReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaisController : ControllerBase
    {
        private readonly MyeStoreContext _context;

        public LoaisController(MyeStoreContext context)
        {
            _context = context;
        }

        //GET: api/Loais/Search?keyword=xyz
        [HttpGet("Search")]        
        public IEnumerable<Loai> SearchLoai(string keyword = "")
        {
            keyword = keyword.ToLower().Trim();
            return _context.Loai.Where(p => p.TenLoai.ToLower().Contains(keyword));
        }

        //GET: api/Loais/Search/xyz
        [HttpGet("Search/{keyword}")]
        public IEnumerable<Loai> SearchLoaiRoute([FromRoute]string keyword = "")
        {
            var req = HttpContext.Request;
            var url = $"http{(req.IsHttps? "s":"")}://{req.Host}/Hinh/Loai";
            keyword = keyword.ToLower().Trim();
            var data = _context.Loai.Where(p => p.TenLoai.ToLower().Contains(keyword)).ToList();

            for(int i = 0; i < data.Count; i++)
            {
                data[i].Hinh = $"{url}/{data[i].Hinh}";
            }

            return data;
        }

        // GET: api/Loais
        [HttpGet]
        public IEnumerable<Loai> GetLoai()
        {
            var req = HttpContext.Request;
            var url = $"http{(req.IsHttps ? "s" : "")}://{req.Host}/Hinh/Loai";
            var data = _context.Loai.ToList();
            for (int i = 0; i < data.Count; i++)
            {
                data[i].Hinh = $"{url}/{data[i].Hinh}";
            }

            return data;
        }

        // GET: api/Loais/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLoai([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loai = await _context.Loai.FindAsync(id);

            if (loai == null)
            {
                return NotFound();
            }

            return Ok(loai);
        }

        // PUT: api/Loais/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoai([FromRoute] int id, [FromBody] Loai loai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != loai.MaLoai)
            {
                return BadRequest();
            }

            _context.Entry(loai).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoaiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Loais
        [HttpPost]
        public async Task<IActionResult> PostLoai([FromBody] Loai loai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Loai.Add(loai);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoai", new { id = loai.MaLoai }, loai);
        }

        // DELETE: api/Loais/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoai([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loai = await _context.Loai.FindAsync(id);
            if (loai == null)
            {
                return NotFound();
            }

            _context.Loai.Remove(loai);
            await _context.SaveChangesAsync();

            return Ok(loai);
        }

        private bool LoaiExists(int id)
        {
            return _context.Loai.Any(e => e.MaLoai == id);
        }

        [Route("uploader/upload")]
        public dynamic Upload(IFormCollection form)
        {
            try
            {
                //Map từ formcollection sang Loai
                var lo = new Loai();
                if (form.Any())
                {
                    if (form.Keys.Contains("tenLoai"))
                    {
                        lo.TenLoai = form["tenLoai"];
                    }
                    if (form.Keys.Contains("moTa"))
                    {
                        lo.TenLoai = form["moTa"];
                    }
                }
                //xử lý uplaod hình
                foreach (var file in form.Files)
                {
                    UploadFile(file);
                }
                //lo.Hinh = form.Files[0].FileName;
                //a.png;b.png;c.jpg
                lo.Hinh = string.Join(";", form.Files.Select(p => p.FileName));
                _context.Add(lo);
                _context.SaveChanges();
                return new { Success = true };
            }
            catch (Exception ex)
            {
                return new { Success = false, ex.Message };
            }
        }

        private void UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new Exception("File is empty!");
            string fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Hinh", "Loai", file.FileName);
            using (var myfile = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(myfile);
            }
        }
    }
}