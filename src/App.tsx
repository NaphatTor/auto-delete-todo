import {useRef, useState} from 'react';
import './App.css';

type TodoItem = {
  type: 'Fruit' | 'Vegetable';
  name: string;
};

const initialList: TodoItem[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

function App() {
  const [mainList, setMainList] = useState<TodoItem[]>(initialList);
  const [fruitList, setFruitList] = useState<TodoItem[]>([]);
  const [vegetableList, setVegetableList] = useState<TodoItem[]>([]);
  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const moveToTypeColumn = (item: TodoItem) => {
    setMainList(prev => prev.filter(i => i.name !== item.name));

    if (item.type === 'Fruit') {
      setFruitList(prev => [...prev, item]);
    } else {
      setVegetableList(prev => [...prev, item]);
    }

    timers.current[item.name] = setTimeout(() => {
      returnToMainList(item);
    }, 5000);
  };

  const returnToMainList = (item: TodoItem) => {
    clearTimeout(timers.current[item.name]);
    delete timers.current[item.name];

    if (item.type === 'Fruit') {
      setFruitList(prev => prev.filter(i => i.name !== item.name));
    } else {
      setVegetableList(prev => prev.filter(i => i.name !== item.name));
    }

    setMainList(prev => [...prev, item]);
  };

  return (
    <div className="App" style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      <div>
        <h2>Main List</h2>
        {mainList.map((item, index) => (
          <button key={index} onClick={() => moveToTypeColumn(item)} style={{ display: 'block', margin: '5px' }}>
            {item.name}
          </button>
        ))}
      </div>

      <div>
        <h2>Fruit</h2>
        {fruitList.map((item, index) => (
          <button key={index} onClick={() => returnToMainList(item)} style={{ display: 'block', margin: '5px', backgroundColor: 'lightpink' }}>
            {item.name}
          </button>
        ))}
      </div>

      <div>
        <h2>Vegetable</h2>
        {vegetableList.map((item, index) => (
          <button key={index} onClick={() => returnToMainList(item)} style={{ display: 'block', margin: '5px', backgroundColor: 'lightgreen' }}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
