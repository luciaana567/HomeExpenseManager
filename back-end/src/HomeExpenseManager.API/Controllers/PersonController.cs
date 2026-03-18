using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> GetById(Guid id)
    {
        var person = await _service.GetByIdAsync(id);
        if (person == null)
            return NotFound();

        return Ok(person);
    }

    //GET ALL
    [Authorize]
    [HttpGet("GetAll")]
    public async Task<ActionResult<PersonDto>> GetAll()
    {
        var persons = await _service.GetAllAsync();
        if ( persons.Count ==0)
            return NotFound();

        return Ok(persons);
    }

    // UPDATE
    [Authorize]
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

    // Consulta de totais por pessoa
    [Authorize]
    [HttpPut("GetPersonsTotals")]
    public async Task<ActionResult<PersonDto>> GetPersonsTotals()
    {
        try
        {
            var persons = await _service.GetPersonsTotals();

            return Ok(persons);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

}