using FluentValidation;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Validators.Transaction;

public class CreateTransactionDtoValidator : AbstractValidator<CreateTransactionDto>
{
    public CreateTransactionDtoValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(150)
            .WithMessage("Description must have at most 150 characters.");

        RuleFor(x => x.Value)
            .GreaterThan(0)
            .WithMessage("Value must be greater than zero.");

        RuleFor(x => x.Type)
            .IsInEnum()
            .WithMessage("Invalid transaction type.");

        RuleFor(x => x.TransactionDate)
            .NotNull()
            .WithMessage("TransactionDate is required.");

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId is required.");

        RuleFor(x => x.PersonId)
            .NotEmpty()
            .WithMessage("PersonId is required.");
    }
}