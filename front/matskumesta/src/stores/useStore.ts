import { create } from 'zustand'

interface Task {
    id: number
    title: string
}

// Define the state and actions
interface CounterState {
  //variables
  drawerOpen: boolean,
  // count: number
  // isLoading: boolean
  // tasks: Task[]
  // statusMessage: string

  //actions
  setDrawerOpen: (drawerState: boolean) => void,
  // increment: () => void
  // decrement: () => void
  // addTask: (task: Task) => void
  // removeTask: (id: number) => void
  // setIsLoading: (loading: boolean) => void
  // setStatusMessage: (message: string) => void
}

// Create the store
const useStore = create<CounterState>((set) => ({
  //variables
  drawerOpen: false,
  // count: 0,
  // tasks: [],
  // isLoading: false,
  // statusMessage: '',

  //actions
  setDrawerOpen: (drawerState) => set(() => ({ drawerOpen : drawerState })),
  // addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  // removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id),})),

  // setIsLoading: (loading) => set(() => ({ isLoading: loading })),

  // setStatusMessage: (message) => set(() => ({ statusMessage: message })),

  // increment: () => set((state) => ({ count: state.count + 1 })),

  // decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export default useStore
