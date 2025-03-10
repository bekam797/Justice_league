import FuzzyErrorText from '@/components/FuzzyErrorText'

export default function NotFound() {
  return (
    <div className="grid h-[calc(100vh-var(--header-height)-var(--footer-height))] place-items-center">
      <div className="flex flex-col items-center">
        <FuzzyErrorText
          fontSize="clamp(6rem, 20vw, 20rem)"
          baseIntensity={0.1}
          hoverIntensity={0.34}
        >
          404
        </FuzzyErrorText>
      </div>
    </div>
  )
}
