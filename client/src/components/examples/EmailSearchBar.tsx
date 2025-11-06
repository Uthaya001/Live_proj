import EmailSearchBar from '../EmailSearchBar';
import { useState } from 'react';

export default function EmailSearchBarExample() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-4 max-w-2xl">
      <EmailSearchBar
        value={search}
        onChange={setSearch}
        onFilterClick={() => console.log('Filters clicked')}
      />
    </div>
  );
}
