import { Tree, Node } from '../store/tree-slice';

export const findById = (tree: Tree, id: string): Node | null => {
  let currentNode: Node = tree.root;
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

export const findByChildId = (tree: Tree, id: string): Node | null => {
  let currentNode: Node = tree.root;
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

export const traverseNodes = (root: Node): Node[] => {
  let currentNode = root;
  const queue: Node[] = [];
  const nodes: Node[] = [];

  queue.push(currentNode);

  while (queue.length) {
    currentNode = queue.shift()!;

    nodes.push(currentNode);

    if (currentNode.children.length) {
      currentNode.children.forEach((child) => queue.push(child));
    }
  }

  return nodes;
};

export const mapTree = (node: Node) => {
  const map: any = {};

  const iterate = (node: Node) => {
    map[node.id] = node;

    if (node.children.length) {
      node.children.forEach(iterate);
    }
  };

  iterate(node);

  return map;
};

export const findAncestors = (tree: Tree, nodeId: string) => {
  const map = mapTree(tree.root);

  const parents: Node[] = [];
  let parentId = map[nodeId]?.parentId;

  parents.push(map[nodeId]);

  while (parentId) {
    parents.push(map[parentId]);
    parentId = map[parentId]?.parentId;
  }

  return parents;
};
