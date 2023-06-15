import "./global.css";
import { Header } from "./components/Header";
import { Project } from "./components/Task";
import styles from "./App.module.css";

export function App() {
  return (
    <div>
      <Header />
      <body className={styles.grid}>
        <Project />
      </body>
    </div>
  );
}
