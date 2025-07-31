import React, { useState, useEffect } from 'react';
import './InfiniteCarousel.css';

const InfiniteCarousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Начинаем с 1, чтобы обернуть первый слайд
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Добавляем "клоны" первого и последнего слайдов для бесшовного перехода
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]];

  const handlePrev = () => {
    if (currentIndex === 0) {
      // Если мы на "клоне" последнего слайда, отключаем переход и прыгаем на реальный последний слайд
      setTransitionEnabled(false);
      setCurrentIndex(totalSlides);
      // После короткой задержки включаем переход обратно
      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentIndex(prev => prev - 1);
      }, 0);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === totalSlides + 1) {
      // Если мы на "клоне" первого слайда, отключаем переход и прыгаем на реальный первый слайд
      setTransitionEnabled(false);
      setCurrentIndex(1);
      // После короткой задержки включаем переход обратно
      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentIndex(prev => prev + 1);
      }, 0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Этот useEffect срабатывает, когда мы переключаемся с "клона" на реальный слайд
  useEffect(() => {
    if (transitionEnabled === false) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50); // Небольшая задержка, чтобы браузер успел обновить DOM
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            {slide}
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={handlePrev}>
        ‹
      </button>
      <button className="carousel-button next" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default InfiniteCarousel;