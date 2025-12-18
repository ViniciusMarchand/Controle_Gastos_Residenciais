using Api.Models;

namespace Api.DTO;

public record CategoryResponseDTO(Category Category, decimal Income, decimal Expense, decimal Balance);