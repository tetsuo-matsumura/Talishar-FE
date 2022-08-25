import React from 'react';
import { Displayrow } from '../../interface/displayrow';
// http://localhost/FaBOnline/concat/WTR154.webp
export function FeetEqZone(prop: Displayrow) {
  const eqImg = 'http://localhost/FaBOnline/concat/WTR154.webp';
  return (
    <div className={'feetZone singleCardZone ' + prop.DisplayRow}>
      <img src={eqImg} />
    </div>
  );
}