namespace ProyectoFinalBack.Entidades;

public class Usuario
{
    public int Id { get; set; }
    //Evitamos que el valo sea nulo
    public string Email { get; set; } = string.Empty;        
    // Guardamos el "Hash", que es una versión cifrada de la contraseña.
    public string PasswordHash { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    //Valor Inicial de "Usuario"
    public string Rol { get; set; } = "Usuario";
    
    //Obtenemos la fecha del sistema por defecto
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

}
