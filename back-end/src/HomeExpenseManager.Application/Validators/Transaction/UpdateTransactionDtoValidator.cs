using FluentValidation;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Validators;

public class UpdateTransactionDtoValidator : AbstractValidator<UpdateTransactionDto>
{
    public UpdateTransactionDtoValidator()
    {
        When(x => x.Description is not null, () =>
        {
            RuleFor(x => x.Description!)
                .NotEmpty()
                .MaximumLength(150);
        });

        When(x => x.Value.HasValue, () =>
        {
            RuleFor(x => x.Value!.Value)
                .GreaterThan(0);
        });

        When(x => x.Type.HasValue, () =>
        {
            RuleFor(x => x.Type!.Value)
                .IsInEnum();
        });

        When(x => x.TransactionDate.HasValue, () =>
        {
            RuleFor(x => x.TransactionDate!.Value)
                .NotEqual(default(DateTime));
        });

        When(x => x.CategoryId != Guid.Empty, () =>
        {
            RuleFor(x => x.CategoryId)
                .NotEmpty();
        });

        When(x => x.PersonId != Guid.Empty, () =>
        {
            RuleFor(x => x.PersonId)
                .NotEmpty();
        });
    }
}