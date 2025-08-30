import { create } from 'zustand';
import { INITIALITEMS } from '../lib/constants';
import { persist } from 'zustand/middleware';

// when zustand creates a store it passes in a set function
// we can use to set state
// we also wrap the whole function passed to create in a persist
// function, which takes the function passed in to create as well
// as an object which has a member `name` whose value will be name of
// the key used by localstorage to persist the data
export const useItemStore = create(
  persist(
    (set) => ({
      items: INITIALITEMS,
      removeAllItems: () => {
        // the set function takes a callback with the current state
        // so you can call it as follows set((state) => {...}) if you want
        // to directly reference state, but you can omit the state argument
        // We want to update the state, in this case making items and empty array
        // but we also need to include all the actions (the functions such as this one)
        // by default set will merge any object returned by the function
        // passed to it, with the rest of the state, so just need to return
        // an object with an items member which will override items and the rest
        // of the state will get merged before set returns a new object
        set(() => ({ items: [] }));
      },
      addItem: (text) => {
        const newItem = {
          id: Date.now(),
          completed: false,
          text: text,
        };
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },
      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      toggleItem: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                completed: !item.completed,
              };
            }
            return item;
          });
          return { items: newItems };
        });
      },
      resetToInitial: () => {
        set(() => ({ items: INITIALITEMS }));
      },
      markAllAsComplete: () => {
        // here we pass in state so we can access state.items
        // then after returning a new items object, it is zustand
        // merges it with the rest of the actions as discussed above
        set((state) => {
          const newItems = state.items.map((item) => {
            return {
              ...item,
              completed: true,
            };
          });
          return { items: newItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => {
            return {
              ...item,
              completed: false,
            };
          });
          return { items: newItems };
        });
      },
    }),
    { name: 'items-storage' }
  )
);
