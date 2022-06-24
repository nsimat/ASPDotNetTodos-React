import React, { useEffect } from 'react';
import { Tabs, Layout, Row, List } from 'antd';
import TodoItemComponent from './TodoItemComponent';

function TodoTabComponent({ todos, onTodoRemoval, onTodoToggle }) {
    return (
        <>
            <List>
                locale{{ emptyText: "There's nothing to do :(", }}
                dataSource={todos}
                renderIten={(todo) => {
                    <TodoItemComponent
                        todo={todo}
                        onTodoToggle={onTodoToggle}
                        onTodoRemoval={onTodoRemoval}
                    />
                }}
                pagination={{
                    position: 'bottom',
                    pageSize: 10,
                }}
            </List>
        </>
    );
}

export default TodoTabComponent;