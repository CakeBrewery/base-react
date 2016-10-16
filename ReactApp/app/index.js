import React from 'react'
import ReactDOM from 'react-dom'

import styles from "./main.css"


class App extends React.Component {
   
   render() {
      console.log(styles);
      return ( 
         <div className={styles.test}>
            <h1>Everything works! </h1>
         </div>
      );
   }
}


ReactDOM.render(<App/>, document.getElementById('app'));
