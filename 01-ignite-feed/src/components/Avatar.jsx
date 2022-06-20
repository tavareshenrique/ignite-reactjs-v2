import PropTypes from 'prop-types';
import styles from './Avatar.module.css';

export function Avatar({ src, alt, borderless = false }) {
  return (
    <img
      className={borderless ? styles.avatar : styles.avatarWithBorder}
      src={src}
      alt={alt}
    />
  );
}

Avatar.defaultProps = {
  borderless: false,
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  borderless: PropTypes.bool,
};
