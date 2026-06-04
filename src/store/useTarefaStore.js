import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTarefaStore = create(
    persist(
        (set, get) => ({

            usuarioLogado: false,
            nomeUsuario: '',
            usuariosCadastrados: [],

            cadastrarUsuario: (nome, email, senha) => set((state) => {
                const listaAtual = state.usuariosCadastrados || [];
                const novoUsuario = { nome, email, senha };

                return {
                    usuariosCadastrados: [...listaAtual, novoUsuario],
                    usuarioLogado: true,
                    nomeUsuario: nome
                };
            }),

            fazerLogin: (email, senha) => {
                const listaAtual = get().usuariosCadastrados || [];
                const usuarioExiste = listaAtual.find(u => u.email === email && u.senha === senha);

                if (usuarioExiste) {
                    set({ usuarioLogado: true, nomeUsuario: usuarioExiste.nome });
                    return true;
                } else {
                    return false;
                }
            },

            fazerLogout: () => set({ usuarioLogado: false, nomeUsuario: '' }),


            tarefas: [],


            adicionarTarefa: (novaTarefa) => set((state) => ({ tarefas: [novaTarefa, ...state.tarefas] })),
            atualizarTarefa: (tarefaEditada) => set((state) => ({ tarefas: state.tarefas.map(t => t.id === tarefaEditada.id ? tarefaEditada : t) })),
            deletarTarefa: (id) => set((state) => ({ tarefas: state.tarefas.filter(t => t.id !== id) })),
            alternarStatusFeita: (id) => set((state) => ({ tarefas: state.tarefas.map(t => t.id === id ? { ...t, feita: !t.feita } : t) }))
        }),
        {
            name: 'meu-app-tarefas',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);