import Filters from "../filters/filters";
import TodoForm from "../todoForm/todoForm";
import TodoList from "../todoList/todoList";

import './app.scss';

const App = () => {
    
    return(
        <div className="container">
            <main className="app">
                <div className="main">
                    <TodoForm />
                    <TodoList />
                </div>
                <div className="side">
                    <Filters />
                </div>
            </main>
        </div>
    )
}

export default App;



