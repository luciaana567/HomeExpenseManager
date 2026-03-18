using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace HomeExpenseManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoriesController(ICategoryService service)
    {
        _service = service;
    }

    // CREATE 
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto)
    {
        try
        {
            var category = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET BY ID
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetById(Guid id)
    {
        var category = await _service.GetByIdAsync(id);
        if (category == null)
            return NotFound();

        return Ok(category);
    }

    //GET ALL
    [Authorize]
    [HttpGet("GetAll")]
    public async Task<ActionResult<CategoryDto>> GetAll()
    {
        var categorys = await _service.GetAllAsync();
        if ( categorys.Count == 0)
            return NotFound();

        return Ok(categorys);
    }

    // UPDATE
    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<CategoryDto>> Update(Guid id, CategoryDto dto)
    {
        try
        {
            var category = await _service.UpdateAsync(id, dto);
            if (category == null)
                return NotFound();

            return Ok(category);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // DELETE
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }

    // Consulta de totais por categoria
    [Authorize]
    [HttpPut("GetCategoriesTotals")]
    public async Task<ActionResult<PersonDto>> GetCategoriesTotals()
    {
        try
        {
            var categories = await _service.GetCategoriesTotals();

            return Ok(categories);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}