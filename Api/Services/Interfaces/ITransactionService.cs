using Api.DTO;
using Api.Models;

namespace Api.Services.Interfaces;

public interface ITransactionService : ICrudService<Transaction, TransactionDTO>
{
    Task<IEnumerable<TransactionResponseDTO>> FindAllDetailsAsync();
}