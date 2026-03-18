using FluentValidation;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Category;

namespace HomeExpenseManager.Application.Validators;

public class CreateCategoryDtoValidator : AbstractValidator<CreateCategoryDto>
{
    public CreateCategoryDtoValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Purpose)
            .IsInEnum();
    }
}