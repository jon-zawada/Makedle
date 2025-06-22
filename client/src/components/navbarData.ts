import { Home, Gamepad2, Pencil, TestTube } from "lucide-react";

export const navbarData = [
  {
    id: 1,
    route: '/',
    title: 'Home',
    icon: Home
  },
  {
    id: 2,
    route: '/games',
    title: 'Games',
    icon: Gamepad2
  },
  {
    id: 3,
    route: '/create',
    title: 'Create',
    icon: Pencil
  },
  {
    id: 4,
    route: "test",
    title: "Test",
    icon: TestTube
    // REMOVE ME
  }

]