import { useState, useEffect } from "react"

import "../styles/tasklist.scss"

import { FiTrash, FiCheckSquare } from "react-icons/fi"

interface Task {
  id: number
  title: string
  isComplete: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks")!)
      setTasks(storedList)
    }
  }, [])

  function handleCreateNewTask() {
    if (newTaskTitle.trim() == "") {
      setNewTaskTitle("")
      alert("INVALID TASK")
      return
    } else {
      const newTask = {
        id: Number(
          Math.round(Math.random() * (9999999999 - 1000000000) + 1000000000)
        ),
        title: newTaskTitle,
        isComplete: false,
      }
      // localStorage.setItem(newTask.id.toString(), newTaskTitle)
      setTasks([...tasks, newTask])
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]))
      setNewTaskTitle("")
    }
  }

  const handleToggleTaskCompletion = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete,
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const removeTask = tasks.filter((task) => {
      return task.id !== id
    })
    setTasks(removeTask)
    localStorage.setItem("localTasks", JSON.stringify(removeTask))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
