using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace HomeExpenseManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }

    // CREATE - cria usuário
    [HttpPost]
    public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
    {
        try
        {
            var user = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetById(Guid id)
    {
        var user = await _service.GetByIdAsync(id);
        if (user == null)
            return NotFound();

        return Ok(user);
    }

    //GET ALL
    [HttpGet("GetAll")]
    public async Task<ActionResult<UserDto>> GetAll()
    {
        var users = await _service.GetAllAsync();
        if ( users.IsNullOrEmpty())
            return NotFound();

        return Ok(users);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<ActionResult<UserDto>> Update(Guid id, UpdateUserDto dto)
    {
        try
        {
            var user = await _service.UpdateAsync(id, dto);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}