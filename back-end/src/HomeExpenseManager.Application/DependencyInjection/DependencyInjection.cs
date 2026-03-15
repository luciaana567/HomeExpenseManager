using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Application.Mappings;
using HomeExpenseManager.Application.Services;
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

        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }
}