import { useMemo } from 'react';

import Node from '../Node';
import { useAppDispatch } from '../../store';
import { Tree as TreeType, treeActions } from '../../store/tree-slice';
import { mapTree } from '../../util/tree';
import './index.css';

interface TreeProps {
  tree: TreeType;
}

const Tree: React.FC<TreeProps> = ({ tree }) => {
  const dispatch = useAppDispatch();

  const nodeCount = useMemo(() => {
    const map = mapTree(tree.root);
    return Object.keys(map).length;
  }, [tree.root]);

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
    dispatch(treeActions.deleteTree());
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
          <div>{nodeCount}</div>
        </label>
        <button onClick={submitTreeHandler}>Submit Tree</button>
        <button onClick={removeTreeHandler}>Remove Tree</button>
      </div>

      <Node node={tree.root} rootId={tree.root.id} />
    </div>
  );
};

export default Tree;
