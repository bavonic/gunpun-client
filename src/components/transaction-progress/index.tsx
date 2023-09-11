import { FC, useEffect, useState } from 'react'
import Lottie from 'lottie-react';

export interface TransactionProgressItem {
  id: any,
  methodName: string,
  step: string,
  setStep: (step: string) => any,
  finish: (error?: any) => any,
}
export let ResetTransactionProgress: () => any = () => true;

export let OnTransactionProgress: (methodName: string) => TransactionProgressItem = () => ({} as TransactionProgressItem);

export const TransactionProgress: FC = () => {
  const [progressItems, setProgressItems] = useState([] as TransactionProgressItem[]);

  const [animationData, setAnimationData] = useState(null);

  ResetTransactionProgress = () => setProgressItems([]);

  OnTransactionProgress = (methodName) => {
    const id = Date.now();
    const newItem: TransactionProgressItem = {
      id,
      methodName,
      finish: (error) => {
        setProgressItems(s => s.filter(v => v.id !== id));
        if (error) throw error;
      },
      step: 'Starting...',
      setStep: (step) => setProgressItems(s => s.map(v => v.id === id ? { ...v, step } : v)),
    }

    setProgressItems(s => [...s, newItem]);
    return newItem;
  }

  const loadAnimationData = async () => {
    try {
      const data = await fetch(`/animations/rocket.json`);
      const json = await data.json();
      setAnimationData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!animationData) loadAnimationData();
  }, [animationData])

  if (!progressItems.length) return null;

  return (
    <div className="TransactionProgress">
      <div className="list">
        {progressItems.map((item, key) => {
          return <div className="item" key={key}>
            <div className="icon">
              <Lottie
                animationData={animationData}
                autoPlay
                loop
              />
            </div>
            <div className="content">
              <div className="title fontHeadline">{item.methodName}</div>
              <div className="msg">Step: {item.step}</div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}