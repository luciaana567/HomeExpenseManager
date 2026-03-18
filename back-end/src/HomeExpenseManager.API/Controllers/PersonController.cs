using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Person;
using HomeExpenseManager.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeExpenseManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PersonController : ControllerBase
{
    private readonly IPersonService _service;

    public PersonController(IPersonService service)
    {
        _service = service;
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _service.GetByIdAsync(id);

        if (!result.Success)
            return NotFound(result);

        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] PersonDto dto)
    {
        var result = await _service.UpdateAsync(id, dto);

        if (!result.Success)
            return NotFound(result);

        return Ok(result);
    }

    [HttpGet("totals")]
    public async Task<IActionResult> GetPersonsTotals([FromQuery] PersonTotalsQueryDto query)
    {
        var result = await _service.GetPersonsTotals(query);
        return Ok(result);
    }
}