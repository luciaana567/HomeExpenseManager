using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Infrastructure.Data.Configurations;
using HomeExpenseManager.Infrastructure.Data.Mappings;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Person> Persons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserMapping());
        modelBuilder.ApplyConfiguration(new PersonMapping());

        base.OnModelCreating(modelBuilder);
    }
}