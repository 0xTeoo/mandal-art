import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { firestoreConverter } from '../utils';
import { Goal } from '../components/GoalList';

export const getGoalsByUserId = async (userId: string) => {

  const goalsRef = collection(db, `users/${userId}/goals`).withConverter(firestoreConverter<{ goals: Goal[] }>());

  try {
    const docs = await getDocs(goalsRef);
    const { goals } = docs.docs[0].data();
    return goals;
  } catch (error) {
    console.error(error)
    return []
  }
}