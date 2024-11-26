import PropTypes from 'prop-types';  // For type checking of props

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          CarePlus Medical Institute is a state-of-the-art facility dedicated
          to providing comprehensive healthcare services with compassion and
          expertise. Our team of skilled professionals is committed to
          delivering personalized care tailored to each  needs. At
          CarePlus, we prioritize your well-being, ensuring a harmonious
          journey towards optimal health and wellness.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

// PropTypes for validation
Hero.propTypes = {
  title: PropTypes.string.isRequired,  // Title must be a string
  imageUrl: PropTypes.string.isRequired,  // imageUrl must be a string (URL)
};

export default Hero;
