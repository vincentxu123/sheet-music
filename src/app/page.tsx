'use client'

import { useState } from "react";
import { SelectedSong } from "./constants";
import { Introduction } from "./intro";
import { Collection, SongPreview } from "./collection";
import WarmWaveBackground from "./warmWaveBackground";

export default function Home() {
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);

  return (
    <>
      <WarmWaveBackground />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <Introduction />
          <Collection setSelectedSong={setSelectedSong} />

          {selectedSong && <SongPreview selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>}
        </main>
      </div>
    </>
  );
}
