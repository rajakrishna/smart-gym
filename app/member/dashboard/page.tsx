import CafeMenu from '@/components/layouts/member/cafe-menu';
import Classes from '@/components/layouts/member/classes';
import EnrolledClasses from '@/components/layouts/member/enrolled-classes';
import ClientCheckinNotice from './clientCheckinNotice';

const USER_ID = '1828034c-85bb-4763-a623-e67c1bedac3d';

export default function Page() {
  return (
    <div className="container mx-auto pt-4 px-4 pb-10">
      <Classes />
      <CafeMenu />
      <EnrolledClasses memberId={USER_ID} />
      <ClientCheckinNotice userId={USER_ID} />
    </div>
  );
}
