using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HomeExpenseManager.Domain.Entities;

namespace HomeExpenseManager.Infrastructure.Data.Configurations;

public class UserMapping : BaseEntityMapping<User>
{
    public override void Configure(EntityTypeBuilder<User> builder)
    {
        base.Configure(builder);

        builder.ToTable("Users");        

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(u => u.UserName)
            .HasMaxLength(150);

        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.Property(u => u.Password)
            .IsRequired();

        builder.Property(u => u.Role)
            .IsRequired();
    }
}