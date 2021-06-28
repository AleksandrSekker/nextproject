import Link from 'next/link';
import React from 'react';
import { SubscribeInterface } from '../../../interfaces/index';
import { DocumentData } from '@firebase/firestore-types';
interface Props {
  subscribe: DocumentData;
}

const FriendView = ({ subscribe }: Props) => {
  return (
    <div>
      {subscribe.map(({ avatar, id }: SubscribeInterface) => (
        <div key={id} onClick={close}>
          <Link href={`/user/${id}`}>
            <img
              src={avatar}
              alt=""
              style={{
                width: '50px',
                height: '50px',
              }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FriendView;
