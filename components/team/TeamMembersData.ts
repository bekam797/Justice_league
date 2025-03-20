// import { TeamMember } from './types'

// // In a real application, this would be fetched from an API or CMS
// export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
//   // Simulating an API call with mock data
//   // In a real application, you would fetch this from your backend/CMS
//   return [
//     {
//       id: 1,
//       name: 'Dito Khvichia',
//       position: 'Managing Partner',
//       imageUrl:
//         'https://cdn.builder.io/api/v1/image/assets/TEMP/003357574b85ea4c50f87d8660b6b3742c727713',
//       description:
//         'Dito brings over 15 years of experience in corporate law, specializing in mergers and acquisitions. His strategic approach has helped numerous clients navigate complex legal challenges with confidence and clarity.',
//       socialLinks: {
//         linkedin: 'https://linkedin.com/in/ditokhvichia',
//         twitter: 'https://twitter.com/ditokhvichia',
//         email: 'dito@justiceleague.com',
//       },
//     },
//     {
//       id: 2,
//       name: 'Petre Gersamia',
//       position: 'Just Employee',
//       imageUrl:
//         'https://cdn.builder.io/api/v1/image/assets/TEMP/3cd36603918fd027ba7df6343d8f6120163e8079',
//       description:
//         'Petre specializes in intellectual property law and has successfully represented clients in various industries including technology, entertainment, and manufacturing. His attention to detail and creative problem-solving make him an invaluable asset to the team.',
//       socialLinks: {
//         linkedin: 'https://linkedin.com/in/petregersamia',
//         email: 'petre@justiceleague.com',
//       },
//     },
//     {
//       id: 3,
//       name: 'Irakli Tsankashvili',
//       position: 'Founding Partner',
//       imageUrl:
//         'https://cdn.builder.io/api/v1/image/assets/TEMP/2c31f25cce053d92b73daada75a0346bf77d9f5e',
//       description:
//         "As a founding partner, Irakli has been instrumental in building our firm's reputation for excellence. With expertise in international law and dispute resolution, he has successfully represented clients in high-stakes negotiations and litigation across multiple jurisdictions.",
//       socialLinks: {
//         linkedin: 'https://linkedin.com/in/iraklitsankashvili',
//         twitter: 'https://twitter.com/iraklitsanka',
//         email: 'irakli@justiceleague.com',
//       },
//     },
//     {
//       id: 4,
//       name: 'Salome Javakhishvili',
//       position: 'Middle Associate',
//       imageUrl:
//         'https://cdn.builder.io/api/v1/image/assets/TEMP/c4a57c5243ec355163d9d5e96eadf560ccf9dde1',
//       description:
//         'Salome focuses on labor and employment law, advising clients on compliance, policy development, and dispute resolution. Her practical approach and deep understanding of employment regulations have helped numerous organizations establish fair and effective workplace practices.',
//       socialLinks: {
//         linkedin: 'https://linkedin.com/in/salomejavakhishvili',
//         email: 'salome@justiceleague.com',
//       },
//     },
//     {
//       id: 5,
//       name: 'Mariam Geguchadze',
//       position: 'Senior Associate',
//       imageUrl:
//         'https://cdn.builder.io/api/v1/image/assets/TEMP/47fbfb3d137bcf9ba86a331048b2a68f4e8dd2b8',
//       description:
//         'With a background in finance and law, Mariam specializes in banking, securities, and corporate governance. Her analytical mindset and strategic approach have made her a trusted advisor to financial institutions and corporate clients navigating complex regulatory environments.',
//       socialLinks: {
//         linkedin: 'https://linkedin.com/in/mariamgeguchadze',
//         twitter: 'https://twitter.com/mariamgeguchadze',
//         email: 'mariam@justiceleague.com',
//       },
//     },
//     {
//       id: 6,
//       name: 'Luka Metonidze',
//       position: 'JR. Associate',
//       imageUrl:
//         'https://cdn.builder.io/api/v1/image/assets/TEMP/5c1837d86764dc29eba3ab8b74c0ab5b3c882b6d',
//       description:
//         'Luka recently joined our team after graduating with honors from law school. He specializes in tech law and data privacy, bringing fresh perspectives and innovative solutions to our clients in the technology sector. His enthusiasm and dedication make him a rising star in the firm.',
//       socialLinks: {
//         linkedin: 'https://linkedin.com/in/lukametonidze',
//         email: 'luka@justiceleague.com',
//       },
//     },
//   ]
// }

import type { TeamMember } from './types'

// In a real application, this would be fetched from an API or CMS
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  // Simulating an API call with mock data
  // In a real application, you would fetch this from your backend/CMS
  return [
    {
      id: 1,
      name: 'Dito Khvichia',
      position: 'Managing Partner',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/003357574b85ea4c50f87d8660b6b3742c727713',
      description:
        'Dito brings over 15 years of experience in corporate law, specializing in mergers and acquisitions. His strategic approach has helped numerous clients navigate complex legal challenges with confidence and clarity.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ditokhvichia',
        twitter: 'https://twitter.com/ditokhvichia',
        email: 'dito@justiceleague.com',
      },
    },
    {
      id: 2,
      name: 'Petre Gersamia',
      position: 'Just Employee',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/3cd36603918fd027ba7df6343d8f6120163e8079',
      description:
        'Petre specializes in intellectual property law and has successfully represented clients in various industries including technology, entertainment, and manufacturing. His attention to detail and creative problem-solving make him an invaluable asset to the team.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/petregersamia',
        email: 'petre@justiceleague.com',
      },
    },
    {
      id: 3,
      name: 'Irakli Tsankashvili',
      position: 'Founding Partner',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/2c31f25cce053d92b73daada75a0346bf77d9f5e',
      description:
        "As a founding partner, Irakli has been instrumental in building our firm's reputation for excellence. With expertise in international law and dispute resolution, he has successfully represented clients in high-stakes negotiations and litigation across multiple jurisdictions.",
      socialLinks: {
        linkedin: 'https://linkedin.com/in/iraklitsankashvili',
        twitter: 'https://twitter.com/iraklitsanka',
        email: 'irakli@justiceleague.com',
      },
    },
    {
      id: 4,
      name: 'Salome Javakhishvili',
      position: 'Middle Associate',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/c4a57c5243ec355163d9d5e96eadf560ccf9dde1',
      description:
        'Salome focuses on labor and employment law, advising clients on compliance, policy development, and dispute resolution. Her practical approach and deep understanding of employment regulations have helped numerous organizations establish fair and effective workplace practices.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/salomejavakhishvili',
        email: 'salome@justiceleague.com',
      },
    },
    {
      id: 5,
      name: 'Mariam Geguchadze',
      position: 'Senior Associate',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/47fbfb3d137bcf9ba86a331048b2a68f4e8dd2b8',
      description:
        'With a background in finance and law, Mariam specializes in banking, securities, and corporate governance. Her analytical mindset and strategic approach have made her a trusted advisor to financial institutions and corporate clients navigating complex regulatory environments.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/mariamgeguchadze',
        twitter: 'https://twitter.com/mariamgeguchadze',
        email: 'mariam@justiceleague.com',
      },
    },
    {
      id: 6,
      name: 'Luka Metonidze',
      position: 'JR. Associate',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/5c1837d86764dc29eba3ab8b74c0ab5b3c882b6d',
      description:
        'Luka recently joined our team after graduating with honors from law school. He specializes in tech law and data privacy, bringing fresh perspectives and innovative solutions to our clients in the technology sector. His enthusiasm and dedication make him a rising star in the firm.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/lukametonidze',
        email: 'luka@justiceleague.com',
      },
    },
  ]
}

export const getTeamMemberById = async (id: number): Promise<TeamMember | undefined> => {
  const members = await fetchTeamMembers()
  return members.find((member) => member.id === id)
}
