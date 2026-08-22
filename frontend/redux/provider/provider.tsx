"use client"
import { useEffect, type ReactNode } from 'react';
import { Provider } from 'react-redux'
import { store } from "../store/store"
import { useAppDispatch } from "../hooks";
import { getCurrentUser } from "../slice/auth/authSlice";

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
      </AuthInitializer>
    </Provider>
  )
}
  