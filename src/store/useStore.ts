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
      version: 2,
      partialize: (state) => ({
        count: state.count,
      }),
      migrate: (persistedState, version) => {
        console.log(`Migrando desde version ${version}:`, persistedState);

        if (version === 0) {
          // Lógica de migración de v1 a v2
          const state = persistedState as { count?: number };
          return {
            count: state.count || 0,
          };
        }

        return persistedState as UserStoreState;
      },
    }
  )
);

export default useUserStore;
