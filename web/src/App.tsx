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
import CustomerLayout from './components/layout/CustomerLayout';
import ConstructorLayout from './components/layout/ConstructorLayout';
import HeavyLayout from './components/layout/HeavyLayout';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedTypes }: { children?: React.ReactNode, allowedTypes?: string[] }) => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>로딩 중...</div>;
  if (!auth) return <Navigate to="/" replace />;
  if (allowedTypes && !allowedTypes.includes(auth.type)) return <Navigate to="/" replace />;

  return children ? <>{children}</> : <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/partner" element={<PartnerSignUp />} />
      <Route path="/find-account" element={<FindAccount />} />

      {/* Customer */}
      <Route element={<ProtectedRoute allowedTypes={['customer']} />}>
        <Route path="/customer/main" element={<CustomerMain />} />
        <Route path="/customer/pick" element={<CustomerPick />} />
        <Route path="/customer/schedule" element={<CustomerSchedule />} />
        <Route path="/customer/chat" element={<CustomerLayout><ChatList /></CustomerLayout>} />
        <Route path="/customer/chat/:roomId" element={<CustomerLayout><ChatRoom /></CustomerLayout>} />
        <Route path="/customer/mypage" element={<CustomerMyPage />} />
        <Route path="/customer/notice" element={<CustomerLayout><Notice /></CustomerLayout>} />
        <Route path="/customer/qna" element={<CustomerLayout><QnA /></CustomerLayout>} />
        <Route path="/customer/notifications" element={<CustomerLayout><Notifications /></CustomerLayout>} />
      </Route>

      {/* Constructor */}
      <Route element={<ProtectedRoute allowedTypes={['constructor']} />}>
        <Route path="/constructor/main" element={<ConstructorMain />} />
        <Route path="/constructor/schedule" element={<ConstructorSchedule />} />
        <Route path="/constructor/chat" element={<ConstructorLayout><ChatList /></ConstructorLayout>} />
        <Route path="/constructor/chat/:roomId" element={<ConstructorLayout><ChatRoom /></ConstructorLayout>} />
        <Route path="/constructor/mypage" element={<ConstructorMyPage />} />
        <Route path="/constructor/notice" element={<ConstructorLayout><Notice /></ConstructorLayout>} />
        <Route path="/constructor/qna" element={<ConstructorLayout><QnA /></ConstructorLayout>} />
        <Route path="/constructor/notifications" element={<ConstructorLayout><Notifications /></ConstructorLayout>} />
      </Route>

      {/* Heavy */}
      <Route element={<ProtectedRoute allowedTypes={['heavy']} />}>
        <Route path="/heavy/main" element={<HeavyMain />} />
        <Route path="/heavy/schedule" element={<HeavySchedule />} />
        <Route path="/heavy/tool-rent" element={<HeavyToolRent />} />
        <Route path="/heavy/chat" element={<HeavyLayout><ChatList /></HeavyLayout>} />
        <Route path="/heavy/chat/:roomId" element={<HeavyLayout><ChatRoom /></HeavyLayout>} />
        <Route path="/heavy/mypage" element={<HeavyMyPage />} />
        <Route path="/heavy/notice" element={<HeavyLayout><Notice /></HeavyLayout>} />
        <Route path="/heavy/qna" element={<HeavyLayout><QnA /></HeavyLayout>} />
        <Route path="/heavy/notifications" element={<HeavyLayout><Notifications /></HeavyLayout>} />
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
