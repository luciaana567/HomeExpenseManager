using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace HomeExpenseManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPersonService _service;

    public PersonController(IPersonService service)
    {
        _service = service;
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> GetById(Guid id)
    {
        var person = await _service.GetByIdAsync(id);
        if (person == null)
            return NotFound();

        return Ok(person);
    }

    //GET ALL
    [HttpGet("GetAll")]
    public async Task<ActionResult<PersonDto>> GetAll()
    {
        var persons = await _service.GetAllAsync();
        if ( persons.IsNullOrEmpty())
            return NotFound();

        return Ok(persons);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<ActionResult<PersonDto>> Update(Guid id, PersonDto dto)
    {
        try
        {
            var person = await _service.UpdateAsync(id, dto);
            if (person == null)
                return NotFound();

            return Ok(person);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}