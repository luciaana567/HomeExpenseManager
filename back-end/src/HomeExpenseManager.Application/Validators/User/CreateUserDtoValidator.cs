using FluentValidation;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Validators;

public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6);

        RuleFor(x => x.Person)
            .NotNull()
            .WithMessage("Person data is required.");
    }
}