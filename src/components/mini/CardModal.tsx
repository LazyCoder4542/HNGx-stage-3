import React from "react";
import { SortableKnob } from "react-easy-sort";
import styles from "./CardModal.module.css"
import { DataI } from "../../pages/Home";

import { ReactComponent as DragIcon } from "../../assets/icons/drag.svg";

const CardModal = React.forwardRef<HTMLDivElement, {data: DataI, [key: string]: any}>((props: {data: DataI, [key: string]: any}, ref: any) => {  
  return (
    <div className={styles.card_modal} ref={ref}>
      <div className={styles.image} ref={ref}>
      <img src={`/assets/images/${props.data.img[0].src}`} alt="" />
      </div>
      <SortableKnob>
        <div className={styles.drag_icon}>
          <span className="svg-wrapper">
            <DragIcon />
          </span>
        </div>
      </SortableKnob>
      <h2>{props.data.name}</h2>
    </div>
  );
})

export default CardModal;