import BeerScience from '../assets/beer_science.jpg';

const Home = () => {
  return (
    <div>
      <img
        src={BeerScience}
        alt="Beer Science"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default Home;
