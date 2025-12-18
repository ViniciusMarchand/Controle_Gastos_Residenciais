  namespace Api.DTO;

  public record UserDetailsResponseDTO(IEnumerable<UserResponseDTO> UsersDetails, decimal TotalIncome, decimal TotalExpense, decimal TotalBalance);