using Api.Data;
using Api.DTO;
using Api.Enums;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class UserService(AppDbContext dbContext) : IUserService
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task DeleteAsync(Guid id)
    {
        User user = await FindByIdAsync(id);

        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<User>> FindAllAsync()
    {
        return await _dbContext.Users.ToListAsync();
    }

    public async Task<User> FindByIdAsync(Guid id)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id) ?? throw new KeyNotFoundException("User not found.");
    }

    public async Task<UserDetailsResponseDTO> GetDetails()
    {

        IEnumerable<UserResponseDTO> users = await _dbContext.Users
            .Include(u => u.Transactions)
            .Select(u => new
            {
                User = u,
                Income = u.Transactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Value),
                Expense = u.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Value)

                
            })
            .Select(x => new UserResponseDTO(
                x.User,
                x.Income,
                x.Expense,
                x.Income - x.Expense
            ))
            .ToListAsync();

        UserDetailsResponseDTO response = new(
            users,
            users.Sum(u => u.Income),
            users.Sum(u => u.Expense),
            users.Sum(u => u.Balance)
        );

        return response;
    }

    public async Task<User> SaveAsync(UserDTO dto)
    {
        User newUser = new()
        {
            Name = dto.Name,
            Age = dto.Age
        };

        await _dbContext.AddAsync(newUser);
        await _dbContext.SaveChangesAsync();

        return newUser;
    }

    public async Task<User> UpdateAsync(UserDTO dto, Guid id)
    {
        User user = await FindByIdAsync(id);

        user.Name = dto.Name;
        user.Age = dto.Age;

        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();

        return user;
    }
}