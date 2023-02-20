import React, { Component } from "react";
import { Hand } from "./Hand";

interface TableProps {
  cards?: Array<{
    number: number;
    suit: string;
  }>;
}

export function Table({ cards }: TableProps) {
  return (
    <div>
      <Hand cards={cards} />
    </div>
  );
}
