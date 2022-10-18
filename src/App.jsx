import { gql, useQuery } from '@apollo/client';
import './App.css';
import AddTodo from './components/AddTodo';
import Loader from './components/Loader';
import TaskContainer from './components/TaskContainer';

const GET_ALL_TASKS = gql`
  query GetAllTasks {
    tasks {
      _id
      todo
      isDone
    }
  }
`


const App = () => {
  const { loading, error, data } = useQuery(GET_ALL_TASKS)



  if (loading) return <Loader
    size={50}
    weight={5}
  />;
  if (error) return `Error! ${error.message}`;
  return (
    <div className="wrapper">
      <div className="row header-row">
        <h1>ApolloTask</h1>
        <AddTodo />
      </div>
      <div className="row main-row">
        <h3 className='container__title side'>To do</h3>
        <h3 className='container__title side'>Done</h3>
      </div>
      <div className="App">
        <div className="row main-row">

          <TaskContainer
            data={data.tasks.filter(i => !i.isDone)}
            title='To do'
          />
          <TaskContainer
            data={data.tasks.filter(i => i.isDone)}
            title='Done'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
