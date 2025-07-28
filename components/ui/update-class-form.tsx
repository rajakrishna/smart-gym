'use client';

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface Coach {
  coaches_id: string;
  full_name: string;
}

interface ClassData {
  class_id: string;
  class_name: string;
  category: string;
  capacity: number;
  scheduled_on: string;
  start: string;
  end: string;
  coaches_id: string;
}

type UpdateClassFormProps = {
  classId?: string;
};

export function UpdateClassForm({ classId }: UpdateClassFormProps) {
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    fetch(`/api/classes/${classId}`)
      .then(res => res.json())
      .then(data => setClassData(data));

    fetch(`/api/coaches/getAll`)
      .then(res => res.json())
      .then(data => setCoaches(data));
  }, [classId]);

  const handleChange = (field: keyof ClassData, value: string | number) => {
    setClassData(prev => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting to PATCH with:", classData);
    e.preventDefault();

    const res = await fetch(`/api/classes/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classData),
    });

    if (res.ok) {
      alert('Class updated successfully');
    } else {
      alert('Failed to update class');
    }
  };

  if (!classData) return <div>Loading...</div>;

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <h2 className="text-2xl font-semibold mb-2">Add Class</h2> */}

          <div>
            <Label htmlFor="class_name">Class Name</Label>
            <Input
              id="class_name"
              value={classData.class_name}
              onChange={e => handleChange('class_name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="coach">Coach</Label>
            <Select
              value={classData.coaches_id}
              onValueChange={value => handleChange('coaches_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a coach" />
              </SelectTrigger>
              <SelectContent>
                {coaches.map(coach => (
                  <SelectItem key={coach.coaches_id} value={coach.coaches_id}>
                    {coach.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={classData.category}
              onValueChange={value => handleChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Cycling">Cycling</SelectItem>
                <SelectItem value="Boxing">Boxing</SelectItem>
                <SelectItem value="HIIT">HIIT</SelectItem>
                <SelectItem value="Zumba">Zumba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={classData.capacity}
              onChange={e => handleChange('capacity', parseInt(e.target.value))}
              required
            />
          </div>

          <div>
            <Label htmlFor="scheduled_on">Scheduled Date</Label>
            <Input
              id="scheduled_on"
              type="date"
              value={classData.scheduled_on}
              onChange={e => handleChange('scheduled_on', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="time"
                value={classData.start}
                onChange={e => handleChange('start', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="time"
                value={classData.end}
                onChange={e => handleChange('end', e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            Submit Class Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
