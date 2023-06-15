import styles from './Header.module.css'
import logoTodo from '../assets/logo-todo.svg.svg'

console.log(logoTodo)
export function Header() {
    return (
        <header className={styles.header}>
            <img src= {logoTodo} alt="logo-tipo" />
        </header>
    )
}
