import React from 'react';
import jsonData from '../../public/resources/jsons/battleGoals.json'

const battleGoals = () => JSON.parse(JSON.stringify(jsonData));

const BattleGoalList = (props) => (
  <>
    {props.battleGoals.map(card => <BattleGoal key={card.points} {...card} />)}
  </>
);

const BattleGoal = (props) => {
  const card = props;
  console.log(card.image);

  return(
    <div className={"bgCard"}>
      <img src={card.image} alt={card.name} style={styles}/>
    </div>
  );
}

export function App() {
  return (
    <div>
      <h1>Battle Goals!?</h1>
      <BattleGoalList battleGoals={battleGoals()} />
    </div>
  );
}

const styles = {
  width: "250px",
};