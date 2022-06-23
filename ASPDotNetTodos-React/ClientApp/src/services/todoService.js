import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}`;

const axiosInstance = axios.create({ baseURL: `${baseUrl}` });

export const loadTodos = async () =>
{
    return axiosInstance
        .get("/todos")
        .then(async (response) => {
            console.log('List of todos ->', response.data);
            return response.data;
        })
        .catch((_error) => Promise.reject("Something went wrong in loadTodos()!"));
};

export const getTodo = async (id) =>
{
    console.log('Getting todo with id: ' + id);
    return axiosInstance
        .get(`/todos/${id}`)
        .then(async (response) => {
            console.log('Todo returned ->', response.data);
            return response.data;
        })
        .catch((_error) => Promise.reject("Something went wrong getTodo()!"));
};

export const createTodo = (todo) => {
    console.log('Creating Todo -> ', todo);
    return axiosInstance
        .post("/todos", todo)
        .then(async (response) => {
            if (response.status === 404) {
                console.log('Hey! Failed to create Todo.');
                alert('Hey!Todo creation failed!');
            }
            if (response.status === 201) {
                console.log('Todo created -> ', todo);
                alert('Todo successfully created!');
            }
        })
        .catch((_error) => {
            if (_error.response.status === 404) {
                alert('Invalid request!');
                return Promise.reject("Something went wrong in createTodo()!")
            } else {
                alert('Something went wrong when creating Todo!');
                return Promise.reject('Something went wrong!');
            }
        });
};

export const updateTodo = async ( id, body) => {
    console.log('Updating body -> ', body);
    return axiosInstance
        .put(`/todos/${id}`, body)
        .then((response) => {
            if (response.status === 404) {
                console.log('Something went wrong while updating todo!');
                alert('Failed to update todo!');
            }
            if (response.status === 201) {
                console.log('Updating done successfully.');
                alert('Todo updated with success.');
            }
        })
        .catch( (_error) => {
            if (_error.response.status === 404) {
                return Promise.reject('Todo incorrect!');
            } else {
                return Promise.reject('Something went wrong!');
            }
        });
};

export const deleteTodo = async  (id) => {
    console.log('Deleting todo -> ', getTodo(id));
    return axiosInstance
        .delete(`/todos/${id}`)
        .then((response) => {
            if (response.status === 404) {
                alert('Todo not found!');
            }
            if (response.status === 201) {
                console.log('Todo deleted successfully!');
                alert('Todo deleted successfully!');
            }
        })
        .catch( (_error) => Promise.reject('Something went wrong while deleting todo!') );
}



