import Image from 'next/image'
import { SelectedSong, sheetMusicData } from './constants';
import { SetStateAction } from 'react';
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";



interface CollectionProps {
    setSelectedSong: (value: SetStateAction<SelectedSong | null>) => void;
}

interface SongPreviewProps {
  selectedSong: SelectedSong;
  setSelectedSong: (value: SetStateAction<SelectedSong | null>) => void;
}

export const Collection = ({ setSelectedSong }: CollectionProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sheetMusicData.map((sheet) => (
            <div
              key={sheet.id}
              onClick={() => setSelectedSong(sheet)}
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
    )
}

export const SongPreview = ({ selectedSong, setSelectedSong }: SongPreviewProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-blue-50 animate-[slideUp_0.3s_ease-out]">
              <button
                onClick={() => setSelectedSong(null)}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-10">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">
                  {selectedSong.title}
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  By {selectedSong.composer} ({selectedSong.year})
                </p>

                <Link
                  href={selectedSong.musescoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 font-medium"
                >
                  View on Musescore
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <iframe
                  src={selectedSong.fullSheets}
                  className="w-full rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.1)] min-h-[800px]"
                />
              </div>
            </div>
          </div>
  )
}