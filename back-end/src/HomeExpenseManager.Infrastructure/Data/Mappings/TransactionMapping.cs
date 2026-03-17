using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HomeExpenseManager.Domain.Entities;

namespace HomeExpenseManager.Infrastructure.Data.Configurations;

public class TransactionMapping : BaseEntityMapping<Transaction>
{
    public override void Configure(EntityTypeBuilder<Transaction> builder)
    {
        base.Configure(builder);

        builder.ToTable("Transactions");

        builder.Property(x => x.Description)
        .HasMaxLength(400)
        .IsRequired();

        builder.Property(x => x.Value)
               .IsRequired();

        builder.Property(x => x.Type)
               .IsRequired();

        builder.Property(x => x.TransactionDate)
               .IsRequired();

        builder.HasOne(x => x.Category)
               .WithMany(c => c.Transactions)
               .HasForeignKey(x => x.CategoryId);

        builder.HasOne(t => t.Person)
               .WithMany(p => p.Transactions)
               .HasForeignKey(t => t.PersonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}