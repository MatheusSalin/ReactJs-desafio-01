import { ClipboardText, Trash, PlusCircle } from "phosphor-react";
import styles from "./Task.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

interface TaskProps {
  content: string;
  deleteOnTask: (task: string) => void;
  onCompleteTask: (task: string) => void;
  isCompleted: number;
  onUncompleteTask: (task: string) => void;
}

export function Project() {
  const [tasks, setTasks] = useState<
    { content: string; isCompleted: number }[]
  >([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [completeCount, setCompletCount] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTaskText.trim() !== "") {
      setTasks([...tasks, { content: newTaskText, isCompleted: 0 }]);
      setNewTaskText("");
      setTaskCount((plusTaskCount) => plusTaskCount + 1);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function deleteTask(task: string) {
    const updatedTasks = tasks.filter((t) => t.content !== task);
    setTasks(updatedTasks);
  }

  function completeTask(task: string) {
    const updatedTasks = tasks.map((t) => {
      if (t.content === task && t.isCompleted === 0) {
        setCompletCount((completTask) => completTask + 1);
        return {
          ...t,
          isCompleted: 1,
        };
      }
      return t;
    });
    setTasks(updatedTasks);
  }

  function uncompleteTask(task: string) {
    const updatedTasks = tasks.map((t) => {
      if (t.content === task && t.isCompleted === 1) {
        setCompletCount((prevCompleteCount) => prevCompleteCount - 1);
        return {
          ...t,
          isCompleted: 0,
        };
      }
      return t;
    });
    setTasks(updatedTasks);
  }

  function Task({
    content,
    deleteOnTask,
    onCompleteTask,
    isCompleted,
    onUncompleteTask,
  }: TaskProps) {
    function handleDeleteTask() {
      deleteOnTask(content);
    }

    function handleCheckTask() {
      if (isCompleted) {
        onUncompleteTask(content);
      } else {
        onCompleteTask(content);
      }
    }

    return (
      <div className={styles.lineTask} key={content}>
        <div className={styles.content}>
          <label className={styles.checkBox}>
            <input
              type="checkbox"
              onChange={handleCheckTask}
              checked={isCompleted === 1}
            />
            <span> </span>
            <p className={isCompleted === 1 ? styles.completedTask : undefined}>
              {content}
            </p>
          </label>
        </div>
        <button
          className={styles.deleteButton}
          title="Deletar tarefa"
          onClick={handleDeleteTask}
        >
          <Trash weight="bold" size={18} color="red" />
        </button>
      </div>
    );
  }
  return (
    <div className={styles.tasks}>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          name="content"
          id="1"
          placeholder="Adicionar uma nova tarefa"
          value={newTaskText}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          <strong> Criar </strong>
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>
      <div className={styles.task}>
        <div className={styles.score}>
          <div className={styles.count}>
            <strong>Tarefas criadas </strong>
            <span> {taskCount} </span>
          </div>
          <div className={styles.countCheck}>
            <strong>Concluídas</strong>
            <span> {completeCount} </span>
          </div>
        </div>
        {tasks.length === 0 ? (
          <div className={styles.noTask}>
            <ClipboardText size={50} />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : null}
      </div>
      <div className={styles.taskBox}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.content}
              content={task.content}
              deleteOnTask={deleteTask}
              onCompleteTask={completeTask}
              isCompleted={task.isCompleted}
              onUncompleteTask={uncompleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}
