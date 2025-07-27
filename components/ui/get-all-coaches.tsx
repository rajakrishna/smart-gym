'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CoachItem {
  coach_id: string;
  full_name: string;
  category: string;
  profile_picture: string;
}

export function GetAllCoaches() {
  const [coaches, setCoaches] = useState<CoachItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch("/api/coaches/getAll"); // Adjust this to match your API route
        const data = await res.json();
        setCoaches(data);
      } catch (err) {
        console.error("Error fetching coaches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) return <p>Loading coaches...</p>;

  if (coaches.length === 0) return <p>No coaches found.</p>;

  return (
    <div className="space-y-2">
      {coaches.map((coach) => (
        <Card key={coach.coach_id}>
          <CardContent className="p-4 space-y-1">
            <p className="text-sm text-muted-foreground">{coach.profile_picture}</p>
            <p className="font-medium">{coach.full_name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
