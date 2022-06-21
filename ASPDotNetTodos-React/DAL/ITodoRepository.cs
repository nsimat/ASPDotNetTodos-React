using ASPDotNetTodos_React.Models;

namespace ASPDotNetTodos_React.DAL
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetAllTodos();
        Todo GetTodo(int id);
        void CreateTodo(Todo newTodo);
        void UpdateTodo(Todo oldTodo);
        void DeleteTodo(int id);
        bool SaveAll();
    }
}
