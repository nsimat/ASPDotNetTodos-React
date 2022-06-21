using Microsoft.EntityFrameworkCore;

namespace ASPDotNetTodos_React.Models
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Todo> Todos { get; set; }
    }
}
