import React from 'react';

import Classes from '@/components/layouts/member/classes';
import MemberWelcome from '@/components/layouts/member/member-welcome-banner';

const page = () => {
  return (
    <div>
      <MemberWelcome />
      <Classes />
    </div>
  );
};

export default page;
