import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// importar y agregar tipos correspondientes
interface UserStoreState {
  count: number;
  otroEstado: string;
  objetoEstado: { clave: string; otro: number; arreglo: number[] };
  arrayEstado: unknown[];
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
      arrayEstado: [6, 'seis', 666],

      // acciones
      increment: () =>
        set((state) => {
          state.count += 1;
        }),
    })),
    {
      name: "user-storage",
      version: 5,
      partialize: (state) => ({
        count: state.count,
        otroEstado: state.otroEstado,
        arrayEstado: state.arrayEstado,
      }),
      migrate: (persistedState, version) => {
        console.log(`Migrando desde version ${version}:`, persistedState);

        if (version === 0) {
          // Lógica de migración de v1 a v2
          const state = persistedState as Partial<UserStoreState>;
          return {
            count: state.count || 666,
            otroEstado: state.otroEstado || "valorMigradoV2",
            arrayEstado: state.arrayEstado || [],
          };
        }

        return persistedState as UserStoreState;
      },
    }
  )
);

export default useUserStore;
