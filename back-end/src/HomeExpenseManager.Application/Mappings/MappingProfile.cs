using AutoMapper;
using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Application;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        #region user
        CreateMap<User, UserDto>()
           .ForMember(dest => dest.Person, opt => opt.MapFrom(src => src.Person))
           .ReverseMap();

        CreateMap<CreateUserDto, User>()
            .ForMember(dest => dest.Person, opt => opt.MapFrom(src => src.Person));

        CreateMap<UpdateUserDto, User>();

        #endregion

        #region person
        CreateMap<PersonDto, Person>()
            .ReverseMap()
            .ForMember(dest => dest.Age, opt => opt.Ignore());            

        CreateMap<CreatePersonDto, Person>();

        #endregion

        #region Category

        CreateMap<CategoryDto, Category>().ReverseMap();

        CreateMap<CreateCategoryDto, Category>();

        #endregion

        #region Transaction

        CreateMap<TransactionDto, Transaction>()
            .ForMember(dest => dest.Person, opt => opt.Ignore())
            .ForMember(dest => dest.Category, opt => opt.Ignore())
            .ReverseMap();

        CreateMap<CreateTransactionDto, Transaction>()
            .ForMember(dest => dest.Person, opt => opt.Ignore())
            .ForMember(dest => dest.Category, opt => opt.Ignore());

        CreateMap<UpdateTransactionDto, Transaction>()
            .ForMember(dest => dest.Person, opt => opt.Ignore())
            .ForMember(dest => dest.PersonId, opt => opt.Ignore())
            .ForMember(dest => dest.Category, opt => opt.Ignore());

        #endregion
    }
}