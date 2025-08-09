'use client';

import { ReactNode } from "react";
import {
  Accordion,
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent
} from "@/components/ui/accordion";

type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function AccordionWrapper({
  value, 
  defaultOpen = false,
  onOpen, 
  children
}: {
  value: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  children: ReactNode;
}){
  return (
    <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? value : undefined}
        className="w-full"
        onValueChange={(v) => {
            if (v === value) onOpen?.();
        }}
    >
        <AccordionItem value={value} className="border rounded-lg">
            {children}
        </AccordionItem>
    </Accordion>
  );
}

export function AccordionWrapperTrigger({
    icon: Icon,
    label,
    ChevronRight
}:{
    icon: Icon;
    label: string;
    ChevronRight: Icon
}) {
    return (
        <AccordionTrigger className="group px-4 py-3 [&>svg]:hidden">
            <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground"/>
                <span className="text-sm font-medium">
                    {label}
                </span>
            </div>
            <span>
                <ChevronRight
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90"
                    aria-hidden="true"
                />
            </span>
        </AccordionTrigger>
    )
}

export function AccordionWrapperContent({children}: {children: ReactNode}){
    return <AccordionContent className="p-4">
        {children}
    </AccordionContent>
}