import React from 'react';
import { useAppSelector } from '../../app/Hooks';
import { RootState } from '../../app/Store';
import styles from './CombatChain.module.css';
import hit from '../../img/symbols/symbol-hit.png';
import defend from '../../img/symbols/symbol-defence.png';

export default function ChainLinks() {
  const oldCombatChain = useAppSelector(
    (state: RootState) => state.game.oldCombatChain
  );
  if (oldCombatChain === undefined || oldCombatChain.length === 0) {
    return <div className={styles.chainLinksRow} />;
  }

  return (
    <div className={styles.chainLinksRow}>
      {oldCombatChain.map((ChainLink, ix) => {
        const hitPic = ChainLink.didItHit ? hit : defend;
        return (
          <div className={styles.chainLinkSummary} key={ix.toString()}>
            <div className={styles.chainLinkSymbol}>
              <img src={hitPic} className={styles.chainLinkSymbol} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
