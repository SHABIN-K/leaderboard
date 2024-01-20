import { useNavigate } from "react-router";
import { onAuthStateChanged } from "@firebase/auth";
import { ReactNode, useEffect, useState } from "react";

import { auth } from "../utils";
import { Loader } from "../components/ui";

interface ProtectedDashboardProps {
  children: ReactNode;
}

const ProtectedDashboard: React.FC<ProtectedDashboardProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        // User is not authenticated, redirect to login page
        navigate("/login");
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (!user) {
    return <Loader />;
  }

  return <div>{children}</div>;
};

export default ProtectedDashboard;
