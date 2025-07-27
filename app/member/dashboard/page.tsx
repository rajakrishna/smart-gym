import React from 'react';

import CafeMenu from '@/components/layouts/member/cafe-menu';
import Classes from '@/components/layouts/member/classes';
import MemberSchedule from '@/components/layouts/member/dash-schedule';

const page = () => {
  return (
    <div>
      <Classes />
      <CafeMenu />
      <MemberSchedule />
    </div>
  );
};

export default page;
