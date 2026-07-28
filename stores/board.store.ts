import { defineStore } from 'pinia';
import type { Board, Card } from '~/types/kanban';

export const useBoardStore = defineStore('board', {
  state: () => ({
    board: null as Board | null,
  }),

  getters: {
    totalCards: (state) =>
      state.board?.lists.reduce((sum, list) => sum + list.cards.length, 0) ?? 0,
  },

  actions: {
    setBoard(board: Board) {
      this.board = board;
    },

    addCard(listId: string, text: string) {
      const list = this.board?.lists.find((l) => l.id === listId);
      if (!list) return;

      const card: Card = { id: crypto.randomUUID(), text, createdAt: Date.now() };
      list.cards.push(card);
    },

    moveCard(cardId: string, fromListId: string, toListId: string, newIndex: number) {
      const fromList = this.board?.lists.find((l) => l.id === fromListId);
      const toList = this.board?.lists.find((l) => l.id === toListId);
      if (!fromList || !toList) return;

      const cardIndex = fromList.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return;

      const [card] = fromList.cards.splice(cardIndex, 1);
      toList.cards.splice(newIndex, 0, card);
    },

    removeCard(listId: string, cardId: string) {
      const list = this.board?.lists.find((l) => l.id === listId);
      if (!list) return;
      list.cards = list.cards.filter((c) => c.id !== cardId);
    },
  },
});