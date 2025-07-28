'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface Coach {
  coaches_id: string;
  full_name: string;
}

export function CreateClassForm() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [form, setForm] = useState({
    class_name: '',
    category: '',
    capacity: 0,
    scheduled_on: '',
    start: '',
    end: '',
    coaches_id: '',
  });

  useEffect(() => {
    fetch('/api/coaches/getAll')
      .then((res) => res.json())
      .then((data) => setCoaches(data));
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/classes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Class created');
    } else {
      alert(`Failed: ${data.error || 'Unknown error'}`);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Class Name</Label>
            <Input value={form.class_name} onChange={(e) => handleChange('class_name', e.target.value)} required />
          </div>

          <div>
            <Label>Coach</Label>
            <Select onValueChange={(value) => handleChange('coaches_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a coach" />
              </SelectTrigger>
              <SelectContent>
                {coaches.map((coach) => (
                  <SelectItem key={coach.coaches_id} value={coach.coaches_id}>
                    {coach.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Category</Label>
            <Select onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
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
            <Label>Capacity</Label>
            <Input type="number" value={form.capacity} onChange={(e) => handleChange('capacity', parseInt(e.target.value))} required />
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" value={form.scheduled_on} onChange={(e) => handleChange('scheduled_on', e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Time</Label>
              <Input type="time" value={form.start} onChange={(e) => handleChange('start', e.target.value)} required />
            </div>
            <div>
              <Label>End Time</Label>
              <Input type="time" value={form.end} onChange={(e) => handleChange('end', e.target.value)} required />
            </div>
          </div>

          <Button type="submit" className="w-full">Create Class</Button>
        </form>
      </CardContent>
    </Card>
  );
}
