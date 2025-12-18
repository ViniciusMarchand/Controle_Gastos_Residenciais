using Api.DTO;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("transactions")]
public class TransactionController(ITransactionService transactionService) : ControllerBase
{
    private readonly ITransactionService _transactionService = transactionService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionResponseDTO>>> FindAll()
    {
        IEnumerable<TransactionResponseDTO> transactions = await _transactionService.FindAllDetailsAsync();

        return Ok(transactions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> FindById(Guid id)
    {
        Transaction transaction = await _transactionService.FindByIdAsync(id);

        return Ok(transaction);
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> Save([FromBody]TransactionDTO dto)
    {
        Transaction transaction = await _transactionService.SaveAsync(dto);

        return Ok(transaction);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Transaction>> Update(Guid id, [FromBody] TransactionDTO dto)
    {
        Transaction transaction = await _transactionService.UpdateAsync(dto, id);

        return Ok(transaction);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _transactionService.DeleteAsync(id);

        return Ok();
    }
}
