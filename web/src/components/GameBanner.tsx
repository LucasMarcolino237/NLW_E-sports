interface GameBannerProps {
    bannerUrl: string,
    title: string,
    adCount: number
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a href="" className='relative rounded-lg overflow-hidden'>
            <img src={props.bannerUrl} alt="" />

            <div className='w-full pt-4 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>{props.title}</strong>
              <span className='text-zinc-300 text-sm block mt-1'>{props.adCount} anúncio(s)</span>
            </div>
          </a>
    )
}