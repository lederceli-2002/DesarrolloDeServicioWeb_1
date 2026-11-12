namespace ProyectoFinalBack.DTO;

public class RegistroUsuarioDTO
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Rol { get; set; } = "EMPLEADO";

}
