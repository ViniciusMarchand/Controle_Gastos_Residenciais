using Api.Data;
using Api.DTO;
using Api.Enums;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class TransactionService(AppDbContext dbContext) : ITransactionService
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task DeleteAsync(Guid id)
    {
        Transaction transaction = await FindByIdAsync(id);
        
        _dbContext.Transactions.Remove(transaction);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Transaction>> FindAllAsync()
    {
        return await _dbContext.Transactions.Include(t => t.User).ToListAsync();
    }

    public async Task<IEnumerable<TransactionResponseDTO>> FindAllDetailsAsync()
    {
        return await _dbContext.Transactions
            .Include(t => t.User)
            .Include(t => t.Category)
            .Select(t => new TransactionResponseDTO(t.Id, t.Description, t.Value, t.Type, t.User.Name, t.Category.Description, t.UserId, t.CategoryId))
            .ToListAsync();
    }


    public async Task<Transaction> FindByIdAsync(Guid id)
    {
        return await _dbContext.Transactions.FirstOrDefaultAsync(u => u.Id == id) ?? throw new KeyNotFoundException("Transaction not found.");
    }


    public async Task<Transaction> SaveAsync(TransactionDTO dto)
    {
        User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId) ?? throw new KeyNotFoundException("User not found.");
        Category category = await _dbContext.Categories.FirstOrDefaultAsync(u => u.Id == dto.CategoryId) ?? throw new KeyNotFoundException("Category not found.");

        if (user.Age < 18 && category.Type == CategoryType.Income)
            throw new Exception("Minors cannot add income.");

        Transaction newTransaction = new()
        {
            CategoryId = dto.CategoryId,
            Description = dto.Description,
            Type = dto.Type,
            UserId = dto.UserId,
            Value = dto.Value,
            User = user,
            Category = category
        };

        await _dbContext.AddAsync(newTransaction);
        await _dbContext.SaveChangesAsync();

        return newTransaction;
    }

    public async Task<Transaction> UpdateAsync(TransactionDTO dto, Guid id)
    {
        Transaction transaction = await FindByIdAsync(id);
        User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId) ?? throw new KeyNotFoundException("User not found.");
        Category category = await _dbContext.Categories.FirstOrDefaultAsync(u => u.Id == dto.CategoryId) ?? throw new KeyNotFoundException("Category not found.");

        if (user.Age < 18 && category.Type == CategoryType.Income)
            throw new Exception("Minors cannot add income.");

        transaction.CategoryId = dto.CategoryId;
        transaction.Description = dto.Description;
        transaction.Type = dto.Type;
        transaction.UserId = dto.UserId;
        transaction.Value = dto.Value;
        transaction.User = user;
        transaction.Category = category;

        _dbContext.Transactions.Update(transaction);
        await _dbContext.SaveChangesAsync();

        return transaction;
    }
}