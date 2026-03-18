using FluentValidation;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Validators;

public class UpdateCategoryDtoValidator : AbstractValidator<CategoryDto>
{
    public UpdateCategoryDtoValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Purpose)
            .IsInEnum();
    }
}