using Api.DTO;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("categories")]
public class CategoryController(ICategoryService categoryService) : ControllerBase
{
    private readonly ICategoryService _categoryService = categoryService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> FindAll()
    {
        IEnumerable<Category> categories = await _categoryService.FindAllAsync();

        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> FindById(Guid id)
    {
        Category category = await _categoryService.FindByIdAsync(id);

        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> Save([FromBody] CategoryDTO dto)
    {
        Category category = await _categoryService.SaveAsync(dto);

        return Ok(category);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Category>> Update(Guid id, [FromBody] CategoryDTO dto)
    {
        Category category = await _categoryService.UpdateAsync(dto, id);

        return Ok(category);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _categoryService.DeleteAsync(id);

        return Ok();
    }

    [HttpGet("details")]
    public async Task<ActionResult<CategoryDetailsResponseDTO>> GetDetails()
    {
        CategoryDetailsResponseDTO response = await _categoryService.GetDetails();

        return Ok(response);
    }
}
