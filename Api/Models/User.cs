namespace Api.Models;

public class User
{
    public Guid Id  { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Age { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = [];
}