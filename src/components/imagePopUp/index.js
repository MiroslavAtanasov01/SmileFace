import React, { useState } from "react"
import styles from './index.module.css'

const ImagePopUp = ({ image }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShowDialog = () => {
        if (isOpen === false) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    return (
        <div>
            <img className={styles['post-image']} src={image} onClick={handleShowDialog} alt="no images" />
            {isOpen && (
                <div className={styles.dialog} style={{ position: "absolute" }} open onClick={handleShowDialog}>
                    <img className={styles.image} src={image} onClick={handleShowDialog} alt="no images" />
                </div>
            )}
        </div>
    )
}

export default ImagePopUp