using AutoMapper;
using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Application;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>()
           .ForMember(dest => dest.Person, opt => opt.MapFrom(src => src.Person))
           .ReverseMap();

        CreateMap<CreateUserDto, User>()
            .ForMember(dest => dest.Person, opt => opt.MapFrom(src => src.Person));

        CreateMap<UpdateUserDto, User>();

        CreateMap<PersonDto, Person>()
            .ReverseMap()
            .ForMember(dest => dest.Age, opt => opt.Ignore());
            

        CreateMap<CreatePersonDto, Person>();

    }
}