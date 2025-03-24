
import { useAppSelector } from '../hooks/redux';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import TaskInput from '../components/tasks/TaskInput';
import TaskList from '../components/tasks/TaskList';

const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // If not authenticated, show the login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-todo-light px-4 py-12">
        <LoginForm />
      </div>
    );
  }

  // If authenticated, show the main application
  return (
    <Layout>
      <div className="space-y-6">
        <TaskInput />
        <TaskList />
      </div>
    </Layout>
  );
};

export default Index;
