import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Node as NodeType, treeActions } from '../../store/tree-slice';
import { findAncestors } from '../../util/tree';
import './index.css';

interface NodeProps {
  node: NodeType;
  rootId: string;
}

const Node: React.FC<NodeProps> = ({ node, rootId }) => {
  const dispatch = useAppDispatch();
  const { tree, activeNodeId } = useAppSelector((state) => state.tree);

  const isActive = useMemo(
    () => node.id === activeNodeId,
    [node.id, activeNodeId]
  );
  const isRoot = useMemo(() => node.id === rootId, [node.id, rootId]);
  const isAncestor = useMemo(() => {
    const ancestors = findAncestors(tree!.root, activeNodeId);
    const ids = ancestors.map((item) => item.id);

    return (id: string) => ids.includes(id);
  }, [tree, activeNodeId]);

  const changeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(
      treeActions.updateNode({
        id: node.id,
        updates: { name: event.target.value },
      })
    );
  };

  const changeDescHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(
      treeActions.updateNode({
        id: node.id,
        updates: { description: event.target.value },
      })
    );
  };

  const addChildHandler = () => {
    dispatch(treeActions.createNode({ id: node.id }));
  };

  const removeNodeHandler = () => {
    if (!node.parentId) return;
    if (node.id === activeNodeId) {
      dispatch(treeActions.setActiveNodeId({ id: node.parentId }));
    }
    dispatch(treeActions.deleteNode({ id: node.id }));
  };

  const navigateNodeHandler = () => {
    dispatch(treeActions.setActiveNodeId({ id: node.id }));
  };

  const navigateRootHandler = () => {
    dispatch(treeActions.setActiveNodeId({ id: rootId }));
  };

  const navigateParentHandler = () => {
    if (!node.parentId) return;
    dispatch(treeActions.setActiveNodeId({ id: node.parentId }));
  };

  return (
    <div className="node">
      {(isActive || node.parentId === activeNodeId) && (
        <div className="node-body" data-active={isActive}>
          <header>
            <div>{isRoot ? 'ROOT' : 'Level ' + node.level}</div>
            {!isActive && (
              <button onClick={navigateNodeHandler}>Navigate</button>
            )}
            {isActive && !isRoot && (
              <>
                <button onClick={navigateRootHandler}>Back to Root</button>
                <button onClick={navigateParentHandler}>Back to Parent</button>
              </>
            )}
          </header>

          <label>
            <div>Name</div>
            <input value={node.info.name} onChange={changeNameHandler} />
          </label>
          <label>
            <div>Description</div>
            <input value={node.info.description} onChange={changeDescHandler} />
          </label>
          <label>
            <div>Children</div>
            {node.children.length > 0 ? (
              <ul>
                {node.children.map((child) => (
                  <li key={child.id} />
                ))}
              </ul>
            ) : (
              <div>-</div>
            )}
          </label>

          <button onClick={addChildHandler}>Add Child</button>
          {!isRoot && <button onClick={removeNodeHandler}>Remove Node</button>}
        </div>
      )}

      <div className="node-children">
        {node.children.map(
          (child) =>
            (isActive || isAncestor(child.id)) && (
              <Node key={child.id} node={child} rootId={rootId} />
            )
        )}
      </div>
    </div>
  );
};

export default Node;
