import Link from 'next/link';
import React from 'react';

interface Props {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  userid: string | string[];
  subscribe: any;
}
interface Subscribe {
  avatar: string;
  id: string;
}
const Subscribers = ({ setIsModal, subscribe }: Props) => {
  console.log(subscribe);
  const close = () => {
    setIsModal(false);
  };
  return (
    <div>
      {subscribe.map(({ avatar, id }: Subscribe) => (
        <div key={id} onClick={close}>
          <Link href={`${id}`}>
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

export default Subscribers;
