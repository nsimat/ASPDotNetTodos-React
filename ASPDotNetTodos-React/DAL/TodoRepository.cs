using ASPDotNetTodos_React.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPDotNetTodos_React.DAL
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _todoDbContext;
        private readonly ILogger _logger;

        public TodoRepository(TodoDbContext todoDbContext, ILogger<TodoRepository> logger)
        {
            this._todoDbContext = todoDbContext;
            this._logger = logger;
        }

        public IEnumerable<Todo> GetAllTodos()
        {
            try
            {
                _logger.LogInformation("GetAllTodos was called...");
                return _todoDbContext.Todos.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all todos: {ex}");
                return null;
            }

        }

        public Todo GetTodo(int id)
        {
            try
            {
                var todo = _todoDbContext.Todos.Find(id);
                return todo;

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Todo: {ex}");
                return null;
            }
        }

        public void CreateTodo(Todo newTodo)
        {
            _todoDbContext.Add(newTodo);
        }

        public void UpdateTodo(Todo oldTodo)
        {
            _todoDbContext.Entry(oldTodo).State = EntityState.Modified;
        }

        public void DeleteTodo(Todo todo)
        {
            _todoDbContext.Todos.Remove(todo);
        }

        public bool SaveAll()
        {
            try
            {
                _logger.LogInformation("SaveAll was called.");
                return _todoDbContext.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save data: {ex}");
                return false;
            }
        }
    }
}
