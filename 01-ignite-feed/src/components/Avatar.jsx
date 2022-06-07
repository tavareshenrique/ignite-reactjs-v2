import styles from './Avatar.module.css';

export function Avatar({ src, alt, borderless = false }) {
  return (
    <img
      className={borderless ? styles.avatar : styles.avatarWithBorder} 
      src={src}
      alt={alt}
    />
  )
}