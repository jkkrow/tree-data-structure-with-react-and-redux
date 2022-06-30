import { useMemo } from 'react';

import Node from '../Node';
import { useAppDispatch } from '../../store';
import { Tree as TreeType, treeActions } from '../../store/tree-slice';
import { traverseNodes } from '../../util/tree';
import './index.css';

interface TreeProps {
  tree: TreeType;
}

const Tree: React.FC<TreeProps> = ({ tree }) => {
  const dispatch = useAppDispatch();

  const nodes = useMemo(() => traverseNodes(tree.root), [tree.root]);

  const changeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(treeActions.updateTree({ updates: { name: event.target.value } }));
  };

  const changeDescHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(
      treeActions.updateTree({ updates: { description: event.target.value } })
    );
  };

  const submitTreeHandler = () => {
    console.log(JSON.stringify(tree, null, 2));
    alert('Printed the tree in console');
  };

  const removeTreeHandler = () => {
    dispatch(treeActions.removeTree());
  };

  return (
    <div className="tree">
      <div className="tree-info">
        <label>
          <div>Tree Name</div>
          <input value={tree.info.name} onChange={changeNameHandler} />
        </label>
        <label>
          <div>Tree Description</div>
          <input value={tree.info.description} onChange={changeDescHandler} />
        </label>
        <label>
          <div>Node Count</div>
          <div>{nodes.length}</div>
        </label>
        <button onClick={submitTreeHandler}>Submit Tree</button>
        <button onClick={removeTreeHandler}>Remove Tree</button>
      </div>

      <Node node={tree.root} rootId={tree.root.id} />
    </div>
  );
};

export default Tree;
