import React from 'react';

import CafeMenu from '@/components/layouts/member/cafe-menu';
import Classes from '@/components/layouts/member/classes';
import EnrolledClasses from '@/components/layouts/member/enrolled-classes';

const page = () => {
  return (
    <div>
      <Classes />
      <CafeMenu />
      <EnrolledClasses memberId='37d00ea7-e391-460f-957e-5a7d3917133d'/>
    </div>
  );
};

export default page;
