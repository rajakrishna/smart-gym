import React from 'react';

import CafeMenu from '@/components/layouts/member/cafe-menu';
import Classes from '@/components/layouts/member/classes';
import EnrolledClasses from '@/components/layouts/member/enrolled-classes';

const page = () => {
  return (
    <div>
      <Classes />
      <CafeMenu />
      <EnrolledClasses memberId='1828034c-85bb-4763-a623-e67c1bedac3d'/>
    </div>
  );
};

export default page;
