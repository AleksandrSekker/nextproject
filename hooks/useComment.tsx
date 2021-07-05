import { useEffect, useState } from 'react';
import { DocumentData } from '@firebase/firestore-types';
import { firestore } from '../firebase';
import { useSelector } from 'react-redux';
import { selectChange } from '../redux/formchange/action';
interface Props {
  userid: string;
  id: string;
}
const useComment = ({ userid, id }: Props) => {
  const [comments, setComments] = useState<DocumentData>([]);
  const isChange = useSelector(selectChange);
  const getComments = async () => {
    try {
      const commentsFromFirestore = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('posts')
        .doc(id)
        .collection('comments')
        .get();
      setComments(
        commentsFromFirestore.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
    return () => {
      setComments([]);
    };
  }, [isChange]);
  return { comments };
};
export default useComment;
