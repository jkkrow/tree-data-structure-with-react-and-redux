import Tree from './components/Tree';
import { useAppDispatch, useAppSelector } from './store';
import { treeActions } from './store/tree-slice';
import './App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const tree = useAppSelector((state) => state.tree.tree);

  const createTreeHandler = () => {
    dispatch(treeActions.createTree());
  };

  return (
    <div className="App">
      {tree && <Tree tree={tree} />}
      {!tree && <button onClick={createTreeHandler}>Create Tree</button>}
    </div>
  );
};

export default App;
