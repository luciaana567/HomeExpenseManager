using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserMapping());

        base.OnModelCreating(modelBuilder);
    }
}