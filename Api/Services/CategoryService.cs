using Api.Data;
using Api.DTO;
using Api.Enums;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class CategoryService(AppDbContext dbContext) : ICategoryService
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task DeleteAsync(Guid id)
    {
        Category category = await FindByIdAsync(id);
        
        _dbContext.Categories.Remove(category);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Category>> FindAllAsync()
    {
        return await _dbContext.Categories.ToListAsync();
    }

    public async Task<Category> FindByIdAsync(Guid id)
    {
        return await _dbContext.Categories.FirstOrDefaultAsync(u => u.Id == id) ?? throw new KeyNotFoundException("Category not found.");
    }

    public async Task<Category> SaveAsync(CategoryDTO dto)
    {
        Category newCategory = new()
        {
            Description = dto.Description,
            Type = dto.Type
        };

        await _dbContext.AddAsync(newCategory);
        await _dbContext.SaveChangesAsync();

        return newCategory;
    }

    public async Task<Category> UpdateAsync(CategoryDTO dto, Guid id)
    {
        Category category = await FindByIdAsync(id);

        category.Description = dto.Description;
        category.Type = dto.Type;

        _dbContext.Categories.Update(category);
        await _dbContext.SaveChangesAsync();

        return category;
    }

    public async Task<CategoryDetailsResponseDTO> GetDetails()
    {

        IEnumerable<CategoryResponseDTO> categories = await _dbContext.Categories
            .Include(u => u.Transactions)
            .Select(u => new
            {
                Category = u,
                Income = u.Transactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Value),
                Expense = u.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Value)
            })
            .Select(x => new CategoryResponseDTO(
                x.Category,
                x.Income,
                x.Expense,
                x.Income - x.Expense
            ))
            .ToListAsync();

        CategoryDetailsResponseDTO response = new(
            categories,
            categories.Sum(u => u.Income),
            categories.Sum(u => u.Expense),
            categories.Sum(u => u.Balance)
        );

        return response;
    }   
}