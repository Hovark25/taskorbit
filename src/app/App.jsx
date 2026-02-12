import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "./AppLayout.jsx";
import DashboardPage from "../pages/DashboardPage/DashboardPage.jsx";
import TasksPage from "../pages/TasksPage/TasksPage.jsx";
import TaskDetailsPage from "../pages/TaskDetailsPage/TaskDetailsPage.jsx";
import SettingsPage from "../pages/SettingsPage/SettingsPage.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AppLayout>
  );
}
