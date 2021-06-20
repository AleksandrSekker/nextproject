import Link from 'next/link';
import React from 'react';

interface Props {
  subscribe: any;
}
interface Subscribe {
  avatar: string;
  id: string;
}
const FriendView = ({ subscribe }: Props) => {
  return (
    <div>
      {subscribe.map(({ avatar, id }: Subscribe) => (
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
