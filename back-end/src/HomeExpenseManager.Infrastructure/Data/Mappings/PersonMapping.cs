using HomeExpenseManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Infrastructure.Data.Mappings
{
    public class PersonMapping : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.ToTable("Persons");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(p => p.Birthday)
                   .IsRequired();

            builder.HasOne(p => p.User)
                   .WithOne(u => u.Person)
                   .HasForeignKey<Person>(p => p.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
