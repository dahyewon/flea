import { ShoppingCart } from '@mui/icons-material'
import styles from './cart.module.scss'

export default function Cart() {
  return (
    <div className={styles["cart"]}>
      <ShoppingCart className={styles["icon"]} />
    </div>
  )
}