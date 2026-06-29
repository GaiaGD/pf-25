'use client'

import { createContext, useContext, useState } from 'react'
import type { EmblaCarouselType } from 'embla-carousel'

type EmblaContextType = {
  emblaApi: EmblaCarouselType | null
  setEmblaApi: (api: EmblaCarouselType) => void
  selectedSnap: number
  setSelectedSnap: (n: number) => void
  snapCount: number
  setSnapCount: (n: number) => void
}

const EmblaContext = createContext<EmblaContextType>({
  emblaApi: null,
  setEmblaApi: () => {},
  selectedSnap: 0,
  setSelectedSnap: () => {},
  snapCount: 0,
  setSnapCount: () => {},
})

export function EmblaProvider({ children }: { children: React.ReactNode }) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  return (
    <EmblaContext.Provider value={{ emblaApi, setEmblaApi, selectedSnap, setSelectedSnap, snapCount, setSnapCount }}>
      {children}
    </EmblaContext.Provider>
  )
}

export function useEmbla() {
  return useContext(EmblaContext)
}
