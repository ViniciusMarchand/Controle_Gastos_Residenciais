using Api.Enums;

namespace Api.Models;

public class Category
{
    public Guid Id  { get; set; }
    public string Description { get; set; } = string.Empty;
    public CategoryType Type { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = [];
}