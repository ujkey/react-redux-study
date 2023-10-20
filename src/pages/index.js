import { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

// reducer
function reducer(currentState, action) {
  if(currentState === undefined)  {
    // set init state
    return { number: 1 }; 
  }
  const newState = { ...currentState }; // 불변성 유지
  
  if(action.type === 'PLUS') {
    newState.number++;
  }

  return newState;
}

// Create a store
const store = createStore(reducer);

export default function Home() {
  // const [number, setNumber] = useState(1);

  return (
    <div id='container'>
      <h1>Root</h1>
      <div id='grid'>
        {/* Provider: Provider는 하위 컴포넌트에 store를 전달하기 위해 사용한다 */}
        <Provider store={store}>
          <Left1/>
          <Right1/>
        </Provider>
      </div>
    </div>
  )
}
function Left1(props) {
  return (
    <div>
      <h1>Left1 </h1>
      <Left2></Left2>
    </div>
  );
}
function Left2(props) {
  console.log('2');
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  );
}
function Left3() {
  // state를 사용하는 컴포넌트만 리렌더링 된다(성능 이점)
  console.log('3');
  
  // useSelector: useSelector는 store의 state를 조회하기 위해 사용한다
  const number = useSelector(state => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3(props) {
  // useDispatch: useDispatch는 store의 dispatch를 조회하기 위해 사용한다
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Right3</h1>
      <input type='button' value='+' onClick={() => {
        dispatch({type: 'PLUS'}); // action 전달
      }}></input>
    </div>
  );
}
