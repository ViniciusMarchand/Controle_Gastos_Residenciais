using System.Text.Json.Serialization;
using Api.Enums;

namespace Api.Models;

public class Transaction
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }

    [JsonIgnore]
    public User User { get; set; } = new();
    public Guid UserId { get; set; }

    [JsonIgnore]
    public Category Category { get; set; } = new();
    public Guid CategoryId { get; set; }
}