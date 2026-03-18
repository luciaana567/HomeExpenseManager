using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace HomeExpenseManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _service;

    public TransactionsController(ITransactionService service)
    {
        _service = service;
    }

    // CREATE 
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<TransactionDto>> Create(CreateTransactionDto dto)
    {
        try
        {
            var Transaction = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = Transaction.Id }, Transaction);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET BY ID
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionDto>> GetById(Guid id)
    {
        var Transaction = await _service.GetByIdAsync(id);
        if (Transaction == null)
            return NotFound();

        return Ok(Transaction);
    }

    //GET ALL
    [Authorize]
    [HttpGet("GetAll")]
    public async Task<ActionResult<TransactionDto>> GetAll()
    {
        var Transactions = await _service.GetAllAsync();
        if (Transactions.Count == 0)
            return NotFound();

        return Ok(Transactions);
    }

    // UPDATE
    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<TransactionDto>> Update(Guid id, UpdateTransactionDto dto)
    {
        try
        {
            var Transaction = await _service.UpdateAsync(id, dto);
            if (Transaction == null)
                return NotFound();

            return Ok(Transaction);
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
}