// Example in pages/login.tsx
import LoginForm from "./components/Auth/LoginForm";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
