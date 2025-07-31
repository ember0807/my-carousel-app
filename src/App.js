import React from 'react';
import InfiniteCarousel from './InfiniteCarousel'; // Импортируем нашу карусель
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Моя Бесконечная React Карусель</h1>
      </header>
      <main>
        <InfiniteCarousel>
          <div><p>Контент Слайда 1</p></div>
          <div><p>Контент Слайда 2</p></div>
          <div><p>Контент Слайда 3</p></div>
          <div><p>Контент Слайда 4</p></div>
        </InfiniteCarousel>
      </main>
      <style jsx="true">{`
        .App {
          text-align: center;
          font-family: 'Arial', sans-serif;
          padding: 20px;
        }

        .App-header {
          margin-bottom: 5px;
          padding: 10px 0;
          font-size: 1,2em;
          background-color: #661ec46b;
          border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}

export default App;