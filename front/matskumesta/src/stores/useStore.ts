import { create } from 'zustand'

// Define the state and actions
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}

// Create the store
const useStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export default useStore
