import styles from './Avatar.module.css';

interface IAvatarProps {
  src: string;
  alt: string;
  borderless?: boolean;
}

export function Avatar({ src, alt, borderless = false }: IAvatarProps) {
  return (
    <img
      className={borderless ? styles.avatar : styles.avatarWithBorder}
      src={src}
      alt={alt}
    />
  );
}
