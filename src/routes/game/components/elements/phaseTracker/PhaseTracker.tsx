import React, { useEffect, useState } from 'react';
import styles from './PhaseTracker.module.css';
import PhaseTrackerWidget from '../phaseTrackerWidget/PhaseTrackerWidget';
import { useAppSelector } from 'app/Hooks';
import { RootState } from 'app/Store';
import { shallowEqual } from 'react-redux';
import { setTokenSourceMapRange } from 'typescript';

export default function PhaseTracker() {
  const turnPhase = useAppSelector(
    (state: RootState) => state.game.turnPhase,
    shallowEqual
  );
  const [phase, setPhase] = useState('');
  const [phaseEnum, setPhaseEnum] = useState('');

  useEffect(() => {
    const newPhase = phaseTitle(turnPhase?.turnPhase);
    if (newPhase == null) {
      return;
    }
    if (turnPhase?.turnPhase != undefined) {
      setPhaseEnum(turnPhase.turnPhase);
    }
    setPhase(newPhase);
  }, [turnPhase]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.titleInterior}>{phase}</div>
      </div>
      <PhaseTrackerWidget phase={phaseEnum} />
      <div className={styles.phaseTrackerBottomContainer}>
        <div className={styles.bottomInterior}>{turnPhase?.caption}</div>
      </div>
    </div>
  );
}

function phaseTitle(turnPhase: string | undefined) {
  switch (turnPhase) {
    case 'M':
      return 'Main Phase';
    case 'B':
      return 'Defence Phase';
    case 'A':
      return 'Attack Reaction Step';
    case 'D':
      return 'Defence Reaction Step';
    case 'P':
      return 'Pitching';
    case 'ARS':
      return 'End Phase';
    case 'PDECK':
      return 'End Phase';
    default:
      return null;
  }
}
