import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { findById, findByChildId } from '../util/tree';

export interface Tree {
  root: Node;
  info: { name: string; description: string };
}

export interface Node {
  id: string;
  parentId: string | null;
  level: number;
  info: { name: string; description: string };
  children: Node[];
}

interface InitialStateProps {
  tree: Tree | null;
  activeNodeId: string;
}

const initialState: InitialStateProps = {
  tree: null,
  activeNodeId: '',
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    createTree: (state) => {
      const root: Node = {
        id: uuidv4(),
        parentId: null,
        level: 0,
        info: { name: '', description: '' },
        children: [],
      };
      const tree: Tree = {
        root,
        info: { name: '', description: '' },
      };

      state.tree = tree;
      state.activeNodeId = root.id;
    },

    createNode: (state, { payload }: PayloadAction<{ id: string }>) => {
      if (!state.tree) return;
      const node = findById(state.tree, payload.id);

      if (!node) return;

      const child: Node = {
        id: uuidv4(),
        parentId: node.id,
        level: node.level + 1,
        info: { name: '', description: '' },
        children: [],
      };

      node.children.push(child);
    },

    updateNode: (
      state,
      { payload }: PayloadAction<{ id: string; updates: Partial<Node['info']> }>
    ) => {
      if (!state.tree) return;
      const node = findById(state.tree, payload.id);

      if (!node) return;

      node.info = { ...node.info, ...payload.updates };
    },

    updateTree: (
      state,
      { payload }: PayloadAction<{ updates: Partial<Tree['info']> }>
    ) => {
      if (!state.tree) return;

      state.tree.info = { ...state.tree.info, ...payload.updates };
    },

    removeNode: (state, { payload }: PayloadAction<{ id: string }>) => {
      if (!state.tree) return;
      const node = findByChildId(state.tree, payload.id);

      if (!node) return;

      node.children = node.children.filter((item) => item.id !== payload.id);
    },

    removeTree: (state) => {
      state.tree = null;
    },

    setActiveNodeId: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.activeNodeId = payload.id;
    },
  },
});

export const treeActions = treeSlice.actions;

export default treeSlice.reducer;
