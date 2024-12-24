export const showList = (todos) =>
  (`Your todo list: \n\n${todos.map(todo =>
    (todo.isCompleted ? '✅' : '❌') + ' ' + todo.title + '\n\n')
    .join(' ')}`);