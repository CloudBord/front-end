'use client'

import React from "react";
import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css';

export default function Board() {
    return (
      <div className="flex justify-center">
        <div className="container">
          <main>
            <div style={{ position: 'fixed', inset: 0 }}>
              <Tldraw />
            </div>
          </main>
        </div>
      </div>
    );
  }
  