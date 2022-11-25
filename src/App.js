import { useRef, useState } from 'react';
import './App.css';
import PickComponent from './components/pick/PickComponent';
import ResultComponent from './components/result/ResultComponent';
import JudgingComponent from './components/judge/JudgingComponent';
import { GameState } from './types/Statetype';
import ScoreComponent from './components/score/ScoreComponent';
import RuleComponent from './components/rule/RuleComponent';

function App() {

  const [state, setState] = useState(GameState.Game)
  const scoreRef = useRef(0)
  const itemPicked = useRef({
    playerPicked: "",
    enemyPicked: "",
    result: ""
  })

  function setItemPicked(item, turnType) {
    if (turnType === 'player') {
      itemPicked.current.playerPicked = item;
    }
    else if (turnType === 'enemy') {
      itemPicked.current.enemyPicked = item;
    }
    else if (turnType === 'result') {
      itemPicked.current.result = item
    }
  }

  function ContentSwitch() {
    switch (state) {
      case GameState.Game:
        return <PickComponent setItemPicked={setItemPicked} setState={setState} />
      case GameState.Judging:
        return <JudgingComponent renderPicked={itemPicked} setItemPicked={setItemPicked} state={state} setState={setState} />
      case GameState.Result:
        return <ResultComponent scoreRef={scoreRef} itemPicked={itemPicked} setState={setState} />
      default:
        return null
    }
  }

  let content = ContentSwitch();

  return (
    <header className="App">
      <RuleComponent />
      <ScoreComponent score={scoreRef.current} />
      <main>
        {content}
      </main>
    </header>
  );
}

export default App;
