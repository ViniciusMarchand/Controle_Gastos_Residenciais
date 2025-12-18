using Api.Models;

namespace Api.DTO;

public record UserResponseDTO(User User, decimal Income, decimal Expense, decimal Balance);