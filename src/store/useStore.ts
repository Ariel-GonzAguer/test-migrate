import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// importar y agregar tipos correspondientes
interface UserStoreState {
  count: number;
  otroEstado: string;
  objetoEstado: { clave: string; otro: number; arreglo: number[] };
  increment: () => void;
}

const useUserStore = create<UserStoreState>()(
  //cambiar nombre
  persist(
    immer((set) => ({
      // estados
      count: 0,
      otroEstado: "valorInicial",
      objetoEstado: { clave: "valor", otro: 123, arreglo: [1, 2, 3] },

      // acciones
      increment: () =>
        set((state) => {
          state.count += 1;
        }),
    })),
    {
      name: "user-storage",
      version: 1,
      partialize: (state) => ({
        count: state.count,
        otroEstado: state.otroEstado,
        objetoEstado: state.objetoEstado,
      }),
    }
  )
);

export default useUserStore;
