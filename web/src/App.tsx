import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// Auth Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import PartnerSignUp from './pages/auth/PartnerSignUp';
import FindAccount from './pages/auth/FindAccount';

// Customer Pages
import CustomerMain from './pages/customer/Main';
import CustomerPick from './pages/customer/Pick';
import CustomerSchedule from './pages/customer/Schedule';
import CustomerMyPage from './pages/customer/MyPage';

// Constructor Pages
import ConstructorMain from './pages/constructor/Main';
import ConstructorSchedule from './pages/constructor/Schedule';
import ConstructorMyPage from './pages/constructor/MyPage';

// Heavy Pages
import HeavyMain from './pages/heavy/Main';
import HeavySchedule from './pages/heavy/Schedule';
import HeavyToolRent from './pages/heavy/ToolRent';
import HeavyMyPage from './pages/heavy/MyPage';

// Common Pages
import ChatList from './pages/common/ChatList';
import ChatRoom from './pages/common/ChatRoom';
import Notice from './pages/common/Notice';
import QnA from './pages/common/QnA';
import Notifications from './pages/common/Notifications';

// Layouts
import TopNavLayout from './components/layout/TopNavLayout';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedTypes }: { children?: React.ReactNode, allowedTypes?: string[] }) => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  if (!auth) return <Navigate to="/" replace />;
  if (allowedTypes && !allowedTypes.includes(auth.type)) return <Navigate to="/" replace />;

  return (
    <TopNavLayout>
      {children ? children : <Outlet />}
    </TopNavLayout>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth - No Layout */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/partner" element={<PartnerSignUp />} />
      <Route path="/find-account" element={<FindAccount />} />

      {/* Customer */}
      <Route element={<ProtectedRoute allowedTypes={['customer']} />}>
        <Route path="/customer/main" element={<CustomerMain />} />
        <Route path="/customer/pick" element={<CustomerPick />} />
        <Route path="/customer/schedule" element={<CustomerSchedule />} />
        <Route path="/customer/chat" element={<ChatList />} />
        <Route path="/customer/chat/:roomId" element={<ChatRoom />} />
        <Route path="/customer/mypage" element={<CustomerMyPage />} />
        <Route path="/customer/notice" element={<Notice />} />
        <Route path="/customer/qna" element={<QnA />} />
        <Route path="/customer/notifications" element={<Notifications />} />
      </Route>

      {/* Constructor */}
      <Route element={<ProtectedRoute allowedTypes={['constructor']} />}>
        <Route path="/constructor/main" element={<ConstructorMain />} />
        <Route path="/constructor/schedule" element={<ConstructorSchedule />} />
        <Route path="/constructor/chat" element={<ChatList />} />
        <Route path="/constructor/chat/:roomId" element={<ChatRoom />} />
        <Route path="/constructor/mypage" element={<ConstructorMyPage />} />
        <Route path="/constructor/notice" element={<Notice />} />
        <Route path="/constructor/qna" element={<QnA />} />
        <Route path="/constructor/notifications" element={<Notifications />} />
      </Route>

      {/* Heavy */}
      <Route element={<ProtectedRoute allowedTypes={['heavy']} />}>
        <Route path="/heavy/main" element={<HeavyMain />} />
        <Route path="/heavy/schedule" element={<HeavySchedule />} />
        <Route path="/heavy/tool-rent" element={<HeavyToolRent />} />
        <Route path="/heavy/chat" element={<ChatList />} />
        <Route path="/heavy/chat/:roomId" element={<ChatRoom />} />
        <Route path="/heavy/mypage" element={<HeavyMyPage />} />
        <Route path="/heavy/notice" element={<Notice />} />
        <Route path="/heavy/qna" element={<QnA />} />
        <Route path="/heavy/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
