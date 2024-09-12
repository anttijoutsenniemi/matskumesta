import { create } from 'zustand'
import { Product } from '../components/ProductGrid'

interface Task {
    id: number
    title: string
}

interface FilledProduct {
  title: string,
  description: string,
  amount: string,
  weight: string,
  quality: string,
}

// Define the state and actions
interface CounterState {
  //variables
  drawerOpen: boolean,
  username: string,
  isSeller: boolean,
  modalOpen: boolean,
  selectedProduct: any,
  loadingMessage: string,
  loading: boolean,
  errorMessage: string,
  filledProduct: any,
  manyFilledProducts: any,
  sellerProductImg64: string,
  // count: number
  // isLoading: boolean
  // tasks: Task[]
  // statusMessage: string

  //actions
  setDrawerOpen: (drawerState: boolean) => void,
  setUserName: (username: string) => void,
  setIsSeller: (seller: boolean) => void,
  setModalOpen: (modalState: boolean) => void,
  setSelectedProduct: (product : any) => void,
  setLoadingMessage: (loadingMsg : string) => void,
  setLoading: (loadingStatus: boolean) => void,
  setErrorMessage: (errorMsg: string) => void,
  setFilledProduct: (filledProd: any) => void,
  setManyFilledProducts: (manyFilledProd: any) => void
  setSellerProductImg64: (sellerImg64: string) => void,
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
  username: '',
  isSeller: false,
  modalOpen: false,
  selectedProduct: {
    id: 0,
    title: '',
    description: '',
    image: '',
    color: '',
    price: '',
    amount: '',
    weight: '',
    quality: '',
    location: '',
    packaging: '',
    availability: '',
  },
  loadingMessage: 'Odota hetki...',
  loading: false,
  errorMessage: '',
  filledProduct: null,
  manyFilledProducts: null,
  sellerProductImg64: '',
  // count: 0,
  // tasks: [],
  // isLoading: false,
  // statusMessage: '',

  //actions
  setDrawerOpen: (drawerState) => set(() => ({ drawerOpen : drawerState })),
  setUserName: (username) => set(() => ({ username: username })),
  setIsSeller: (seller) => set(() => ({ isSeller: seller })),
  setModalOpen: (modalState) => set(() => ({ modalOpen: modalState })),
  setSelectedProduct: (product) => set(() => ({ selectedProduct: product })),
  setLoadingMessage: (loadingMsg) => set(() => ({ loadingMessage: loadingMsg })),
  setLoading: (loadingStatus) => set(() => ({ loading: loadingStatus })),
  setErrorMessage: (errorMsg) => set(() => ({ errorMessage: errorMsg})),
  setFilledProduct: (filledProd) => set(() => ({ filledProduct: filledProd })),
  setManyFilledProducts: (manyFilledProd) => set(() =>({ manyFilledProducts: manyFilledProd })),
  setSellerProductImg64: (sellerImg64) => set(() => ({ sellerProductImg64: sellerImg64 }))
  
  // addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  // removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id),})),

  // setIsLoading: (loading) => set(() => ({ isLoading: loading })),

  // setStatusMessage: (message) => set(() => ({ statusMessage: message })),

  // increment: () => set((state) => ({ count: state.count + 1 })),

  // decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export default useStore
