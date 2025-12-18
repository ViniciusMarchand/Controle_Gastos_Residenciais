using Api.DTO;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("users")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> FindAll()
    {
        IEnumerable<User> users = await _userService.FindAllAsync();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> FindById(Guid id)
    {
        User user = await _userService.FindByIdAsync(id);

        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> Save([FromBody] UserDTO dto)
    {
        User user = await _userService.SaveAsync(dto);

        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<User>> Update(Guid id, [FromBody] UserDTO dto)
    {
        User user = await _userService.UpdateAsync(dto, id);

        return Ok(user);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _userService.DeleteAsync(id);

        return Ok();
    }

    [HttpGet("details")]
    public async Task<ActionResult<UserDetailsResponseDTO>> GetDetails()
    {
        UserDetailsResponseDTO response = await _userService.GetDetails();

        return Ok(response);
    }
}
