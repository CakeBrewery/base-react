import React from 'react'
import ReactDOM from 'react-dom'

// Import CSS module
import styles from "./main.css"


// React Application 
class App extends React.Component {
   render() {
      return ( 
         <div className={styles.test}>
            <h1>Everything works! </h1>
         </div>
      );
   }
}


// Mount application on <div id=app> tag
ReactDOM.render(<App/>, document.getElementById('app'));

