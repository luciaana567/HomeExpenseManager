using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HomeExpenseManager.Domain.Entities;

namespace HomeExpenseManager.Infrastructure.Data.Configurations;

public class CategoryMapping : BaseEntityMapping<Category>
{
    public override void Configure(EntityTypeBuilder<Category> builder)
    {
        base.Configure(builder);

        builder.ToTable("Categories");        

        builder.Property(u => u.Description)
            .IsRequired()
            .HasMaxLength(400);

        builder.Property(u => u.Purpose)
            .IsRequired();
    }
}