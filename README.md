# react-redux-study
 
 <br/><br/>

## 리덕스?
애플리케이션에서 복잡한 상태 관리 작업을 단순화하고 중앙 집중식 상태 관리를 가능하게 하는 도구로, 상태 관리가 중요한 대규모 애플리케이션을 개발할 때 특히 유용하다.<br/>
컴포넌트를 블루투스나 와이파이처럼 무선으로 연결하는 개념으로 이해할 수 있다.

<br/>

## 리덕스의 필요성
`props`라는 유선으로 컴포넌트를 연결한 것은 좋지만, 컴포넌트의 개수가 많아지고 컴포넌트의 중첩이 깊어질수록 데이터를 전달하는 것이 복잡해질 수 있다. 이러한 문제를 해결하기 위해 `Redux`를 사용한다. 

`Redux`는 중앙 집중식 상태 관리 라이브러리로, 컴포넌트의 개수나 중첩 정도에 상관 없이 데이터를 효율적으로 관리할 수 있도록 도와준다. 또한, `Redux`를 사용하면 상태 업데이트에 관한 로직을 컴포넌트에서 분리할 수 있으므로 유지보수성을 향상시킬 수 있다.

<br/>

## react-redux?
`react-redux`는 상태관리 도구 `Redux`를 `Redux`에서 더욱 편하게 사용할 수 있도록 돕는 라이브러리이다.

### 설치
리덕스를 적용하기 위해 `react-redux` 라이브러리를 설치한다
```bash
$ yarn add react-redux
```

### reducer 만들기
`Redux`에서 관리하는 상태는 하나의 객체로 표현된다. 이 상태 트리는 여러 개의 리듀서 함수를 결합하여 생성된다. 리듀서는 변화를 일으키는 함수로, 두 개의 파라미터를 받는다. 하나는 `현재 상태`이고, 다른 하나는 `액션`이다. 이 두 값을 기반으로하여 새로운 상태를 생성하고 반환하는 역할을 한다.

```javascript
function reducer(currentState, action) {
    // 상태 업데이틀 로직 작성
    if(currentState === undefined) return { number: 1 }; // set init state

    const newState = { ...currentState }; // 불변성 유지
    
    if(action.type === 'PLUS') newState.number++;

    return newState;
}
```

### store 생성
`Redux`를 사용하기 위해 리듀서를 등록하여 스토어를 생성한다.<br/>
`Provider` 컴포넌트를 사용하여 리액트 프로젝트에 리덕스를 적용한다. 반드시 `store`를 `props`로 전달한다.
```jsx
import { CretaeStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer);

export default function Home() {
  return (
    <>
      <div>
        // Provider는 하위 컴포넌트에 store를 전달하기 위해 사용한다(울타리 지정)
        <Provider store={store}>
          <Left1/>
          <Right1/>
        </Provider>
      </div>
    </>
  )
}
```

### useSelector로 상태 조회하기
`useSelector`는 `Redux`의 상태를 조회하는 Hook이다. `useSelector`를 사용할 때는 꼭 컴포넌트 함수 내부에서 사용해야 한다
```jsx
import { useSelector } from 'react-redux';

function ChildLeft() {
  // state를 사용하는 컴포넌트만 리렌더링 된다(성능 이점)
  console.log('3');
  const number = useSelector(state => state.number);

  return (
    <div>
      <h1>ChildLeft : {number}</h1>
    </div>
  );
}
```

### useDispatch를 사용하여 액션 디스패치하기
`useDispatch`는 `Redux` 스토어의 `dispatch`를 함수에서 사용할 수 있게 해주는 Hook이다
```javascript
import { useDispatch } from 'react-redux';

function ChildRight() {
  const dispatch = useDispatch();

  return (
    <div>
      <input type='button' value='+' onClick={() => {
        dispatch({type: 'PLUS'}); // action 전달
      }}></input>
    </div>
  );
}
```