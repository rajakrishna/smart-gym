import { Card, CardContent } from "@/components/ui/card";

export type Checkin = {
  check_in_time: string; // could be ISO datetime
};

export default function MemberCheckinsCard({ checkins }: { checkins: Checkin[] }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        {checkins.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent check-ins.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {checkins.map((c, i) => {
              // Just keep the date portion (YYYY-MM-DD)
              const dateOnly = c.check_in_time.split("T")[0];
              return (
                <li key={i} className="flex items-center justify-between border-b last:border-0 py-2">
                  <span>Checked in on</span>
                  <span className="text-muted-foreground">{dateOnly}</span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
