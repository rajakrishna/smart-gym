"use client";

import { useEffect, useState } from "react";
import ICONS from "@/constants/icons";
import LABELS from "@/constants/labels";
import MemberDetailsCard from "./MemberDetailsCard";
import MemberInvoicesCard, { Invoice } from "./MemberInvoicesCard";
import MemberCheckinsCard, { Checkin } from "./MemberCheckInsCard";
import MemberClassHistoryCard, { ClassHistory } from "./MemberClassHistoryCard";
import {
  AccordionWrapper,
  AccordionWrapperTrigger,
  AccordionWrapperContent,
} from "./AccordionWrapper";

type ProfileResponse = {
  memberDetails: {
    first_name: string;
    last_name: string;
    email: string;
    dob?: string; 
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  memberInvoices: Invoice[];
  memberCheckins: Checkin[];
  memberClassHistory: ClassHistory[];
};

export default function MemberProfileCard() {
  const userId = "1828034c-85bb-4763-a623-e67c1bedac3d"; // swap or pass as prop

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`/api/profile/${userId}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        const json = (await res.json()) as { status: string; data?: ProfileResponse; message?: string };
        if (json.status !== "ok" || !json.data) throw new Error(json.message ?? "Unexpected response");
        if (live) setData(json.data);
      } catch (e: unknown) {
        if (live) setErr(e instanceof Error ? e.message : String(e));
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, [userId]);

  return (
    <div className="space-y-4">
      <AccordionWrapper value="details" >
        <AccordionWrapperTrigger
          icon={ICONS.memberProfile.memberDetails}
          label={LABELS.pages.member_profile.memberDetails}
          ChevronRight={ICONS.memberProfile.dropDown}
        />
        <AccordionWrapperContent>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {err && <p className="text-sm text-destructive">Error: {err}</p>}
          {!loading && !err && data && (
            <MemberDetailsCard
              details={{
                first_name: data.memberDetails.first_name,
                last_name: data.memberDetails.last_name,
                email: data.memberDetails.email,
                dob: data.memberDetails.dob ?? "",
                address: data.memberDetails.address,
                city: data.memberDetails.city,
                state: data.memberDetails.state,
                zip_code: data.memberDetails.zip_code,
              }}
            />
          )}
        </AccordionWrapperContent>
      </AccordionWrapper>

      <AccordionWrapper value="invoices">
        <AccordionWrapperTrigger
          icon={ICONS.memberProfile.memberInvoices}
          label={LABELS.pages.member_profile.memberInvoice}
          ChevronRight={ICONS.memberProfile.dropDown}
        />
        <AccordionWrapperContent>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {err && <p className="text-sm text-destructive">Error: {err}</p>}
          {!loading && !err && data && <MemberInvoicesCard invoices={data.memberInvoices} />}
        </AccordionWrapperContent>
      </AccordionWrapper>

      <AccordionWrapper value="checkins">
        <AccordionWrapperTrigger
          icon={ICONS.memberProfile.checkinHistory}
          label={LABELS.pages.member_profile.checkinHistory}
          ChevronRight={ICONS.memberProfile.dropDown}
        />
        <AccordionWrapperContent>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {err && <p className="text-sm text-destructive">Error: {err}</p>}
          {!loading && !err && data && <MemberCheckinsCard checkins={data.memberCheckins} />}
        </AccordionWrapperContent>
      </AccordionWrapper>

      <AccordionWrapper value="class_history">
        <AccordionWrapperTrigger
          icon={ICONS.memberProfile.classHistory}
          label={LABELS.pages.member_profile.classHistory}
          ChevronRight={ICONS.memberProfile.dropDown}
        />
        <AccordionWrapperContent>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {err && <p className="text-sm text-destructive">Error: {err}</p>}
          {!loading && !err && data && <MemberClassHistoryCard classes={data.memberClassHistory} />}
        </AccordionWrapperContent>
      </AccordionWrapper>
    </div>
  );
}
