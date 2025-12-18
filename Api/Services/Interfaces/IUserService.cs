using Api.DTO;
using Api.Models;

namespace Api.Services.Interfaces;

public interface IUserService : ICrudService<User, UserDTO>
{
    Task<UserDetailsResponseDTO> GetDetails();
}