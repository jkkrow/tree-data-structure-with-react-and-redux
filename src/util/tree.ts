import { Node } from '../store/tree-slice';

export const findById = (root: Node, id: string) => {
  let currentNode = root;
  const queue: Node[] = [];

  queue.push(currentNode);

  while (queue.length) {
    currentNode = queue.shift()!;

    if (currentNode.id === id) {
      return currentNode;
    }

    if (currentNode.children.length) {
      currentNode.children.forEach((child) => queue.push(child));
    }
  }

  return null;
};

export const findByChildId = (root: Node, id: string) => {
  let currentNode = root;
  const queue: Node[] = [];

  queue.push(currentNode);

  while (queue.length) {
    currentNode = queue.shift()!;

    if (currentNode.children.find((item) => item?.id === id)) {
      return currentNode;
    }

    if (currentNode.children.length) {
      currentNode.children.forEach((child) => queue.push(child));
    }
  }

  return null;
};

export const mapTree = (root: Node) => {
  let currentNode = root;
  const queue: Node[] = [];
  const map: { [key: Node['id']]: Node } = {};

  queue.push(currentNode);

  while (queue.length) {
    currentNode = queue.shift()!;

    map[currentNode.id] = currentNode;

    if (currentNode.children.length) {
      currentNode.children.forEach((child) => queue.push(child));
    }
  }

  return map;
};

export const findAncestors = (root: Node, id: string) => {
  const map = mapTree(root);

  const parents: Node[] = [];
  let parentId = map[id]?.parentId;

  parents.push(map[id]);

  while (parentId) {
    parents.push(map[parentId]);
    parentId = map[parentId]?.parentId;
  }

  return parents;
};
