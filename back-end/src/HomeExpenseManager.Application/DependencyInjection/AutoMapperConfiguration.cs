using AutoMapper;
using HomeExpenseManager.Application.Mappings;
using Microsoft.Extensions.DependencyInjection;

namespace HomeExpenseManager.Application.DependencyInjection;
public static class AutoMapperConfiguration
{
    public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MappingProfile));
        return services;
    }
}