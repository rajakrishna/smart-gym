'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

interface ClassItem {
  class_id: string;
  class_name: string;
  category: string;
  capacity: number;
  scheduled_on: string;
  start: string;
  end: string;
}

export function GetAllClasses() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes/getAll"); // Adjust this to match your API route
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <p>Loading classes...</p>;

  if (classes.length === 0) return <p>No classes found.</p>;

  return (
    <div className="space-y-2">
      {classes.map((cls) => (
        <Card key={cls.class_id}>
          <CardContent className="p-4 space-y-1">
            <p className="font-medium">{cls.class_name}</p>
            <p className="text-sm text-muted-foreground">{cls.category}</p>
            <p className="text-sm">Capacity: {cls.capacity}</p>
            <p className="text-sm">Scheduled On: {cls.scheduled_on}</p>
            <p className="text-sm">Start: {cls.start}</p>
            <p className="text-sm">End: {cls.end}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
