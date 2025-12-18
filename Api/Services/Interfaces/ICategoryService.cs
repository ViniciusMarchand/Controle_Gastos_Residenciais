using Api.DTO;
using Api.Models;

namespace Api.Services.Interfaces;

public interface ICategoryService : ICrudService<Category, CategoryDTO>
{
    Task<CategoryDetailsResponseDTO> GetDetails();
}