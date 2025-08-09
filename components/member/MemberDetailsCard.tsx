import { MemberProfileDetails } from "@/types/shared";
import {
    Card, 
    CardContent
} from "@/components/ui/card";

type MemberDetailsProps = {
    details: MemberProfileDetails;
}

export default function MemberDetailsCard({ details }:MemberDetailsProps) {

    return (
        <Card className="shadow-sm">
            <CardContent className="space-y-1 text-sm">
                <p>
                    <strong>
                        Name: 
                    </strong>{" "}
                    { details.first_name } { details.last_name }
                </p>
                <p>
                    <strong>
                        Email: 
                    </strong>{" "}
                    { details.email }
                </p>
                <p>
                    <strong>
                        Date of Birth: 
                    </strong>{" "}
                      {details.dob
                        ? new Date(details.dob).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric"
                        })
                        : ""}
                </p>
                <p>
                    <strong>Address:</strong>{" "} 
                    <br />
                    {details.address}
                    <br />
                    {details.city}, {details.state}
                    <br />
                    {details.zip_code}
                </p>
            </CardContent>
        </Card>
    )
}