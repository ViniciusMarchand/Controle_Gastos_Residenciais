using Api.Enums;
using Api.Models;

namespace Api.DTO;
public record TransactionResponseDTO(

    Guid Id,
    string Description,
    decimal Value,
    TransactionType Type,
    string UserName,
    string CategoryDescription,
    Guid UserId,
    Guid CategoryId
);