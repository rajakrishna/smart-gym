import { Card, CardContent } from "@/components/ui/card";

export type Invoice = {
  invoice_id: string;
  invoice_amount: string; // keep string if server already formats
};

export default function MemberInvoicesCard({ invoices }: { invoices: Invoice[] }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-3">
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invoices available.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="py-2">Invoice #</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.invoice_id} className="border-b last:border-0">
                  <td className="py-2">{inv.invoice_id}</td>
                  <td className="py-2">{inv.invoice_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
