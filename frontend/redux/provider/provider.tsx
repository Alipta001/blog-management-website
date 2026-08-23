"use client"
import { useEffect, type ReactNode } from 'react';
import { Provider } from 'react-redux'
import { store } from "../store/store"
import { useAppDispatch } from "../hooks";
import { getCurrentUser } from "../slice/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children: ReactNode;
}

function AuthInitializer({ children }: ProvidersProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return children;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
        <ToastContainer position="top-right" autoClose={4000} />
      </AuthInitializer>
    </Provider>
  )
}
  