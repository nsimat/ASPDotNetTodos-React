import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Row, Col, Layout, message } from 'antd';
import './TodoList.css';
import TodoTabComponent from './TodoTabComponent';
import TodoFormComponent from './TodoFormComponent';
import { createTodo, deleteTodo, loadTodos, updateTodo } from "../services/todoService";

const { TabPane } = Tabs;
const { Content } = Layout;

function TodoListComponent() {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleFormSubmit = (todo) => {
        console.log('Todo to create ->', todo);
        createTodo(todo).then(onRefresh());
        message.success('Todo added!');
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id).then(onRefresh());
        message.warn('Todo removed!');
    }

    const handleToggleTodoStatus = (todo) => {
        todo.completed = !todo.completed;
        updateTodo(todo).then(onRefresh());
        message.info('Todo status updated!');
    }

    const refresh = () => {
        loadTodos().then(jsonData => {
            setTodos(jsonData);
            setActiveTodos(jsonData.filter(todo => todo.completed === false));
            setCompletedTodos(jsonData.filter(todo => todo.completed === true));
        }).then(console.log('Fetch with axios completed!'));
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTodos;
        setTodos(data);
        setActiveTodos(data.filter(todo => todo.completed === false));
        setCompletedTodos(data.filter(todo => todo.completed === true));
        setRefreshing(false);
        console.log('Refresh state ->', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh]);

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="todolist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Codebrains Todos</h1>
                            <TodoFormComponent onFormSubmit={handleFormSubmit} />
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTabComponent todos={todos} onTodoToogle={handleToggleTodoStatus()} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTabComponent todos={activeTodos} onTodoToogle={handleToggleTodoStatus()} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TodoTabComponent todos={completedTodos} onTodoToogle={handleToggleTodoStatus()} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoListComponent;