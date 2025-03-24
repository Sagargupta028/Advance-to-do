
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, clearError } from '../../store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4">
      <div className="mb-8 text-center animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-todo-dark">TaskFlow</h1>
        <p className="text-muted-foreground">Sign in to manage your tasks</p>
      </div>
      
      <Card className="w-full glass-card animate-scale-in">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your tasks
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                required
                className="input-field"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  handleInputChange();
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="input-field"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleInputChange();
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Hint: Try "user" / "password" or "admin" / "admin123"
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-todo-blue hover:bg-blue-600 button-animation"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
