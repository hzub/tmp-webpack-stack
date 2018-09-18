import React from 'react';

import styles from './LogoDemo.scss';

const App = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Header} />
        <div className={styles.Logo} />
        <div className={styles.Footer}>React app boilerplate</div>
      </div>
    </div>
  );
};

export default App;
