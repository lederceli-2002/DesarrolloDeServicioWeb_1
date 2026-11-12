using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinalBack.Data;
using ProyectoFinalBack.DTO;
using ProyectoFinalBack.Entidades;

namespace ProyectoFinalBack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public UsuarioController(AppDbContext context)
    {
        _appDbContext = context;
    }


    //Registrar Usuarios
    [HttpPost("registro")]
    public async Task<IActionResult> Registrar([FromBody] RegistroUsuarioDTO dto)
    {
        if (await _appDbContext.Usuarios.AnyAsync(u => u.Email == dto.Email))
        {
            return BadRequest(new { message = "El correo ya está registrado." });
        }
        //Encriptacion de la contraseña
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var usuario = new Usuario
        {
            Nombre = dto.Nombre,
            Email = dto.Email,
            PasswordHash = passwordHash,
            Rol=dto.Rol,
            FechaCreacion=DateTime.UtcNow
        };

        _appDbContext.Usuarios.Add(usuario);
        await _appDbContext.SaveChangesAsync();

        return Ok(new {message= "Usuario registrado exitosamente" }); 

    }

    //Login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        var usuario = await _appDbContext.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (usuario == null)
        {
            return Unauthorized(new { message = "Correo incorrecto." });
        }

        // Validar la contraseña enviada contra el Hash guardado
        bool esPasswordValido = BCrypt.Net.BCrypt.Verify(dto.Password, usuario.PasswordHash);

        if (!esPasswordValido)
        {
            return Unauthorized(new { message = "Contraseña incorrecta." });
        }

        return Ok(new { message = "Login exitoso", usuarioId = usuario.Id, nombre = usuario.Nombre , rol = usuario.Rol });
    }

}
