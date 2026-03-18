using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Application.Mappings;
using HomeExpenseManager.Application.Services;
using HomeExpenseManager.Application.utils;
using HomeExpenseManager.Domain.Interfaces;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using HomeExpenseManager.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace HomeExpenseManager.Application.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPersonService, PersonService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ITransactionService, TransactionService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<ILoginService, LoginService>();


        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPersonRepository, PersonRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();

        return services;
    }
}