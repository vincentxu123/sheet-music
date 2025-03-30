'use client'

import { X } from "lucide-react";
import Image, { StaticImageData } from 'next/image'
import { useState } from "react";
import { sheetMusicData } from "./constants";

interface Sheet {
  id: number;
  title: string;
  composer: string;
  year: number;
  src: StaticImageData;
  fullImage: string;
  difficulty: string;
}

type SelectedSheet = Sheet | null;

export default function Home() {
  const [selectedSheet, setSelectedSheet] = useState<SelectedSheet>(null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-gray-900 tracking-tight">
            Sheet Music Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of classical masterpieces, from baroque to romantic era compositions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sheetMusicData.map((sheet) => (
            <div
              key={sheet.id}
              onClick={() => setSelectedSheet(sheet)}
              className="cursor-pointer rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] border border-blue-50 bg-white group"
              role="button"
              tabIndex={0}
            >
              <div className="overflow-hidden">
                <Image
                  src={sheet.src}
                  alt={`${sheet.title} sheet music preview`}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h2 className="font-semibold text-xl text-gray-900 mb-1">
                  {sheet.title}
                </h2>
                <p className="text-gray-700">{sheet.composer}</p>
                <p className="text-gray-500 text-sm">Year: {sheet.year}</p>
                <span className="inline-block mt-3 px-4 py-1.5 text-sm rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100 transition-colors group-hover:bg-blue-100">
                  {sheet.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedSheet && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-blue-50 animate-[slideUp_0.3s_ease-out]">
              <button
                onClick={() => setSelectedSheet(null)}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-10">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">
                  {selectedSheet.title}
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  By {selectedSheet.composer} ({selectedSheet.year})
                </p>
                {/** Swap this to next image */}
                <img
                  src={selectedSheet.fullImage}
                  alt={`Full sheet music for ${selectedSheet.title}`}
                  className="w-full rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
