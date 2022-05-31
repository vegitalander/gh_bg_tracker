import React, {Component, useState} from 'react';
import jsonData from '../../public/resources/jsons/battleGoals.json'

const battleGoals = () => JSON.parse(JSON.stringify(jsonData));

const rand = require('random-seed').create();

const BattleGoalList = (props) => (
  <>
    {props.battleGoals.map(card => <BattleGoal key={card.points} {...card} />)}
  </>
);

const BattleGoal = (props) => {
  const card = props;

  return(
    <div className={"bgCard"}>
      <img src={card.image} alt={card.name} style={cardStyle} />
    </div>
  );
}

class Form extends Component {
  state = {
    randomSeed: 1,
    characterNumber: '1',
    numberOfCardsPerCharacter: '2',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const allBGs = battleGoals();
    const maxBGNumber = allBGs.at(-1)["points"];
    let randomCards = []
    rand.seed(this.state.randomSeed)

    for(let i = 0; i < (6 * this.state.numberOfCardsPerCharacter); i++){
      let randomNumber = rand.intBetween(1, maxBGNumber)
      if(randomNumber === 0){
        i--
        continue;
      }

      allBGs.forEach(card => {
        if(card.points === randomNumber){
          randomCards[i] = card;
        }
      });
    }

    let cardsForEachCharacter = [];

    for(let i = 0; randomCards.length > 0; i++)
    {
      cardsForEachCharacter[i] = []
      for(let j = 0; j < this.state.numberOfCardsPerCharacter; j++){
        cardsForEachCharacter[i].push(randomCards.shift());
      }
    }

    this.props.onSubmit(cardsForEachCharacter[this.state.characterNumber - 1]);

    // return(
    //   <div>
    //     <BattleGoalList battleGoals={cardsForEachCharacter[this.state.characterNumber - 1]}/>
    //   </div>
    // );
  };

  handleTextInput = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      if(Math.abs(event.target.value) < 100000){
        this.setState({randomSeed: event.target.value})
      }
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.randomSeed}
          onChange={this.handleTextInput}
          placeholder="Seed"
          required
        />
        <button className={"submitButton"}>Draw Cards</button>
        <div className={'slider'}>
          <p>What player are you (default 1-4):</p>
          <input className={"characterNumberSlider"}
                 type={"range"} min={'1'} max={'6'} value={this.state.characterNumber}
                 onChange={event => this.setState({characterNumber: event.target.value})}/>
          <span className={"sliderValue"}>{this.state.characterNumber}</span>
        </div>
        <div className={'slider'}>
          <p>Number of Cards (default 2):</p>
          <input className={"numberOfCardsPerCharacterSlider"}
                 type={"range"} min={'1'} max={'4'} value={this.state.numberOfCardsPerCharacter}
                 onChange={event => this.setState({numberOfCardsPerCharacter: event.target.value})}/>
          <span className={"sliderValue"}>{this.state.numberOfCardsPerCharacter}</span>
        </div>
      </form>
    );
  }
}

export function App() {
  let title = 'Battle Goals\u203D';
  const [playerBattleGoals, setPlayerBattleGoals] = useState([]);
  const getBattleGoals = (goals) => {
    setPlayerBattleGoals(goals);
  };

  return (
    <div>
      <h1>{title}</h1>
      <Form playerBattleGoals={playerBattleGoals} setPlayerBattleGoals={setPlayerBattleGoals}
            onSubmit={getBattleGoals}/>
      {!!playerBattleGoals[0] &&
        <div>
          <BattleGoalList battleGoals={playerBattleGoals}/>
        </div>
      }
    </div>
  );
}

const cardStyle = {
  "width": "250px",
  "border-radius": "20px",
  "border": "solid white 5px",
};