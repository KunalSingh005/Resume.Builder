
import { ResumeData } from './types';

export const DEFAULT_RESUME_DATA: ResumeData = {
  name: 'Priya Sharma',
  jobTitle: 'Senior Software Engineer',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  location: 'Bengaluru, India',
  linkedin: 'linkedin.com/in/priyasharma',
  portfolio: 'priyasharma.dev',
  summary:
    'Results-driven Senior Software Engineer with 8+ years of experience in designing, developing, and deploying scalable web applications. Proficient in full-stack development with expertise in React, Node.js, and cloud-native technologies. Proven ability to lead projects, mentor junior developers, and collaborate effectively in fast-paced Agile environments.',
  skills: [
    'JavaScript (ES6+)',
    'TypeScript',
    'React & Redux',
    'Node.js & Express',
    'Python',
    'SQL & NoSQL (PostgreSQL, MongoDB)',
    'Docker & Kubernetes',
    'AWS & GCP',
    'CI/CD Pipelines',
    'Agile Methodologies',
  ],
  experiences: [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'InnovateTech Solutions',
      location: 'Bengaluru',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: [
        'Led the development of a high-traffic e-commerce platform, resulting in a 40% increase in user engagement.',
        'Architected and implemented a microservices-based backend using Node.js, improving system scalability and reducing latency by 25%.',
        'Mentored a team of 4 junior engineers, fostering a culture of code quality and continuous learning.',
        'Managed CI/CD pipelines using Jenkins and Docker, automating deployment and reducing release cycles by 50%.',
      ],
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'CodeCrafters Inc.',
      location: 'Mumbai',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: [
        'Developed and maintained client-side features for a SaaS product using React and Redux.',
        'Collaborated with UX/UI designers to translate wireframes into responsive and accessible user interfaces.',
        'Wrote comprehensive unit and integration tests, increasing code coverage to over 90%.',
      ],
    },
  ],
  educations: [
    {
      id: 1,
      institution: 'Indian Institute of Technology, Bombay',
      degree: 'Bachelor of Technology in Computer Science',
      location: 'Mumbai',
      startDate: 'Aug 2012',
      endDate: 'May 2016',
    },
  ],
  projects: [
    {
      id: 1,
      name: 'Real-Time Collaborative Code Editor',
      description: 'A web-based code editor that allows multiple users to edit and run code snippets in real-time.',
      technologies: ['React', 'WebSockets', 'Node.js', 'Docker'],
      link: 'github.com/priya/code-editor',
    },
     {
      id: 2,
      name: 'Personal Finance Dashboard',
      description: 'A data visualization tool to track expenses and investments, built with Plaid API integration.',
      technologies: ['Vue.js', 'Chart.js', 'Python (Flask)', 'PostgreSQL'],
      link: 'github.com/priya/finance-dash',
    },
  ],
};

export const TEMPLATE_NAMES = [
  'Classic',
  'Modern',
  'Creative',
  'Functional',
  'Executive',
];
