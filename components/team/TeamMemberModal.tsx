import Image from 'next/image'
import { TeamMember } from './types'
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog'

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  member: TeamMember | null
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ isOpen, onClose, member }) => {
  if (!member) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/70" />
      <DialogContent className="modal-main-background max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg border border-[#061A31] p-6 shadow-none sm:max-w-4xl">
        <DialogTitle className="sr-only">Team Member Profile: {member.name}</DialogTitle>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded bg-white max-sm:aspect-[4/5]">
            <Image
              src={member.imageUrl}
              alt={member.name}
              className="h-full w-full object-cover"
              width={600}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2
              id="modal-title"
              className="font-justice w-fit bg-[#061A31] box-decoration-clone px-2 pr-0 pb-1 text-lg text-white uppercase sm:text-2xl"
            >
              {member.name}
            </h2>
            <p className="font-helvetica mt-[-12px] w-fit bg-[#061A31] box-decoration-clone px-2 py-1 text-xs leading-4 font-light text-white/50 sm:text-sm md:text-base">
              {member.position}
            </p>

            {/* Display team member description from data */}
            <div className="text-white/80">
              <p className="mb-4">{member.description}</p>
            </div>

            {/* Display social media links from data */}
            {member.socialLinks && (
              <div className="mt-6 flex space-x-4">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    className="text-white hover:text-[#bfad60] focus:ring-2 focus:ring-[#bfad60] focus:ring-offset-2 focus:outline-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    className="text-white hover:text-[#bfad60] focus:ring-2 focus:ring-[#bfad60] focus:ring-offset-2 focus:outline-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                )}
                {member.socialLinks.email && (
                  <a
                    href={`mailto:${member.socialLinks.email}`}
                    className="text-white hover:text-[#bfad60] focus:ring-2 focus:ring-[#bfad60] focus:ring-offset-2 focus:outline-none"
                  >
                    Email
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamMemberModal
