using ASPDotNetTodos_React.DAL;
using ASPDotNetTodos_React.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPDotNetTodos_React.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;
        private readonly ILogger<TodosController> _logger;
        private readonly TodoDbContext _dbContext;

        public TodosController(ITodoRepository todoRepository, ILogger<TodosController> logger, TodoDbContext todoDbContext)
        {
            _todoRepository = todoRepository;
            _logger = logger;
            _dbContext = todoDbContext;
        }

        // GET: api/v1/<TodosController>
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                _logger.LogInformation("GetAll was called for todos from TodosController.");
                var results = _todoRepository.GetAllTodos();
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get todos from TodosController: {ex}");
                return BadRequest("Failed to get todos!");
            }
        }

        // GET api/v1/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                _logger.LogInformation("Get was called from TodosController.");
                var todo = _todoRepository.GetTodo(id);
                if (todo != null) return Ok(todo);
                else return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get todo: {ex}");
                return BadRequest("Failed to get todo from TodosController!");
            }
        }

        // POST api/v1/<TodosController>
        [HttpPost]
        public IActionResult AddTodo(Todo newTodo)
        {
            try
            {
                _logger.LogInformation("AddTodo was called from TodosController.");
                _todoRepository.CreateTodo(newTodo);
                if (_todoRepository.SaveAll())
                {
                    return CreatedAtAction("Get", new { newTodo.Id }, newTodo);
                    //return Created($"/api/v1/todos/{newTodo.Id}", newTodo);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new todo: {ex}");
            }

            return BadRequest("Failed to save new todo!");
        }

        // PUT api/v1/<TodosController>/5
        [HttpPut("{id}")]
        public ActionResult<Todo> ModifyTodo(int id, Todo updatedTodo)
        {
            _logger.LogInformation("ModifyTodo was called from TodosController.");
            if (id != updatedTodo.Id)
            {
                return BadRequest($"Selected Todo don't have equivalent Id with {id}");
            }

            _todoRepository.UpdateTodo(updatedTodo);

            try
            {
                if (_todoRepository.SaveAll())
                {
                    return Ok("Todo modified from TodosController");
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError($"Failed to modify todo: {ex}");
                if (!NotExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return updatedTodo;
        }

        private bool NotExists(int id)
        {
            return _dbContext.Todos.Any(t => t.Id == id);
        }

        // DELETE api/v1/<TodosController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation("Delete was called from TodosController.");
            var todo = await _dbContext.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            try
            {
                _todoRepository.DeleteTodo(todo);
                if (_todoRepository.SaveAll())
                {
                    return Ok("Todo deleted.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete todo: {ex}");
                throw;
            }
            return NoContent();
        }
    }
}
