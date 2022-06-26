import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

function TodoItemComponent(props) {
    return (
        <List.Item
            actions={[
                <Tooltip
                    title={props.todo.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => props.onTodoToggle(props.todo)}
                        defaultChecked={props.todo.completed}
                    />
                </Tooltip>,
                <Popconfirm
                    title={'Are you sure you want to delete?'}
                    onConfirm={() => {props.onTodoRemoval(props.todo);} }
                >
                    <Button className="remove-todo-button" type="primary" danger>
                        X
                    </Button>
                </Popconfirm>,
            ]}
            className="list-item"
            key={props.todo.id}
        >
            <div className="todo-item">
                <Tag color={props.todo.completed ? 'cyan' : 'red'} className="todo-tag">
                    {props.todo.title}
                </Tag>
            </div>
        </List.Item>
    );
}

export default TodoItemComponent;