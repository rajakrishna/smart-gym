'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
// import useSessionStorageState from '@/hooks/use-session-storage';
import { ApiResponse, ExampleData } from '@/types/shared';

export default function ExamplePage() {
  const [examples, setExamples] = useState<ExampleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Use this hook for session storage or you can use install some library
  // const [todos, setTodos] = useSessionStorageState('todos', {
  //   defaultValue: ['buy avocado'],
  // });

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/example');
        // Sharing the ExampleData type in client and server
        const data: ApiResponse<ExampleData[]> = await response.json();

        if (data.success) {
          setExamples(data.data);
        } else {
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching examples:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchExamples();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Button>
        {/* Using the ICONS constant */}
        <ICONS.layoutDashboard className='w-4 h-4' />
      </Button>
      {/* Using the LABELS constant */}
      {LABELS.pages.example.title}
      <div>
        {examples.length > 0 &&
          examples.map(example => (
            <div key={example.id}>
              <h3>{example.name}</h3>
              <p>{example.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
