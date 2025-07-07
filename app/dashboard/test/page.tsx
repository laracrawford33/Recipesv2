'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from('recipes').select('*');
      console.log('DATA:', data);
      console.log('ERROR:', error);
    };
    test();
  }, []);

  return <div className="p-4">Check console for Supabase test</div>;
}