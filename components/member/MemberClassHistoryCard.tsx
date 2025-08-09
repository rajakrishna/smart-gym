import { Card, CardContent } from "@/components/ui/card";

export type ClassHistory = {
  class_name: string;
  category: string;
  scheduled_on: string;
};

export default function MemberClassHistoryCard({ classes }: { classes: ClassHistory[] }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-3">
        {classes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No class history.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="py-2">Class</th>
                <th className="py-2">Category</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, i) => (
                <tr key={`${c.class_name}-${i}`} className="border-b last:border-0">
                  <td className="py-2">{c.class_name}</td>
                  <td className="py-2">{c.category}</td>
                  <td className="py-2">{c.scheduled_on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
