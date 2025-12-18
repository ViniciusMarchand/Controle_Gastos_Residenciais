  namespace Api.DTO;

  public record CategoryDetailsResponseDTO(IEnumerable<CategoryResponseDTO> CategoriesDetails, decimal TotalIncome, decimal TotalExpense, decimal TotalBalance);