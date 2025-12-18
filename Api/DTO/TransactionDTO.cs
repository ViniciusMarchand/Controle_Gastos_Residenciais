using Api.Enums;

namespace Api.DTO;

public record TransactionDTO(string Description, decimal Value, TransactionType Type, Guid UserId, Guid CategoryId);