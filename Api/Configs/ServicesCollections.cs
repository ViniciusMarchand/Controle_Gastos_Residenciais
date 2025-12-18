using Api.Services;
using Api.Services.Interfaces;

namespace Api.Configs;

public static class ServicesCollection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ITransactionService, TransactionService>();
 
        return services;
    }
}

