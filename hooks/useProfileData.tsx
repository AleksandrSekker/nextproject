import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase';
import { selectChange } from '../redux/formchange/action';
import { loadtrue } from '../redux/load/action';
import { DocumentData } from '@firebase/firestore-types';
interface Props {
  userid: string;
}

const useProfileData = ({ userid }: Props) => {
  const isChange = useSelector(selectChange);
  const [profileData, setProfileData] = useState<DocumentData>([]);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const profileDataFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .get();

      setProfileData(profileDataFromFirebase.data() as DocumentData);

      dispatch(loadtrue());
    } catch (error) {
      dispatch(loadtrue());
    }
  };
  useEffect(() => {
    fetchData();
  }, [isChange, userid]);
  return { profileData };
};
export default useProfileData;
