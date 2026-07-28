export interface Card {
  id: string;
  text: string;
  createdAt: number;
}

export interface KanbanList {
  id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  name: string;
  lists: KanbanList[];
}