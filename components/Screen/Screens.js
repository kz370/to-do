import ToDoList from './ToDosList'

export const ToDoScreen = (pendingList, completedList, overdueList) => {
  return [
     {
      key: 1,
      name: "Pending",
      component: ToDoList,
      params: {
        title: 'Pending',
        list: pendingList,
        bgcolor:'yellow'
      }
    },
     {
      key: 2,
      name: "Completed",
      component: ToDoList,
      params: {
        title: 'Completed',
        list: completedList,
        bgcolor:'lawngreen'
      }
    },
    {
      key: 3,
      name: "Overdue",
      component: ToDoList,
      params: {
        title: 'Overdue',
        list: overdueList,
        bgcolor:'mediumvioletred'
      }
    }
  ]
}