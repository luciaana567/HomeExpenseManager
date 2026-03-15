using AutoMapper;
using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Application;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();

        CreateMap<CreateUserDto, User>();

        CreateMap<UpdateUserDto, User>();

    }
}