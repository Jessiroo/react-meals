import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();


  useEffect(() => {
    const transformMealsData = (mealsData) => {
      const transformedMeals = [];
      
      for (const mealItem in mealsData) {
        transformedMeals.push({
          id: mealItem,
          name: mealsData[mealItem].name,
          description: mealsData[mealItem].description,
          price: mealsData[mealItem].price,
        });
      };
    
      setMeals(transformedMeals);
    };

    sendRequest({ 
      url: 'https://react-http-cff85-default-rtdb.firebaseio.com/meals.json', 
    },
      transformMealsData
    );
  }, [sendRequest]);


  let content = <p>No meals found.</p>;

  if (meals.length > 0) {
    content = meals.map((meal) => (
      <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
    ));
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }


  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
