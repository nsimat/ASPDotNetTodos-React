import React from 'react';
import { List } from 'antd';
import TodoItemComponent from './TodoItemComponent';

function TodoTabComponent( props ) {
    return (
        <>
            <List
                locale={{ emptyText: "There's nothing to do :-(", }}
                dataSource={props.todos}
                renderItem={(todo) => (
                    <TodoItemComponent
                        todo={todo}
                        onTodoToggle={props.onTodoToggle}
                        onTodoRemoval={props.onTodoRemoval}
                    />
                )}
                pagination={{
                    position: "bottom",
                    pageSize: 10,
                }}
            />
        </>
    );
}

export default TodoTabComponent;