import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface EmailSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
}

export default function EmailSearchBar({
  value,
  onChange,
  onFilterClick,
  placeholder = "Search emails...",
}: EmailSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-9 pr-9"
          data-testid="input-search"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onChange("")}
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button
        variant="outline"
        onClick={onFilterClick}
        className="gap-2 flex-shrink-0"
        data-testid="button-filters"
      >
        <Filter className="h-4 w-4" />
        <span className="hidden sm:inline">Filters</span>
      </Button>
    </div>
  );
}
